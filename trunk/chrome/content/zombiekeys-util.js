 "use strict";
 
if (!ZombieKeys.StringBundle)
	ZombieKeys.StringBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
if (!ZombieKeys.Properties)
	ZombieKeys.Properties = ZombieKeys.StringBundle.createBundle("chrome://zombiekeys/locale/zombiekeys.properties");



ZombieKeys.TabURIregexp = {
	get _thunderbirdRegExp() {
		delete this._thunderbirdRegExp;
		return this._thunderbirdRegExp = new RegExp("^http://zombiekeys.mozdev.org/");
	}
};

ZombieKeys.TabURIopener = {

	openURLInTab: function (URL) {
		try {
			let sTabMode="";

			let wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
				   .getService(Components.interfaces.nsIWindowMediator);
			let mainWindow = wm.getMostRecentWindow("navigator:browser");
			if (mainWindow) {
				let newTab = mainWindow.gBrowser.addTab(URL);
				mainWindow.gBrowser.selectedTab = newTab;
				return true;
			}

			let tabmail;
			tabmail = document.getElementById("tabmail");
			if (!tabmail) {
				// Try opening new tabs in an existing 3pane window
				var mail3PaneWindow = Components.classes["@mozilla.org/appshell/window-mediator;1"]
										 .getService(Components.interfaces.nsIWindowMediator)
										 .getMostRecentWindow("mail:3pane");
				if (mail3PaneWindow) {
					tabmail = mail3PaneWindow.document.getElementById("tabmail");
					mail3PaneWindow.focus();
				}
			}
			if (tabmail) {
				sTabMode = (ZombieKeys.Util.Application == "Thunderbird" && ZombieKeys.Util.AppVersion>=3) ? "contentTab" : "3pane";
				tabmail.openTab(sTabMode,
				{contentPage: URL, clickHandler: "specialTabs.siteClickHandler(event, ZombieKeys.TabURIregexp._thunderbirdRegExp);"});
			}
			else
				window.openDialog("chrome://messenger/content/", "_blank",
								  "chrome,dialog=no,all", null,
			  {    tabType: "contentTab",
				   tabParams: {  contentPage: URL,
				                clickHandler: "specialTabs.siteClickHandler(event, ZombieKeys.TabURIregexp._thunderbirdRegExp);", 
												          id:"ZombieKeys_Weblink"
											} 
				} );
		}
		catch(e) { 
			return false; 
		}
		return true;
	}
};


