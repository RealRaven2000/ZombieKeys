
console.log("Zombiekeys compose script!");


	function keyPressHandler(event) {
    console.log(event);
    
    /*
	  if (ZombieKeys.DisableListeners) return;
		const util = ZombieKeys.Util;
		let isDebug = ZombieKeys.Preferences.isDebugOption('keyPressHandler');
		if (isDebug) { ZombieKeys.logKey("press: ", event); }

		// check "alive" keys which fire during "keypress"
		for (let k=0; k<aliveKeys.length; k++) {
			if (  ( (event.keyCode && event.keyCode  == aliveKeys[k].keyCode)
					||
				    (event.charCode && event.charCode == aliveKeys[k].charCode)    )
				&&
				checkModifiers(event, aliveKeys[k].modifiers)) {
				fakeKey(event, aliveKeys[k].target);
				return;
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
						" => " + ZombieKeys.logMappingString(deadKey.mapping));
				let code = String.fromCharCode(event.charCode);
				if (deadKey.mapping[code]) {
					if (deadKey.menuFake && event.type=='keypress') {
						// make it a pair of events
						deadKey.menuFake = false;
						fakeKey(event, deadKey.mapping[code], true); // copy event with keyup!
					}
					else
						fakeKey(event, deadKey.mapping[code], false);
					return;
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
				 checkModifiers(event, deadKey.modifiers))  {
					util.logDebug(' discarding keypress after match\n'
					  + 'keyCode = ' + event.keyCode + '\n'
					  + 'charCode = ' + event.charCode);
					let preventDefault = true;
					
					//exception: key without a key-up 
					if (deadkeyCode==0) {
						if (event.charCode == deadCharCode) {
							util.logDebugOptional("keyPressHandler","Special case: no keyCode - activating deadKey[" + k + "]");
							ZombieKeys.displayMapping(k);
							deadKey.alive = true;
						}
						else
							preventDefault = false; // legit shortcut
					}
					
					if (preventDefault) {
						// throw away the keypress event.
						event.preventDefault();
						event.stopPropagation();
					}
					
					break;
        }
      }
		}
    */
	};

	function keyUpHandler(event) {
    console.log(event);
    /*    
		if (ZombieKeys.DisableListeners || event.keyCode<20)
			return; // ignore CTRL,SHIFT and ALT
		let isDebug = ZombieKeys.Preferences.isDebugOption('keyUpHandler');
		if (isDebug) {ZombieKeys.logKey("up: ", event);}

		// check "alive" keys which only fire on "keyup"
		for (let k=0; k<aliveKeys.length; k++) {
			if (( (event.keyCode && event.keyCode  == aliveKeys[k].keyCode)
					||
				    (event.charCode && event.charCode == aliveKeys[k].charCode)    )
				&&
				checkModifiers(event, aliveKeys[k].modifiers)) {
				ZombieKeys.fakeKey(event, aliveKeys[k].target);
				return;
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
				checkModifiers(event, deadKey.modifiers))
			{
				ZombieKeys.displayMapping(k);
				deadKey.alive = true;
				event.preventDefault();
				event.stopPropagation();
				return;
			}
		}

		// process ALT+X (treat preceeding 4 chars as hex unicode string
		// and replace with corresponding char)
		if ((event.keyCode == ZombieKeys.HexUnicodeKey.keyCode) &&
			checkModifiers(event, ZombieKeys.HexUnicodeKey.modifiers)) {
			let hexUnicode = getPreceedingString(event.target, 4),
			    code = parseInt(hexUnicode, 16);
			replacePreceedingString(event.target, 4, String.fromCharCode(code));
			return;
		}

		// process ALT+<numeric keypad>
		if (checkModifiers(event, ZombieKeys.DecUnicodeModifiers)) {
			if ((event.keyCode >= 96) && (event.keyCode <= 105)) {
				decUnicode += (event.keyCode-96).toString(); // add digit
				event.preventDefault();
				event.stopPropagation();
				return;
			} else if (event.keyCode == 18) {
				// released ALT - let's insert
				if (decUnicode != "") {
					let code = parseInt(decUnicode, 10);
					ZombieKeys.fakeKey(event, String.fromCharCode(code));
					decUnicode = "";
				}
				event.preventDefault();
				event.stopPropagation();
				return;
			}
		}
    */
	};



window.addEventListener("keypress", keyPressHandler, true);
window.addEventListener("keyup", keyUpHandler, true);

