
// we cannot marshal the parts target / currentTarget / srcElement / explicitOriginalTarget, 
// so if we do an insert from here
// then we need to await a reply from the background
// OTTOH - we can insert from the background code via WL?
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
        console.log("composeScript keyPress inserted "+ result.text);
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
    console.log("End composeScript keyPress:", event);
	};

	async function keyUpHandler(event) {
    let result = await browser.runtime.sendMessage({command:"keyUp", event: serializeKeyEvent(event)});
    if (result) {
      if (result.text) {
        event.preventDefault();
        event.stopPropagation();
        document.execCommand("insertText", false, result.text);
        console.log("composeScript keyUp inserted "+ result.text);
      }
      else if (result.isHandled) {
        event.preventDefault();
        event.stopPropagation();
      }
      else if (result.charCode) {
        
      }
    }
    console.log("End composeScript keyUp:", event);
	};

window.addEventListener("keypress", keyPressHandler, true);
window.addEventListener("keyup", keyUpHandler, true);