if (!ZombieKeys.Util)
	ZombieKeys.Util = {
	ZombieKeys_CURRENTVERSION : '2.16',
	ConsoleService: null,
	mAppver: null,
	mAppName: null,
	mHost: null,
	lastTime: 0,
	myVersion: null,
	extraToolbar: null,

	getAddon: function(aId) {
		var em = Components.classes["@mozilla.org/extensions/manager;1"]
				  .getService(Components.interfaces.nsIExtensionManager);
		return em.getItemForID(aId);
	} ,

	get Version() {
		return this.myVersion
			   ?
			   this.myVersion
			   :
			   this.ZombieKeys_CURRENTVERSION;
	} ,
	
  get VersionSanitized() {
		return this.getVersionSimple(this.Version);
  } ,
	
	getVersionSimple: function(ver) {
	  let pureVersion = ver;  // default to returning unchanged
		// get first match starting with numbers mixed with . 	
		let reg = new RegExp("[0-9.]*");
		let results = ver.match(reg); 
		if (results) 
			pureVersion = results[0];
		return pureVersion;
	} ,	

	// dedicated function for email clients which don't support tabs
	// and for secured pages (donation page).
	openLinkInBrowserForced: function(linkURI) {
		try {
			ZombieKeys.Util.logDebug("openLinkInBrowserForced (" + linkURI + ")");
			if (ZombieKeys.Util.Application=='SeaMonkey') {
				var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
				var browser = windowManager.getMostRecentWindow( "navigator:browser" );
				if (browser) {
					let URI = linkURI;
					setTimeout(function() {  browser.currentTab = browser.getBrowser().addTab(URI); browser.currentTab.reload(); }, 250);
				}
				else
					window.openDialog(getBrowserURL(), "_blank", "all,dialog=no", linkURI, null, 'ZombieKeys update');

				return;
			}
			var service = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"]
				.getService(Components.interfaces.nsIExternalProtocolService);
			var ioservice = Components.classes["@mozilla.org/network/io-service;1"].
						getService(Components.interfaces.nsIIOService);
			var uri = ioservice.newURI(linkURI, null, null);
			service.loadURI(uri);
		}
		catch(e) { ZombieKeys.Util.logDebug("openLinkInBrowserForced (" + linkURI + ") " + e.toString()); }
	} ,

	// moved from options.js
	// use this to follow a href that did not trigger the browser to open (from a XUL file)
	openLinkInBrowser: function(evt,linkURI) {
		if (ZombieKeys.Util.AppVersion>=3 && ZombieKeys.Util.Application=='Thunderbird') {
			var service = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"]
				.getService(Components.interfaces.nsIExternalProtocolService);
			var ioservice = Components.classes["@mozilla.org/network/io-service;1"].
						getService(Components.interfaces.nsIIOService);
			service.loadURI(ioservice.newURI(linkURI, null, null));
			if(null!=evt)
				evt.stopPropagation();
		}
		else
			this.openLinkInBrowserForced(linkURI);
	} ,

	openURL: function(URL) { // workaround for a bug in TB3 that causes href's not be followed anymore.
		var ioservice,iuri,eps;

		if (ZombieKeys.Util.AppVersion<3 && ZombieKeys.Util.Application=='Thunderbird'
			|| ZombieKeys.Util.Application=='SeaMonkey'
			|| ZombieKeys.Util.Application=='Postbox')
		{
			this.openLinkInBrowserForced(URL);
		}
		else
		{
			ZombieKeys.TabURIopener.openURLInTab(URL);
		}
	} ,

	checkFirstRun: function() {
		ZombieKeys.Util.logDebug("checkFirstRun");
		var prev = -1, firstrun = true;
		var showFirsts = true, debugFirstRun = false;

		var svc = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
		var ssPrefs = svc.getBranch("extensions.ZombieKeys.");

		let current = ZombieKeys.Util.Version;
		ZombieKeys.Util.logDebug("Current ZombieKeys Version: " + current);
		try {
			ZombieKeys.Util.logDebugOptional ("firstRun","try to get setting: getCharPref(version)");
			try { prev = ssPrefs.getCharPref("version"); } catch (e) { prev = "?"; } ;

			ZombieKeys.Util.logDebugOptional ("firstRun","try to get setting: getBoolPref(firstrun)");
			try { firstrun = ssPrefs.getBoolPref("firstRun"); } catch (e) { firstrun = true; }

			// enablefirstruns=false - allows start pages to be turned off for partners
			ZombieKeys.Util.logDebugOptional ("firstRun","try to get setting: getBoolPref(enablefirstruns)");
			try { showFirsts = ssPrefs.getBoolPref("enablefirstruns"); } catch (e) { showFirsts = true; }


			ZombieKeys.Util.logDebugOptional ("firstRun", "Settings retrieved:"
					+ "\nprevious version=" + prev
					+ "\ncurrent version=" + current
					+ "\nfirstrun=" + firstrun
					+ "\nshowfirstruns=" + showFirsts
					+ "\ndebugFirstRun=" + debugFirstRun);

		}
		catch(e) {
			alert("Exception in ZombieKeys_util.js: " + e.message
				+ "\n\ncurrent: " + current
				+ "\nprev: " + prev
				+ "\nfirstrun: " + firstrun
				+ "\nshowFirstRuns: " + showFirsts
				+ "\ndebugFirstRun: " + debugFirstRun);

		}
		finally {
			ZombieKeys.Util.logDebugOptional ("firstRun","finally - firstrun=" + firstrun);

			// AG if this is a pre-release, cut off everything from "pre" on... e.g. 1.9pre11 => 1.9
			let pureVersion = ZombieKeys.Util.VersionSanitized;
			ZombieKeys.Util.logDebugOptional ("firstRun","finally - pureVersion=" + pureVersion);
			// change this depending on the branch
			let versionPage = "http://zombiekeys.mozdev.org/version.html#" + pureVersion;
			ZombieKeys.Util.logDebugOptional ("firstRun","finally - versionPage=" + versionPage);


			if (ZombieKeys.Preferences.getBoolPref("buttonAutoInstall")) {
				var toolbarName;
				switch(ZombieKeys.Util.Application) {
					case 'Firefox':
						toolbarName = "nav-bar";
						break;
					case 'Thunderbird':
						toolbarName = "mail-bar3";
						// chrome://messenger/content/messengercompose/messengercompose.xul
						this.extraToolbar = "composeToolbar2";
						break;
					case 'SeaMonkey':
						toolbarName = "nav-bar";
						// chrome://messenger/content/messenger.xul
						this.extraToolbar = "msgToolbar";
						// chrome://messenger/content/messengercompose/messengercompose.xul
						this.extraToolbar = "composeToolbar";
						break;
					case 'Postbox':
						toolbarName = "mail-bar7";
						//
						this.extraToolbar = "composeToolbar5";
						break;
				}

				if (toolbarName) {
					ZombieKeys.Util.installButton(toolbarName, "zombiekeys-toolbarbutton");
					ssPrefs.setBoolPref("buttonAutoInstall", false);
					if (this.extraToolbar) { // set a timer for the other window(s) to add button on load
					}
				}
			}

			if (firstrun){
				ZombieKeys.Util.logDebugOptional ("firstRun","set firstRun=false and store version " + current);
				ssPrefs.setBoolPref("firstRun",false);
				ssPrefs.setCharPref("version", pureVersion); // store current (simplified) version!

				if (showFirsts) {
					// Insert code for first run here
					// on very first run, we go to the index page - welcome blablabla
					ZombieKeys.Util.logDebugOptional ("firstRun","setTimeout for content tab (index.html)");
					window.setTimeout(function() {
						ZombieKeys.Util.openURL("http://ZombieKeys.mozdev.org/index.html");
					}, 1500); //Firefox 2 fix - or else tab will get closed (leave it in....)
				}
			}
			else { // this section does not get loaded if its a fresh install.
				if (prev!=pureVersion) { // VERSION UPDATE!
					ZombieKeys.Util.logDebugOptional ("firstRun","prev!=current -> upgrade case.");
					// upgrade case!!
					ssPrefs.setCharPref("version", pureVersion);

					if (showFirsts) {
						// version is different => upgrade (or conceivably downgrade)http://ZombieKeys.mozdev.org/version.html#version
						ZombieKeys.Util.logDebugOptional ("firstRun","open tab for version history + browser for donation " + current);

						window.setTimeout(function(){
							// display version history
							ZombieKeys.Util.openURL(versionPage);
						}, 2000);

						window.setTimeout(function(){
//							// display donation page (can be disabled; I will send out method to all donators and anyone who asks me for it)
//							if ((ZombieKeys.Preferences.getBoolPref("donateNoMore")))
//								ZombieKeys.Util.logDebugOptional ("firstRun","Jump to donations page disabled by user");
//							else
								ZombieKeys.Util.openURL("http://zombiekeys.mozdev.org/donate.html"); // show donation page!
						}, 1500);
					}
				}
				else {
					ZombieKeys.Util.logDebugOptional ("firstRun","prev!=current -> just a reload of same version - prev=" + prev + ", current = " + current);
				}
			}

		}

	} ,

	checkVersionFirstRun: function() {
		var aId = "zombiekeys@bolay.de";
		if(!Components.classes["@mozilla.org/extensions/manager;1"])
		{
			Components.utils.import("resource://gre/modules/AddonManager.jsm");
			setTimeout (function () {
					AddonManager.getAddonByID(aId,
						function(addon) {
							// This is an asynchronous callback function that might not be called immediately, ah well...
							window.ZombieKeys.Util.myVersion = addon.version;
							window.ZombieKeys.Util.logDebug("AddonManager retrieved Version number: " + addon.version);
							window.ZombieKeys.Util.checkFirstRun();
						}
					);
				}, 0);
		}
		else {
			ZombieKeys.Util.myVersion = this.getAddon(aId).version;
			ZombieKeys.Util.logDebug("Retrieved Version number from nsIExtensionManager (legacy): " + ZombieKeys.Util.myVersion);
			ZombieKeys.Util.checkFirstRun();
		}
	} ,

	get AppVersionFull() {
		var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
						.getService(Components.interfaces.nsIXULAppInfo);
		return appInfo.version;
	} ,

	get AppVersion() {
		if (null == this.mAppver) {
		var appVer=this.AppVersionFull.substr(0,3); // only use 1st three letters - that's all we need for compatibility checking!
			this.mAppver = parseFloat(appVer); // quick n dirty!
		}
		return this.mAppver;
	} ,

	get Application() {
		if (null==this.mAppName) {
		var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
						.getService(Components.interfaces.nsIXULAppInfo);
			const FIREFOX_ID = "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}";
			const THUNDERBIRD_ID = "{3550f703-e582-4d05-9a08-453d09bdfdc6}";
			const SEAMONKEY_ID = "{92650c4d-4b8e-4d2a-b7eb-24ecf4f6b63a}";
			const POSTBOX_ID = "postbox@postbox-inc.com";
			switch(appInfo.ID) {
				case FIREFOX_ID:
				  return this.mAppName='Firefox';
				case THUNDERBIRD_ID:
				  return this.mAppName='Thunderbird';
				case SEAMONKEY_ID:
				  return this.mAppName='SeaMonkey';
				case POSTBOX_ID:
				  return this.mAppName='Postbox';
				default:
				  this.mAppName=appInfo.name;
				  this.logDebug ( 'Unknown Application: ' + appInfo.name);
				  return appInfo.name;
			}
		}
		return this.mAppName;
	} ,

	get HostSystem() {
		if (null==this.mHost) {
			var osString = Components.classes["@mozilla.org/xre/app-info;1"]
						.getService(Components.interfaces.nsIXULRuntime).OS;
			this.mHost = osString.toLowerCase();
		}
		return this.mHost; // linux - winnt - darwin
	} ,

	get isPrivateBrowsing() {
		if (ZombieKeys.Util.Application == "Thunderbird" || ZombieKeys.Util.Application == "Postbox")
			return false;
		let isPrivate = false;
		try {
			// Firefox 20
			Components.utils.import("resource://gre/modules/PrivateBrowsingUtils.jsm");
			isPrivate = PrivateBrowsingUtils.isWindowPrivate(window);
		} 
		catch(e) {
			// pre Firefox 20 (if you do not have access to a doc.
			// might use doc.hasAttribute("privatebrowsingmode") then instead)
			try {
				isPrivate = Components.classes["@mozilla.org/privatebrowsing;1"]
															.getService(Components.interfaces.nsIPrivateBrowsingService)
															.privateBrowsingEnabled;
			} 
			catch(e) {
				this.logException("PrivateBrowsing()", e);
			}
		}
		return isPrivate;
	} ,

	logTime: function() {
		var timePassed = '';
		try {
			var end= new Date();
			var endTime = end.getTime();
			var elapsed = new String(endTime  - this.lastTime); // time in milliseconds
			timePassed = '[' + elapsed + ' ms]	 ';
			this.lastTime = endTime; // remember last time
		}
		catch(e) {;}
		return end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds() + '.' + end.getMilliseconds() + '  ' + timePassed;
	} ,

	logToConsole: function (msg, xml) {
	  if (this.ConsoleService == null)
		this.ConsoleService = Components.classes["@mozilla.org/consoleservice;1"]
								   .getService(Components.interfaces.nsIConsoleService);
	  var title = xml ? "[ZombieKeys XML]" : "[ZombieKeys]";
	  if (xml) title = title + "{xml}"; // test
	  this.ConsoleService.logStringMessage(title + " " + this.logTime() + "\n"+ msg);
	} ,

		// flags
	// errorFlag 		0x0 	Error messages. A pseudo-flag for the default, error case.
	// warningFlag 		0x1 	Warning messages.
	// exceptionFlag 	0x2 	An exception was thrown for this case - exception-aware hosts can ignore this.
	// strictFlag 		0x4
	logError: function (aMessage, aSourceName, aSourceLine, aLineNumber, aColumnNumber, aFlags) {
	  var consoleService = Components.classes["@mozilla.org/consoleservice;1"]
	                                 .getService(Components.interfaces.nsIConsoleService);
	  var aCategory = '';

	  var scriptError = Components.classes["@mozilla.org/scripterror;1"].createInstance(Components.interfaces.nsIScriptError);
	  scriptError.init(aMessage, aSourceName, aSourceLine, aLineNumber, aColumnNumber, aFlags, aCategory);
	  consoleService.logMessage(scriptError);
	} ,

  logException: function (aMessage, ex) {
		var stack = ''
		if (typeof ex.stack!='undefined')
			stack= ex.stack.replace("@","\n  ");
		// let's display a caught exception as a warning.
		let fn = ex.fileName ? ex.fileName : "?";
		this.logError(aMessage + "\n" + ex.message, fn, stack, ex.lineNumber, 0, 0x1);
	} ,
	
	// disable debug log output in private browsing mode to prevent key snooping
	logDebug: function (msg) {
	  if (!ZombieKeys.Preferences.isDebug) return;
		if (this.isPrivateBrowsing) return;
		if (!ZombieKeys.Preferences.isDebugOption('default')) return;
		this.logToConsole(msg);
	} ,

	// disable debug log output in private browsing mode to prevent key snooping
	logDebugOptional: function (option, msg) {
	  if (ZombieKeys.Preferences.isDebugOption(option) && !this.isPrivateBrowsing)
		this.logToConsole(msg);
	} ,

	showAboutConfig: function(filter) {

		const name = "Preferences:ConfigManager";
		const uri = "chrome://global/content/config.xul";

		var mediator = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
		var w = mediator.getMostRecentWindow(name);

		if (!w) {
			var watcher = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
			w = watcher.openWindow(null, uri, name, "chrome,resizable,centerscreen,width=500px,height=350px", null);
		}
		w.focus();
		w.setTimeout(
			function () {
				var flt = w.document.getElementById("textbox");
				if (flt) {
					flt.value=filter;
					flt.focus();
					if (w.self.FilterPrefs)
						w.self.FilterPrefs();
					// for security, we lock down about:config so users do not accidentally change stuff they shouldn't
					flt.setAttribute('readonly',true);
				}
			}, 300);
	} ,

	showVersionHistory: function(label, ask) {
		let current=label.value.toString();  // retrieve version number from label
		let pureVersion = ZombieKeys.Util.getVersionSimple(current);

		let sPrompt = ZombieKeys.Util.getBundleString("confirmVersionLink", "Display version history for ZombieKeys")
		if (!ask || confirm(sPrompt + " " + pureVersion + "?")) {
			ZombieKeys.Util.openURL("http://zombiekeys.mozdev.org/version.html" + "#" + pureVersion);
		}
	} ,

/**
 * Installs the toolbar button with the given ID into the given
 * toolbar, if it is not already present in the document.
 *
 * @param {string} toolbarId The ID of the toolbar to install to.
 * @param {string} id The ID of the button to install.
 */
	installButton: function (toolbarId, id) {
		if (!document.getElementById(id)) {
			let toolbar = document.getElementById(toolbarId);
			if (!toolbar) {
			  this.logDebug("installButton: toolbar not found {" + toolbarId + "}");
				return;
			}

			// append the item to the toolbar
			toolbar.insertItem(id, null);
			toolbar.setAttribute("currentset", toolbar.currentSet);
			document.persist(toolbar.id, "currentset");

			if (toolbarId == "addon-bar")
				toolbar.collapsed = false;
			}
	}

};





