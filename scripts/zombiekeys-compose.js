
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
        event.preventDefault();
        event.stopPropagation();
      }
      else {
        if (result.text) {
          event.preventDefault();
          event.stopPropagation();
          if (result.text == "Enter") {
            // document.execCommand("insertText", false, "\n");
            console.log("special - Enter");
          }
          else {
            document.execCommand("insertText", false, result.text);
            console.log("composeScript keyPress inserted "+ result.text);
          }
        }
        else if (result.charCode) {
          debugger;
        }
      }
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

