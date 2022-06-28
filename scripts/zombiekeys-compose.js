/** TEST : DOESN'T WORK */
  //import {ClassZombieKeys} from "./Zombiekeys.mjs.js";
  //import {ZombieKeysUtil} from "./zombiekeys-Util.mjs.js";

// we cannot marshal the parts target / currentTarget / srcElement / explicitOriginalTarget, 
// so if we do an insert from here
// then we need to await a reply from the background
// OTTOH - we can insert from the background code via WL?
let isComposeLog = false; // will be set from local storage in init() function.

  function serializeKeyEvent(event) {
    return {
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      
      bubbles: event.bubbles,
      cancelBubble: event.cancelBubble,
      defaultPrevented: event.defaultPrevented,
      repeat: event.repeat,
      
      charCode: event.charCode,
      code: event.code,
      detail: event.detail,
      metaKey: event.metaKey,
      key: event.key,
      keyCode: event.keyCode,
      type: event.type 
    }
  }
  
	let decUnicode = "",
      util,
      loc,
      zombieKeys;
  
  
  let deadKeys,
      aliveKeys, 
      layouts;

  // put in it's own js file
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



	async function keyPressHandler_Composer(event) {
    let defaultAction = false;
    // if we do not prevent it here, then the character will always be inserted!!
    switch (event.key) {
      case "Enter":
        return; // let Thunderbird handle it!
      default:
        event.preventDefault();
        event.stopPropagation();
        break;
    }
    
    let result = await keyPressHandler(serializeKeyEvent(event)); // await browser.runtime.sendMessage({command:"keyPress", event: serializeKeyEvent(event)});
    if (result) {
      if (result.isHandled) {
        ;
      } else if (result.text) {
        document.execCommand("insertText", false, result.text);
        if (isComposeLog) {
          console.log("composeScript keyPress inserted "+ result.text);  
        }
      } else {
        defaultAction = true;
      }
    }
    else {
      defaultAction = true;
    }
    // nobody executed this:
    if (defaultAction) {
      let keypress_event = document.createEvent("KeyboardEvent"), // KeyEvents
          eventView = event.view || keypress_event.view; // make xbl compatible (?)
      keypress_event.initKeyEvent("keypress", true, true, eventView,
               event.ctrlKey, event.altKey, event.shiftKey, evt.metaKey,    
               event.keyCode, event.charCode);
      tevent.target.dispatchEvent(keypress_event);
    }
    if (isComposeLog) {
      console.log("End composeScript keyPress:", event);
    }
	};

	async function keyUpHandler_Composer(event) {
    let result = await keyUpHandler(serializeKeyEvent(event));
    if (result) {
      if (result.text) {
        event.preventDefault();
        event.stopPropagation();
        document.execCommand("insertText", false, result.text);
        if (isComposeLog) {
          console.log("composeScript keyUp inserted "+ result.text);
        }
      }
      else if (result.isHandled) {
        event.preventDefault();
        event.stopPropagation();
      }
      else if (result.charCode) {
        
      }
    }
    if (isComposeLog) {
      console.log("End composeScript keyUp:", event);
    }
	};


async function init() {
  let result = await browser.storage.local.get({"debug.composeScript" : false});
  isComposeLog = result["debug.composeScript"];
/* dynamic module loading: doesn't work in ESR102 yet? */

  util = new ZombieKeysUtil();
  loc = await util.readLocale();
  zombieKeys = new ClassZombieKeys(loc, util); 

  deadKeys = zombieKeys.DeadKeys;
  aliveKeys = zombieKeys.AliveKeys;
  layouts = zombieKeys.layouts;
  
  window.addEventListener("keypress", keyPressHandler_Composer, true);
  window.addEventListener("keyup", keyUpHandler_Composer, true);
  
  
}

init();


