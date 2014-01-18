 "use strict";

if (!ZombieKeys.Preferences) ZombieKeys.Preferences =
{
	service: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),

	get isDebug() {
		return this.service.getBoolPref("extensions.zombiekeys.debug");
	},

	isDebugOption: function(option) { // granular debugging
		if(!this.isDebug) return false;
		try {return this.service.getBoolPref("extensions.zombiekeys.debug." + option);}
		catch(e) {return false;}
	},

	isPreference: function(option) {
		try {return this.service.getBoolPref("extensions.zombiekeys." + option);}
		catch(e) {return false;}
	},

	getBoolPref: function(option) {
		return this.isPreference(option);
	}

}