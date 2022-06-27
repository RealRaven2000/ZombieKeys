//import {ClassZombieKeys} from "./scripts/Zombiekeys.mjs.js";
//import {ZombieKeysUtil} from "./scripts/zombiekeys-Util.mjs.js";



messenger.composeScripts.register({
    js: [
      { file: "scripts/zombiekeys-compose.js"}
    ]
});


async function main() {
  
  const msg_commands = [
    "keyPress",
    "keyUp"
  ]  

	let decUnicode = "";
  let util = new ZombieKeysUtil();
  let loc = await util.readLocale();
  let zombieKeys = new ClassZombieKeys(loc, util); 
  
  
  var deadKeys = zombieKeys.DeadKeys;
  var aliveKeys = zombieKeys.AliveKeys;
  var layouts = zombieKeys.layouts;

  // 1143
	async function keyPressHandler(event) {
	  if (zombieKeys.DisableListeners) return;
		let isDebug = await util.isDebugOption("keyPressHandler");
		if (isDebug) { zombieKeys.logKey("press: ", event); }

		// check "alive" keys which fire during "keypress"
		for (let k=0; k<aliveKeys.length; k++) {
			if (  ( (event.keyCode && event.keyCode  == aliveKeys[k].keyCode)
					||
				    (event.charCode && event.charCode == aliveKeys[k].charCode)    )
				&&
				zombieKeys.checkModifiers(event, aliveKeys[k].modifiers)) {
				return await zombieKeys.fakeKey(event, aliveKeys[k].target);
			}
		}

		// check if/which "dead" key is active
		for (let k=0; k<deadKeys.length; k++) {
			let deadKey = deadKeys[k],
			    deadCharCode = deadKey.charCode || 0,
					deadkeyCode = deadKey.keyCode || 0;
			if (deadKey.alive) {
				if (isDebug) debugger;
				deadKey.alive = false;
				// check if there's a mapping for this character
				// entered after "dead" key
				util.logDebugOptional("zombieCreation", "keyPressHandler( ) detected zombie id "+ (k+1) + " for " + event.charCode +
						" => " + zombieKeys.logMappingString(deadKey.mapping));
				let code = String.fromCharCode(event.charCode);
				if (deadKey.mapping[code]) {
					if (deadKey.menuFake && event.type=='keypress') {
						// make it a pair of events
						deadKey.menuFake = false;
						return zombieKeys.fakeKey(event, deadKey.mapping[code], true); // copy event with keyup!
					}
					else
						return zombieKeys.fakeKey(event, deadKey.mapping[code], false);
				}
				else {
					util.logDebugOptional("zombieCreation", "no mapping found - sending deadkey[" + (k+1) + "] back to sleep");
				}
			}
      // consume accelerators!
      else {
				
				util.logDebugOptional("accelerators", "[" + (k+1) + "] keyDown - check for accelerator:\n"
					  + 'keyCode = ' + deadkeyCode + ' {' + (event.keyCode == deadkeyCode) + '}\n'
					  + 'charCode = ' + deadCharCode + ' {' + (event.charCode == deadCharCode) + '}');
        if (
				((event.keyCode == deadkeyCode && deadkeyCode)
				 ||
				 (event.charCode && event.charCode == deadCharCode))
				&&
				 zombieKeys.checkModifiers(event, deadKey.modifiers))  {
					util.logDebug(' discarding keypress after match\n'
					  + 'keyCode = ' + event.keyCode + '\n'
					  + 'charCode = ' + event.charCode);
					let preventDefault = true;
					
					//exception: key without a key-up 
					if (deadkeyCode==0) {
						if (event.charCode == deadCharCode) {
							util.logDebugOptional("keyPressHandler","Special case: no keyCode - activating deadKey[" + k + "]");
							zombieKeys.displayMapping(k);
							deadKey.alive = true;
						}
						else
							preventDefault = false; // legit shortcut
					}
					
					return { 
            isHandled: preventDefault
          }
        }
      }
		}
    return {
      text: event.key
    }      
	};

	async function keyUpHandler(event) {
		if (zombieKeys.DisableListeners || event.keyCode<20)
			return {
        isHandled: false
      }; // ignore CTRL,SHIFT and ALT
		let isDebug = await util.isDebugOption("keyUpHandler");
		if (isDebug) {
      zombieKeys.logKey("up: ", event);
    }

		// check "alive" keys which only fire on "keyup"
		for (let k=0; k<aliveKeys.length; k++) {
			if (( (event.keyCode && event.keyCode  == aliveKeys[k].keyCode)
					||
				    (event.charCode && event.charCode == aliveKeys[k].charCode)    )
				&&
				zombieKeys.checkModifiers(event, aliveKeys[k].modifiers)) {
				return await zombieKeys.fakeKey(event, aliveKeys[k].target);
			}
		}

		// check if "dead" key is activated
		// match on charCode of deadkeys?
		for (let k=0; k<deadKeys.length; k++) {
			let deadKey = deadKeys[k];
			if (
				(
				 (event.keyCode == deadKey.keyCode)
				 ||
				 (!event.keyCode && deadKey.charCode && event.charCode == deadKey.charCode)
				)
				&&
				zombieKeys.checkModifiers(event, deadKey.modifiers))
			{
				zombieKeys.displayMapping(k);
				deadKey.alive = true;
				//event.preventDefault();
				//event.stopPropagation();
				return {
          isHandled: true,
          stopPropagation: true
        };
			}
		}

		// process ALT+X (treat preceeding 4 chars as hex unicode string
		// and replace with corresponding char)
		if ((event.keyCode == zombieKeys.HexUnicodeKey.keyCode) &&
			zombieKeys.checkModifiers(event, zombieKeys.HexUnicodeKey.modifiers)) {
			let hexUnicode = getPreceedingString(event.target, 4),
			    code = parseInt(hexUnicode, 16);
			replacePreceedingString(event.target, 4, String.fromCharCode(code));
			return;
		}

		// process ALT+<numeric keypad>
		if (zombieKeys.checkModifiers(event, zombieKeys.DecUnicodeModifiers)) {
			if ((event.keyCode >= 96) && (event.keyCode <= 105)) {
				decUnicode += (event.keyCode-96).toString(); // add digit
				return {
          isHandled: true,
          stopPropagation: true
        };
			} else if (event.keyCode == 18) {
				// released ALT - let's insert
				if (decUnicode != "") {
					let code = parseInt(decUnicode, 10);
					return await zombieKeys.fakeKey(event, String.fromCharCode(code)); // isHandled: true ?
					decUnicode = "";
				}
				
				return {
          isHandled: true,
          stopPropagation: true
        };
			}
		}
    return {
      // nothing
    }      
	};



  async function notificationHandler(data) {
    let result;
    switch (data.command) {
      case "keyPress":
        result = await keyPressHandler(data.event);
        // console.log(result);
        return result;
      
      case "keyUp":
        result = await keyUpHandler(data.event);
        // console.log(result);
        return result;
    }
  }

  // message listener - SELECTIVE!
  // every message listener must have its unique set of messages (if it returns something)
  messenger.runtime.onMessage.addListener((data, sender) => {
    if (msg_commands.includes(data.command)) {
      let p = notificationHandler(data, sender);  // await
      return p; // the result of this is a Promise
    }
  });
    
}

main();

