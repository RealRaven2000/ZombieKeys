 "use strict";
 
 
ZombieKeys.Options = {
	selectItem: function(layout) {
		var lst = document.getElementById('Layouts');
		if (lst) {
			for (var i=0; i<lst.itemCount; i++) {
				var item = lst.getItemAtIndex(i);
				if (item && item.value == layout) {
					lst.selectItem (item);
					break;
				}
			}
		}
	},

	selectLayout: function(locale, win) {
		var img = document.getElementById('layoutImage');
		if (img)
			img.className = "layout-" + locale;
		
	} ,
		
	load : function () {
		ZombieKeys.Options.selectItem(ZombieKeys.getCurrentLocale());
	} ,
	
	get selectedLocale() {
		let lst = document.getElementById('Layouts');
		if (lst) {
			return lst.selectedItem.value;
		}
		return null;
	} ,
	
	get selectedLocaleLabel() {
		let lst = document.getElementById('Layouts');
		return lst.selectedItem.label;
	} ,

	accept : function () {
		let val = this.selectedLocale;
		if (val) {
			Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch)
				.setCharPref('extensions.zombiekeys.currentLayout', val);
		}
	} ,

	close : function () {
		ZombieKeys.Util.logDebug("Current locale remains=" + ZombieKeys.getCurrentLocale());
		ZombieKeys.DisableListeners = false;
	} , 
	
	startCustomize : function() {
	  // make sure current layout is really selected
    document.getElementById('prefEditLayout').setAttribute("collapsed", false);
    document.getElementById('prefSelectLayout').collapsed = true;
		// Label
		document.getElementById('currentLayoutName').value = this.selectedLocaleLabel;
		this.fillDeadkeysList();
	} ,
	
	endCustomize : function() {
    document.getElementById('prefEditLayout').collapsed = true;
    document.getElementById('prefSelectLayout').collapsed = false;
		ZombieKeys.DisableListeners = false;
	} ,
	
	deadKeyTitle: function(id) {
	  switch(id) {
		  case 1: return 'grave';
			case 2: return 'acute';
			case 3: return 'circumflex';
			case 4: return 'tilde';
			case 5: return 'umlaut';
			case 6: return 'ring';
			case 7: return 'sharp s';
			case 8: return 'stroke';
			case 9: return 'caron';
			case 10: return 'cedilla';
			case 11: return 'breve';
			case 12: return 'ogonec';
			case 13: return 'macron';
			case 14: return 'overdot';
			case 15: return 'underdot';
			case 16: return 'double accute';
			case 17: return 'circle';
			case 18: return 'greek'; 
			default: return 'unknown?';
		}                  
	},
	
	getDeadKeyLabel: function(dK, arrayIndex) {
		let itemLabel = dK.id + " - " + this.deadKeyTitle(dK.id) + " (" + keyCode + ") " + theKey;
		let keyCode = dK.keyCode;
		let theKey = dK.key;
		let theOtherKey = dK.otherKey ? dK.otherKey : '';
		let itemLabel = dK.id + " - " + this.deadKeyTitle(dK.id) + " (" + keyCode + ") " + theKey;
		if (theOtherKey)
			itemLabel += "[" + theOtherKey + "]";
		let modifiers = ZombieKeys.DeadKeys[arrayIndex].modifiers;
		if (modifiers.ctrlKey) itemLabel += '  + CTRL';
		if (modifiers.altKey) itemLabel += '  + Alt';
		if (modifiers.shiftKey) itemLabel += '  + Shift';
    return itemLabel;	
	},
	
	fillDeadkeysList: function() {
		// refill listbox
		let locale = this.selectedLocale;
		let list = document.getElementById('deadKeyList');
		while (list.itemCount)
		  list.removeItemAt(0);
		// initialize the current instance (of options window)
		ZombieKeys.initLocale(locale); 
		// get key map
		let deadKeysList = ZombieKeys.currentLayout.map_deadKeys;
		for (let i=0; i<deadKeysList.length; i++) {
		  let dK = deadKeysList[i];
		  list.appendItem(this.getDeadKeyLabel(dK, i), dK.id);  // examples would be nice...
		}
	} ,
	
	resetKey : function() {
	
	} ,
	
	defineKey : function() {
	
	} ,
	
	showInstructions : function(show) {
	  document.getElementById('pressKeyAgainInstructions').collapsed = true;
	  document.getElementById('pressKeyInstructions').collapsed = !show;
		ZombieKeys.DisableListeners = !show;
	} ,
	
	showInstructionsAgain : function(show) {
	  document.getElementById('pressKeyInstructions').collapsed = true;
	  document.getElementById('pressKeyAgainInstructions').collapsed = !show;
		ZombieKeys.DisableListeners = !show;
	} ,
	
	
	captureKeyCode : function(again) {
	  if (!again)
		  this.showInstructions(true);
		else
			this.showInstructionsAgain(true);	
		let input = document.getElementById('pushKey');
		input.addEventListener('keyup',	this.keyUpHandler, false);
		input.value='';
		input.focus(); // listen for the key!
	} ,
	
	keyUpHandler : function(event) {
		if (event.keyCode<20)
			return; // ignore CTRL,SHIFT and ALT
		var isDebug = ZombieKeys.Preferences.isDebugOption('keyUpHandler');
		if (isDebug) {ZombieKeys.logKey("pushKey up: ", event);}
		document.getElementById('txtKeyCode').value = event.keyCode;
		event.target.removeEventListener('keyup', ZombieKeys.Options.keyUpHandler);
		let alt = (event.altKey) ? true : false;
		let ctrl = (event.ctrlKey) ? true : false;
		let shift = (event.shiftKey) ? true : false;
		// when pressing again, we ignore accelerators!
		if (document.getElementById('pressKeyAgainInstructions').collapsed) {
			document.getElementById('chkShift').checked = shift;
			document.getElementById('chkAlt').checked = alt;
			document.getElementById('chkCTRL').checked = ctrl;
		}
		let code = (event.charCode) ? event.charCode : event.keyCode;
		let shiftCode = 0;
		// Simple ASCII shift calculations. a-A .. Z-z
		if (code>64 && code<91)
			shiftCode = code + 32;
		else if (code>96 && code<123)
			shiftCode = code - 32;
		else
		  shiftCode = code;  // we can't say what else is on the key as it is language dependant.
		try {
		  if (shiftCode != code) {
				document.getElementById('pushKey').value =  String.fromCharCode(shift ? code : shiftCode);
				document.getElementById('otherKey').value = String.fromCharCode(!shift ? code : shiftCode);
			}
		}
		catch (ex) {;}
	  ZombieKeys.Options.showInstructions(false);
		ZombieKeys.DisableListeners = false;
		// nothing in pushKey, so accelerators made keypress fail 
		// (we have captured the keyCode, but have no symbol to display)
		if (document.getElementById('pushKey').value =='') {
		  // ask to press key again without accelerators.
			window.setTimeout (	function() { ZombieKeys.Options.captureKeyCode(true);}, 50);
		}
		else
			document.getElementById('otherKey').focus();		
	} ,
	
	selectDeadKey : function(lb) {
	  let index = lb.selectedIndex;
		let element = lb.selectedItem;
		let idx = parseInt(element.value);  // the number
		let dK = ZombieKeys.currentLayout.map_deadKeys[index]; // get deadKey
		let theKey = dK.key;
		let theOtherKey = dK.otherKey ? dK.otherKey : '';
		document.getElementById('txtKeyCode').value = dK.keyCode;
		document.getElementById('pushKey').value = theKey;
		document.getElementById('otherKey').value = theOtherKey;
		// this could well already be the "effective" (localized) modifiers:
		
		let modifiers = ZombieKeys.DeadKeys[index].modifiers;
		document.getElementById('chkCTRL').checked = modifiers.ctrlKey;
		document.getElementById('chkAlt').checked = modifiers.altKey;
		document.getElementById('chkShift').checked = modifiers.shiftKey;
		// let defaultMods = ZombieKeys.DeadKeys[idx].modifiers;
		// let itemLabel = dK.id + " - " + this.deadKeyTitle(dK.id) + " (" + keyCode + ") " + theKey;
	}
		
}
