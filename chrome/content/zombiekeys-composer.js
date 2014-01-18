 "use strict";

 /*
     Zombie Keys Composer Module
     deals with the keyboard shortcuts that are loaded into Composer and makes sure they are not in the way    
		 of our Zombe Keys key mappings
*/

ZombieKeys.Composer = {
  initDone: false,
  cleanKeySet: function(keySet) {
	  // see if ZombieKeys needs a modifier and the entered mods string doesn't contain it
	  function checkModifiers(modifiers, modString) {
			if (modifiers) {
				if (modifiers.shiftKey && (modString.indexOf('shift')==-1))
					return false;
				if (modifiers.altKey && (modString.indexOf('alt')==-1))
					return false;
				if (modifiers.ctrlKey && (modString.indexOf('accel')==-1))
					return false;
			}
			return true;
		}

    let keysetName = keySet.id ? keySet.id : '(unnamed)';
		let countRemoved = 0;
	  ZombieKeys.Util.logDebugOptional('accelerators', 'cleanKeySet(' + keysetName + ') ..');
		let isRecreateMethod = ZombieKeys.Preferences.getBoolPref("accelerators.recreateKeys");
		try {
			let deadKeys = ZombieKeys.currentLayout.map_deadKeys; // localized deadKeys
			let menuItems = document.getElementsByTagName('menuitem');
			for (let i=0; i<keySet.childNodes.length; i++) {
				let key = keySet.childNodes[i];
				let kbKey = key.getAttribute('key');
				let kbCharChode = (kbKey && kbKey.charCodeAt(0)) ? kbKey.charCodeAt(0) : "0";
				let kbMods = key.getAttribute('modifiers'); 
				let txt = 'key {' + kbKey + ',' + kbCharChode.toString() + '}   mods:' + kbMods.toString();
				let keyName = key.id ? key.id : '(unnamed)';
				ZombieKeys.Util.logDebugOptional('accelerators.detail', i.toString() + ' = ' + txt + ' - ' + keyName);
				if (!kbCharChode) continue;
				
				for (let k=0; k<deadKeys.length; k++) {
					// compare with key of our deadKeys (otherKey is the other symbol on same key of locale, using shift) 
					let Zombie = deadKeys[k];
					if (kbCharChode == Zombie.keyCode
							||
							Zombie.otherKey &&  kbKey == Zombie.otherKey) 
					{
						// disable the accelerator if there is a full match on the modifiers
						ZombieKeys.Util.logDebugOptional('accelerators', 'Matched ' + txt + '   (' + keyName + ')');
						let zombieMods = Zombie.modifiers ? Zombie.modifiers : null;
						if (!checkModifiers(zombieMods, kbMods)) {
							continue;
						}
						else {
							if (!checkModifiers(ZombieKeys.DeadKeys[k].modifiers, kbMods)) {
								continue;
							}
						}
						// if locale has no modifiers, check if the accelerator has some .. 
						/******** to do *************/
						/******** to do *************/
						/******** to do *************/
						// all modifiers were matched... full match
						// key.setAttribute('disabled', true);  // doesn't help with tasksKeys as they are re-enabled via context!
						
						// keySet.remove(key); // remove the key element
						let action = 'modify key ';
						let id = key.id;
						let observes = key.getAttribute('observes') ? key.getAttribute('observes') : '';
						let cmd = key.getAttribute('oncommand') ? key.getAttribute('oncommand') : '';
						let newKey;
						
						if (isRecreateMethod) {
							if (id) {
								newKey = document.createElement("key");
								newKey.id = id; // make sure it is not missed
							}
						}
						else newKey=key;
						
						if (cmd) {
							newKey.command = '';
							if (isRecreateMethod) {
								newKey.setAttribute('oncommand','');
								action += "- Overwrote oncommand attribute ";
							}
							else {
							  newKey.removeAttribute('oncommand');
								action += "- removed oncommand attribute ";
							}
						}
						
						if (observes) {
							key.removeAttribute('observes'); // REMOVED OBSERVES
							if (ZombieKeys.Preferences.isDebugOption('accelerators.addModified.disable')) {
								ZombieKeys.Util.logDebugOptional('accelerators', 'removing observes ' + observes);
							}
							else {
								// the node will copy the relevant attributes from the observed node as soon as you reinsert it into the DOM.
								action += "- Removed and Readded key element";
								keySet.removeChild(key);
								keySet.appendChild(newKey);
							}
						}

						countRemoved++;
						
						// remove key accelerator from menu items
						if (id) {
							for(let j=0; j<menuItems.length; j++) {
								if (menuItems[j].getAttribute('key') && menuItems[j].getAttribute('key') == id) {
								  menuItems[j].removeAttribute('key');
								  ZombieKeys.Util.logDebugOptional('accelerators', 'removed key from menu item:' + menuItems[j].getAttribute('label'));
								}
							}
						}
						
						ZombieKeys.Util.logDebugOptional('accelerators',
							action + ': '  + 
							kbKey + '  '  + kbMods + '\n' +
							' command:  ' + cmd + '\n' +
							' observed: ' + observes);
					}
				}
			}
		}
		catch(ex) {
		  ZombieKeys.Util.logException("ZombieKeys.Composer.cleanKeySet(" + keysetName + ")", ex);
		}
	  ZombieKeys.Util.logDebugOptional('accelerators', countRemoved.toString() + ' items modified from keyset ' + keysetName +'.\n=======================');
		
		return countRemoved;
	} ,
	
	initKeysets: function() {
		let keySets = document.getElementsByTagName("keyset");
	  if (this.initDone) {
			for (let i = 0; i < keySets.length; i++) {
			  let keySet = keySets[i];
				let keysetName = 	keySet.id ? keySet.id : '(unnamed)';
				ZombieKeys.Util.logDebugOptional('accelerators', 'Keyset[' + i + '] ' + keysetName + ': ' + keySet.childNodes.length + ' child nodes');
			}		
		  ZombieKeys.Util.logDebugOptional('accelerators', 'initKeysets - early exit, initDone=true');
		  return;
		}
		ZombieKeys.Util.logDebugOptional('accelerators', 'Waiting to clean keysets...');
		// trying to take a shortcut here to get more instant deadkeys layout (from parent window)
		if (!ZombieKeys.currentLayout) {
			let mail3PaneWindow = Components.classes["@mozilla.org/appshell/window-mediator;1"]
										 .getService(Components.interfaces.nsIWindowMediator)
										 .getMostRecentWindow("mail:3pane");
			if (mail3PaneWindow) {
			  ZombieKeys.currentLayout = mail3PaneWindow.ZombieKeys.currentLayout;
			}
		}
		
		// wait until current Layout was loaded
		if (ZombieKeys.currentLayout) {
			for (let i = 0; i < keySets.length; i++) {
				ZombieKeys.Composer.cleanKeySet(keySets[i]);
			}		
			this.initDone=true;
		}
		else {
			window.setTimeout( function() { ZombieKeys.Composer.initKeysets(); }, 250 );
		}
	} ,
	
	stateListener: {	
		NotifyComposeFieldsReady: function() {} ,
		NotifyComposeBodyReady: function() {
		  // take a late approach for the initialisation:
			ZombieKeys.Util.logDebugOptional('accelerators', 'stateListener.NotifyComposeBodyReady');
		  ZombieKeys.Composer.initKeysets();
		} ,
		ComposeProcessDone: function(aResult) {} ,
		SaveInFolderDone: function(folderURI) {}
	}
	
}

try {
  let composer = document.getElementById("msgcomposeWindow");
	if (composer)
		composer.addEventListener("compose-window-init", ZombieKeys.Composer.initKeysets, false);	 
}
catch(ex) {
  ZombieKeys.Util.logException("ZombieKeys - trying to add compose init listener", ex);
}
		 
