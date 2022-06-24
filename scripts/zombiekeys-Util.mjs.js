
// use storage

export class ZombieKeysUtil {
  constructor() {
    // we need to find out if private browsing is enabled
    // use storage.local for debug switches
    // TO DO: remove dependency on ZombieKeys.Preferences.isDebugOption
  }
   
  // 367
  get isPrivateBrowsing() {
    return false; // Thunderbird is never private
    // if Firefox, check if we are in private mode
    // used to use nsIPrivateBrowsingService.privateBrowsingEnabled
  } 

  // 391
  logTime() {
    let timePassed = '',
        end = new Date(),
        endTime = end.getTime();
    try { // AG added time logging for test
      if (this.lastTime==0) {
        this.lastTime = endTime;
        return "[logTime init]"
      }
      let elapsed = new String(endTime - this.lastTime); // time in milliseconds
      timePassed = '[' + elapsed + ' ms]   ';
      this.lastTime = endTime; // remember last time
    }
    catch(e) {;}
    return end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds() + '.' + end.getMilliseconds() + '  ' + timePassed;
  } 
  
  // 405
  // xml - obsolete parameter
  logToConsole(msg, xml, optionTag) {
    let title = "[ZombieKeys]" 
      + (optionTag ? '{' + optionTag.toUpperCase() + '} ' : '')
      + ' ' + this.logTime() + "\n";
    console.log(title + msg);
  }

  logException(aMessage, ex) {
    let stack = ''
    if (typeof ex.stack!='undefined')
      stack = ex.stack.replace("@","\n  ");
    // let's display a caught exception as a warning.
    let fn = ex.fileName || "?";
    // this.logError(aMessage + "\n" + ex.message, fn, stack, ex.lineNumber, 0, 0x1);
    console.error(aMessage, ex);
  }
  
  /** 
  * only logs if debug mode is set and specific debug option are active
  * 
  * @optionString {string}: comma delimited options
  * @msg {string}: text to log 
  */   
  async logDebugOptional(optionString, msg) {
    let options = optionString.split(',');
    for (let i=0; i<options.length; i++) {
      let option = options[i];
      if (await this.isDebugOption(option)) {
        this.logWithOption(...arguments);
        break; // only log once, in case multiple log switches are on
      }
    }
  }
  
  // first argument is the option tag
  logWithOption(a) {
    arguments[0] =  "QuickFolders "
      +  '{' + arguments[0].toUpperCase() + '} ' 
      + this.logTime() + "\n";
    console.log(...arguments);
  }
  
  // 438
  async logDebug(msg) {
    // if (!ZombieKeys.Preferences.isDebug) return;
    if (this.isPrivateBrowsing) return;
    if (!this.isDebugOption("default")) return;
    this.logToConsole(msg);
  } 
  
  
  // IMPORTED FROM PREFERENCES
  async isDebugOption(option) {
    let result = await browser.storage.local.get({
      [`debug.${option}`] : false
    }); 
    return result[`debug.${option}`];
  }
  
  async setDebugOption(option) {
    await browser.storage.local.set (
      {[`debug.${option}`] : true }
    )
  }
  
  async readLocale() {
    let result = await browser.storage.local.get({"currentLayout" : "us_int"});
    return result.currentLayout;
  }
  
  async storeLocale(locale) {
    await browser.storage.local.set ({"currentLayout" : locale});    
  }

  async isPreference(option) {
    let result = await browser.storage.local.get({[option] : false});
    return result[option];
  }

  async resetDefaultPrefs() {
    // to activate a different layout, use
    // await browser.storage.local.set ({"currentLayout" : "de" });
    
    // debug
    await browser.storage.local.set ({"debug.composeScript" : false });
    await browser.storage.local.set ({"debug.default" : false });
    await browser.storage.local.set ({"debug.fakeKey" : false });
    await browser.storage.local.set ({"debug.keyPressHandler" : false });
    await browser.storage.local.set ({"debug.keyUpHandler" : false });
    await browser.storage.local.set ({"cedilla" : false }); // subComma
    // UI
    await browser.storage.local.set ({"showMapping" : false });
    await browser.storage.local.set ({"currentLayout" : "us_int" });
  }
 
}