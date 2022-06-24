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


	async function keyPressHandler(event) {
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
    
    let result = await browser.runtime.sendMessage({command:"keyPress", event: serializeKeyEvent(event)});
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

	async function keyUpHandler(event) {
    let result = await browser.runtime.sendMessage({command:"keyUp", event: serializeKeyEvent(event)});
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
//  let ClassZombieKeys = await import("./Zombiekeys.mjs.js");
//  let ZombieKeysUtil= await import("./zombiekeys-Util.mjs.js");
  
  window.addEventListener("keypress", keyPressHandler, true);
  window.addEventListener("keyup", keyUpHandler, true);
}

init();


