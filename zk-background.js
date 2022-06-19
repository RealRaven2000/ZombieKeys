messenger.composeScripts.register({
    js: [
      { file: "scripts/zombiekeys-compose.js"}
    ]
});

	// modifiers: [ctrl, shift, alt]
	// make deadKeys accessible from outside (this. instead of var)
	// additional unicode keys from http://www.fileformat.info/info/unicode/
	// ideas for additional diacritics support from http://dry.sailingissues.com/us-international-keyboard-layout.html
	// create a floating panel with a "cheat sheet" which shows the screenshot of the configured locale. best make it resizable.
	var deadKeys= [
				{	"modifiers": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"id" : 1,
					"keyCode": 192, // Grave "`" US=192
					"mapping": { // latin                 // cyrilic
							 "A": "\u00c0", "a": "\u00e0", "\u0424": "\u00c0", "\u0444": "\u00e0"
							,"E": "\u00c8", "e": "\u00e8", "\u0423": "\u00c8", "\u0443": "\u00e8"
							,"I": "\u00cc", "i": "\u00ec", "\u0428": "\u00cc", "\u0448": "\u00ec"
							,"O": "\u00d2", "o": "\u00f2", "\u0429": "\u00d2", "\u0449": "\u00f2"
							,"U": "\u00d9", "u": "\u00f9", "\u0413": "\u00d9", "\u0433": "\u00f9"
								},
					"menuFake": false},

				{	"modifiers": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"id": 2,
					"keyCode":  39, // Acute "'"
					"mapping": {
								 "A": "\u00c1", "a": "\u00e1", "\u0424": "\u00c0", "\u0444": "\u00e0"
								,"D": "\u00d0", "d": "\u00f0"
                ,"C": "\u0106", "c": "\u0107"   // croatian
								,"E": "\u00c9", "e": "\u00e9", "\u0423": "\u00c8", "\u0443": "\u00e8"
								,"I": "\u00cd", "i": "\u00ed", "\u0428": "\u00cc", "\u0448": "\u00ec"
								,"O": "\u00d3", "o": "\u00f3", "\u0429": "\u00d2", "\u0449": "\u00f2"
								,"U": "\u00da", "u": "\u00fa", "\u0413": "\u00d9", "\u0433": "\u00f9"
								,"Y": "\u00dd", "y": "\u00fd"
								,"9": "\u2018", "0": "\u2019" //Smart single quotes
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 3,
					"keyCode": 54, // Circumflex "^"
					"mapping": {
								 "A": "\u00c2", "a": "\u00e2", "\u0424": "\u00c2", "\u0444": "\u00e2"
								,"E": "\u00ca", "e": "\u00ea", "\u0423": "\u00ca", "\u0443": "\u00ea"
								,"I": "\u00ce", "i": "\u00ee", "\u0428": "\u00ce", "\u0448": "\u00ee"
								,"O": "\u00d4", "o": "\u00f4", "\u0429": "\u00d4", "\u0449": "\u00f4"
								,"U": "\u00db", "u": "\u00fb", "\u0413": "\u00db", "\u0433": "\u00fb"
								,"W": "\u0174", "w": "\u0175"
								,"Y": "\u0176", "y": "\u0177"
								},
					"menuFake": false},

				// can not user CTRL+SHIFT+# on UK keyboard as it switches tab groups in Fx 5.0
				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 4,
					"keyCode": 192, // Tilde "~"
					"mapping": {
								 "A": "\u00c3", "a": "\u00e3", "\u0424": "\u00c3", "\u0444": "\u00e3"
								,"E": "\u1ebc", "e": "\u1ebd", "\u0423": "\u1ebc", "\u0443": "\u1ebd"
								,"I": "\u0128", "i": "\u0129", "\u0428": "\u0128", "\u0448": "\u0129"
								,"N": "\u00d1", "n": "\u00f1"
								,"O": "\u00d5", "o": "\u00f5", "\u0429": "\u00d5", "\u0449": "\u00f5"
								,"U": "\u0168", "u": "\u0169", "\u0413": "\u0168", "\u0433": "\u0169"
								,"V": "\u1e7c", "v": "\u1e7d"
								,"Y": "\u1ef8", "y": "\u1ef9"
								},
					"menuFake": false},

				{	"modifiers": {"ctrlKey": true, "shiftKey":	true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 5,
					"keyCode": 59, // Umlaut ":"
					"mapping": {
								 "A": "\u00c4", "a": "\u00e4", "\u0424": "\u00c4", "\u0444": "\u00e4"
								,"E": "\u00cb", "e": "\u00eb", "\u0423": "\u00cb", "\u0443": "\u00eb"
								,"I": "\u00cf", "i": "\u00ef", "\u0428": "\u00cf", "\u0448": "\u00ef"
								,"O": "\u00d6", "o": "\u00f6", "\u0429": "\u00d6", "\u0449": "\u00f6"
								,"U": "\u00dc", "u": "\u00fc", "\u0413": "\u00dc", "\u0433": "\u00fc"
								,"Y": "\u0178", "y": "\u00ff"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 6,
					"keyCode": 50, // Ring "@"
					"mapping": {
								 "A": "\u00c5", "a": "\u00e5"
								,"U": "\u016e", "u": "\u016f"
								,"y": "\u1e99"
								,"w": "\u1e98"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 7,
					"keyCode": 55, // AE,OE,Sharp S "&", section sign (paragraph)
					"mapping": { "a": "\u00e6"
								,"A": "\u00c6"
								,"o": "\u0153"
								,"O": "\u0152"
								,"s": "\u00df"
								,"$": "\u00a7"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"id": 8,
					"keyCode": 191, // Stroke "/"+CTRL
					"mapping": {
								 "O": "\u00d8", "o": "\u00f8"
								,"c": "\u00a2"
								,"d": "\u00f0", "D": "\u00d0" /* eth */
								,"u": "\u00fe", "U": "\u00de" /* thorn */
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 9,
					"keyCode": 190, // Caron (Hacek) ">" - problem: how to type d>z?
					"mapping": {
								 "A": "\u01cd", "a": "\u01ce", "\u0424": "\u01cd", "\u0444": "\u01ce"
								,"C": "\u010c", "c": "\u010d"
								,"D": "\u010e", "d": "\u010f"
								,"E": "\u011a", "e": "\u011B", "\u0423": "\u011a", "\u0443": "\u011B"
								,"G": "\u01e6", "g": "\u01e7"
								,"H": "\u021e", "h": "\u021f"
								,"I": "\u01cf", "i": "\u01d0", "\u0428": "\u01cf", "\u0448": "\u01d0"
								,"j": "\u01f0"
								,"K": "\u01e8", "k": "\u01e9"
								,"L": "\u013d", "l": "\u013e"
								,"N": "\u0147", "n": "\u0148"
								,"O": "\u01d1", "o": "\u01d2", "\u0429": "\u01d0", "\u0449": "\u01d2"
								,"R": "\u0158", "r": "\u0159"
								,"S": "\u0160", "s": "\u0161"
								,"T": "\u0164", "t": "\u0165"
								,"U": "\u01d3", "u": "\u01d4", "\u0413": "\u01d3", "\u0433": "\u01d4"
								,"Z": "\u017d", "z": "\u017e"
								," ": "\u02c7"
								},
					"menuFake": false},

				{"modifiers":   {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"id": 10,
					"keyCode": 188, // "<" Comma below / Cedilla ","
					"mapping": {
								 "C": "\u00c7", "c": "\u00e7"
								,"D": "\u1e10", "d": "\u1e11"
								,"E": "\u0228", "e": "\u0229", "\u0423": "\u0228", "\u0443": "\u0229"
								,"G": "\u0122", "g": "\u0123"
								,"H": "\u1e28", "h": "\u1e29"
								,"K": "\u0136", "k": "\u0137"
								,"L": "\u013b", "l": "\u013c"
								,"N": "\u0145", "n": "\u0146"
								,"R": "\u0156", "r": "\u0157"
								,"S": "\u015e", "s": "\u015f"
								,"T": "\u0162", "t": "\u0163"
								," ": "\u00b8"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 11,
					"keyCode": 57, // Breve "("
					"mapping": {
								 "A": "\u0102", "a": "\u0103", "\u0424": "\u0102", "\u0444": "\u0103"
								,"E": "\u0114", "e": "\u0115", "\u0423": "\u0114", "\u0443": "\u0115"
								,"G": "\u011e", "g": "\u011f"
								,"H": "\u1e2a", "h": "\u1e2b" // breve below
								,"I": "\u012c", "i": "\u012d", "\u0428": "\u012c", "\u0448": "\u012d"
								,"O": "\u014e", "o": "\u014f", "\u014e": "\u00d6", "\u0449": "\u014f"
								,"U": "\u016c", "u": "\u016d", "\u016c": "\u00dc", "\u0433": "\u016d"
								,"X": "\u04c1", "x": "\u04c2"  // ZHE
								," ": "\u02D8"
								},
					"menuFake": false},

				{	"modifiers": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 12,
					"keyCode": 56, // Ogonek "*"
					"mapping": {
								 "A": "\u0104", "a": "\u0105", "\u0424": "\u0104", "\u0444": "\u0105"
								,"E": "\u0118", "e": "\u0119", "\u0423": "\u0118", "\u0443": "\u0119"
								,"I": "\u012e", "i": "\u012f", "\u0428": "\u012e", "\u0448": "\u012f"
								,"O": "\u01ea", "o": "\u01eb", "\u0429": "\u01ea", "\u0449": "\u01eb"
								,"U": "\u0172", "u": "\u0173", "\u0413": "\u0172", "\u0433": "\u0173"
								," ": "\u02Db"
								},
					"menuFake": false},

				{	"modifiers": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 13,
					"keyCode": 109, // Macron "_" how to do ae ?
					"mapping": {
								 "A": "\u0100", "a": "\u0101", "\u0424": "\u0100", "\u0444": "\u0101"
								,"E": "\u0112", "e": "\u0113", "\u0423": "\u0112", "\u0443": "\u0113"
								,"G": "\u1e20", "g": "\u1e21"
								,"I": "\u012a", "i": "\u012b", "\u0428": "\u012a", "\u0448": "\u012b"
								,"O": "\u014c", "o": "\u014d", "\u0429": "\u014c", "\u0449": "\u014d"
								,"U": "\u016a", "u": "\u016b", "\u0413": "\u016a", "\u0433": "\u016b"
								,"Y": "\u0232", "y": "\u0233"
								," ": "\u00af"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"id": 14,
					"keyCode": 190, // Overdot "."
					"mapping": {
								 "A": "\u0226", "a": "\u0227", "\u0424": "\u0226", "\u0444": "\u0227"
								,"C": "\u010a", "c": "\u010b"
								,"E": "\u0116", "e": "\u0117", "\u0423": "\u0116", "\u0443": "\u0117"
								,"I": "\u0130"               , "\u0428": "\u0130"
								,"M": "\u1e40", "m": "\u1e41", "\u0411": "\u022e" // cyrillic small be
								,"N": "\u1e44", "n": "\u1e45"
								,"O": "\u022e", "o": "\u022f", "\u0429": "\u1e40", "\u0449": "\u1e41" // cyrillic sha
								,"P": "\u1e56", "p": "\u1e57"
								,"R": "\u1e58", "r": "\u1e59"
								,"S": "\u1e60", "s": "\u1e61"
								,"W": "\u1e86", "w": "\u1e87"
								,"X": "\u1e8a", "x": "\u1e8b"
								,"Y": "\u1e8e", "y": "\u1e8f"
								,"Z": "\u017b", "z": "\u017c"
								,"0": "\u2070", "1": "\u00b9", "2": "\u00b2", "3": "\u00b3", "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077", "8": "\u2078", "9": "\u2079"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey": false},
					"id": 15,
					"keyCode": 59, // Underdot ";"
					"mapping": {
								 "A": "\u1ea0", "a": "\u1ea1", "\u0424": "\u1ea0", "\u0444": "\u1ea1"
								,"D": "\u1e0c", "d": "\u1e0d"
								,"E": "\u1eb8", "e": "\u1eb9", "\u0423": "\u1eb8", "\u0443": "\u1eb9"
								,"H": "\u1e24", "h": "\u1e25"
								,"I": "\u1eca", "i": "\u1ecb"
								,"K": "\u1e32", "k": "\u1e33"
								,"L": "\u1e36", "l": "\u1e37"
								,"O": "\u1ecc", "o": "\u1ecd", "\u0429": "\u1ecc", "\u0449": "\u1ecd"
								,"S": "\u1e62", "s": "\u1e63"
								,"T": "\u1e6c", "t": "\u1e6d"
								,"U": "\u1ee4", "u": "\u1ee5", "\u0413": "\u1ee4", "\u0433": "\u1ee5"
								,"V": "\u1e7e", "v": "\u1e7f"
								,"W": "\u1e88", "w": "\u1e89"
								,"Y": "\u1ef4", "y": "\u1ef5"
								," ": "\u0323"
								,"0": "\u2080", "1": "\u2081", "2": "\u2082", "3": "\u2083", "4": "\u2084", "5": "\u2085", "6": "\u2086", "7": "\u2087", "8": "\u2088", "9": "\u2089"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 16,
					"keyCode": 50, // Double Accute """, smart double quotes
					"mapping": {
								 "O": "\u0150","o": "\u0151", "\u0429": "\u014c", "\u0449": "\u014d"
								,"U": "\u0170","u": "\u0171", "\u0413": "\u0172", "\u0433": "\u016b"
								," ": "\u02dd"
								,"9": "\u201C", "0": "\u201D"  //Smart double quotes
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"defaultmods": {"ctrlKey": true, "shiftKey": true, "altKey": false},
					"id": 17,
					"keyCode": 79, // o "o" circled letters!
					"mapping": {
								 "A": "\u24b6","a": "\u24d0"
								,"B": "\u24b7","b": "\u24d1"
								,"C": "\u24b8","c": "\u24d2"
								,"D": "\u24b9","d": "\u24d3"
								,"E": "\u24ba","e": "\u24d4"
								,"F": "\u24bb","f": "\u24d5"
								,"G": "\u24bc","g": "\u24d6"
								,"H": "\u24bd","h": "\u24d7"
								,"I": "\u24be","i": "\u24d8"
								,"J": "\u24bf","j": "\u24d9"
								,"K": "\u24c0","k": "\u24da"
								,"L": "\u24c1","l": "\u24db"
								,"M": "\u24c2","m": "\u24dc"
								,"N": "\u24c3","n": "\u24dd"
								,"O": "\u24c4","o": "\u24de"
								,"P": "\u24c5","p": "\u24df"
								,"Q": "\u24c6","q": "\u24e0"
								,"R": "\u24c7","r": "\u24e1"
								,"S": "\u24c8","s": "\u24e2"
								,"T": "\u24c9","t": "\u24e3"
								,"U": "\u24ca","u": "\u24e4"
								,"V": "\u24cb","v": "\u24e5"
								,"W": "\u24cc","w": "\u24e6"
								,"X": "\u24cd","x": "\u24e7"
								,"Y": "\u24ce","y": "\u24e8"
								,"Z": "\u24cf","z": "\u24e9"
								},
					"menuFake": false},

				{	"modifiers":   {"ctrlKey": true, "shiftKey": false, "altKey": true},
					"defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey": true},
					"id": 18,
					"keyCode": 71, // G greek letters!
					"mapping": {
								 "A": "\u0391","a": "\u03b1"  // alpha
								,"B": "\u0392","b": "\u03b2"  // beta
								,"C": "\u03a8","c": "\u03c8"  // psi
								,"D": "\u0394","d": "\u03b4"  // delta
								,"E": "\u0395","e": "\u03b5"  // epsilon
								,"F": "\u03a6","f": "\u03c6"  // phi
								,"G": "\u0393","g": "\u03b3"  // gamma
								,"H": "\u0397","h": "\u03b7"  // eta
								,"I": "\u0399","i": "\u03b9"  // iota
								,"J": "\u039e","j": "\u03be"  // xi
								,"K": "\u039a","k": "\u03ba"  // kappa
								,"L": "\u039b","l": "\u03bb"  // lambda
								,"M": "\u039c","m": "\u03bc"  // mu
								,"N": "\u039d","n": "\u03bd"  // nu
								,"O": "\u039f","o": "\u03bf"  // omicron
								,"P": "\u03a0","p": "\u03c0"  // pi
								,"R": "\u03a1","r": "\u03c1"  // rho
								,"S": "\u03a2","s": "\u03c3"  // sigma
								,"T": "\u03a4","t": "\u03c4"  // tau
								,"U": "\u0398","u": "\u03b8"  // theta
								,"V": "\u03a4","v": "\u03c9"  // omega
								,"W": "\u03c2","w": "\u03c2"  // final sigma/sin
								,"X": "\u03a7","x": "\u03c7"  // chi
								,"Y": "\u03a5","y": "\u03c5"  // upsilon
								,"Z": "\u0386","z": "\u03b6"  // zeta
								},
					"menuFake": false}


					];


	var aliveKeys = [
					{ "id": 1,
					  "modifiers":   {"ctrlKey": true, "shiftKey":  true, "altKey":  true},
					  "defaultmods": {"ctrlKey": true, "shiftKey":  true, "altKey":  true},
					  "charCode": 0,    // "?"
					  "keyCode": 191,
					  "target": "\u00bf"},

					{ "id": 2,
					  "modifiers":   {"ctrlKey": true, "shiftKey":  true, "altKey":  true},
					  "defaultmods": {"ctrlKey": true, "shiftKey":  true, "altKey":  true},
					  "charCode": 33,  // "!"
					  "keyCode": 49, 
					  "target": "\u00a1"},

					{ "id": 3,
					  "modifiers":   {"ctrlKey": true, "shiftKey": false, "altKey":  true},
					  "defaultmods": {"ctrlKey": true, "shiftKey": false, "altKey":  true},
					  "charCode": 101,  // "E"
					  "keyCode": 52,    // us=charCode 101 "e" - not necessary on Irish keyboard - it has Euro symbol on ALT-GR + 4
					  "target": "\u20ac"}];  //Euro

  
	// Locale Specific Layouts
	// we can add optional shiftKey overrides to cater for the locale!
	// add charCode for overriding accelerators during keypress
	var layouts = [{ "locale" : "us_int",
					 "map_deadKeys" : [
						 {"id" : 1, "keyCode": 192, "key": "`", "otherKey":"~"} /* grave */
						,{"id" : 2, "keyCode": 222, "key": "'"} /* acute */
						,{"id" : 3, "keyCode":  54, "key": "^", "otherKey":"6"} /* circumflex */
						,{"id" : 4, "keyCode": 192, "key": "~", "otherKey":"`"} /* tilde */
						,{"id" : 5, "keyCode":  59, "key": ":", "otherKey":";"} /* umlaut */
						,{"id" : 6, "keyCode":  50, "key": "@", "otherKey":"2", "charCode":  0}  /* ring */
						,{"id" : 7, "keyCode":  55, "key": "&", "otherKey":"7"} /* sharp s */
						,{"id" : 8, "keyCode": 191, "key": "/", "otherKey":"?"} /* stroke */
						,{"id" : 9, "keyCode": 190, "charCode": 62, "key": ">", "otherKey":"."} /* caron */
						,{"id" :10, "keyCode": 188, "charCode": 44, "key": "comma", "otherKey":"<"}  /* cedilla */
						,{"id" :11, "keyCode":  57, "key": "(", "otherKey":"9"} /* breve */
						,{"id" :12, "keyCode":  56, "key": "*", "otherKey":"8"} /* ogonek */
						,{"id" :13, "keyCode": 109, "key": "_", "otherKey":"-"} /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":">"} /* overdot */
						,{"id" :15, "keyCode":  59, "key": ";", "otherKey":":"} /* underdot */
						,{"id" :16, "keyCode": 222, "key": "\"", "otherKey":"'"} /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o"} /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					 ],
					 "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 191, "key": "?"}
						 ,{"id": 2, "charCode":  33, "keyCode":  49, "key": "!"}
						 ,{"id": 3, "charCode": 101, "keyCode": 101, "key": "e"}
					  ]
					}
,
					{ "locale" : "us_dvorak",
    				  "map_deadKeys" : [
						 {"id" : 1, "keyCode": 192, "key": "`", "otherKey":"~"} /* grave */
						,{"id" : 2, "keyCode": 222, "key": "'", "otherKey":"\""} /* acute */
						,{"id" : 3, "keyCode":  54, "key": "^", "otherKey":"6"} /* circumflex */
						,{"id" : 4, "keyCode": 192, "key": "~", "otherKey":"`"} /* tilde */
						,{"id" : 5, "keyCode":  59, "key": ":", "otherKey":";"} /* umlaut */
						,{"id" : 6, "keyCode":  50, "key": "@", "otherKey":"2", "charCode":  0}  /* ring */
						,{"id" : 7, "keyCode":  55, "key": "&", "otherKey":"7"} /* sharp s */
						,{"id" : 8, "keyCode": 191, "key": "/", "otherKey":"?"} /* stroke */
						,{"id" : 9, "keyCode": 190, "key": ".", "otherKey":">"} /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":"<"}  /* cedilla */
						,{"id" :11, "keyCode":  57, "key": "(", "otherKey":"9"} /* breve */
						,{"id" :12, "keyCode":  56, "key": "*", "otherKey":"8"} /* ogonek */
						,{"id" :13, "keyCode": 109, "key": "_", "otherKey":"-"} /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":">"} /* overdot */
						,{"id" :15, "keyCode":  59, "key": ";", "otherKey":":"} /* underdot */
						,{"id" :16, "keyCode": 222, "key": "\"", "otherKey":"'"} /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o"} /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 191, "key": "?"}
						 ,{"id": 2, "charCode":  33, "keyCode":  49, "key": "!"}
						 ,{"id": 3, "charCode": 101, "keyCode": 101, "key": "e"}
					  ]
					}
,
/* use charCode to override accelerators! */
					{ "locale" : "irl",
					  "map_deadKeys" : [
						 {"id" : 1, "keyCode": 192, "charCode": 96, "key": "`"} /* grave */
						,{"id" : 2, "keyCode": 222, "key": "'", "otherKey":"@"} /* acute */
						,{"id" : 3, "keyCode":  54, "key": "^", "otherKey":"6"} /* circumflex */
						,{"id" : 4, "keyCode": 163, "key": "~", "otherKey":"#", "shiftKey":false, "altKey": true} /* tilde */
						,{"id" : 5, "keyCode":  59, "key": ":", "otherKey":";"} /* umlaut */
						,{"id" : 6, "keyCode": 222, "key": "@", "otherKey":"'", "shiftKey":true} /* ring */
						,{"id" : 7, "keyCode":  55, "key": "&", "otherKey":"7"} /* sharp s */
						,{"id" : 8, "keyCode": 191, "key": "/", "otherKey":"?"} /* stroke */
						,{"id" : 9, "keyCode": 190, "key": ".", "otherKey":">", "shiftKey":true} /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":"<"}  /* cedilla */
						,{"id" :11, "keyCode":  57, "key": "(", "otherKey":"9"} /* breve */
						,{"id" :12, "keyCode":  56, "key": "*", "otherKey":"8"} /* ogonek */
						,{"id" :13, "keyCode": 173, "key": "_", "otherKey":"-"} /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":">"} /* overdot */
						,{"id" :15, "keyCode":  59, "key": ";", "otherKey":":"} /* underdot */
						,{"id" :16, "keyCode":  50, "key": "\"", "otherKey":"|"} /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o"} /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 191, "key": "?"}
						 ,{"id": 2, "charCode":  33, "keyCode":  49, "key": "!"}
						 ,{"id": 3, "charCode": 101, "keyCode":  36, "key": "$"}
					  ]
					}
,
					{ "locale" : "uk",
    				"map_deadKeys" : [
						 {"id" : 1, "keyCode": 192, "key": "`"} /* grave */
						,{"id" : 2, "keyCode": 222, "key": "'", "otherKey":"@"} /* acute */
						,{"id" : 3, "keyCode":  54, "key": "^", "otherKey":"6"} /* circumflex */
						,{"id" : 4, "keyCode": 163, "key": "~", "otherKey":"#", "shiftKey":false, "altKey": true} /* #~ tilde */
						,{"id" : 5, "keyCode":  59, "key": ":", "otherKey":";"} /* umlaut */
						,{"id" : 6, "keyCode": 222, "key": "@", "otherKey":"'", "shiftKey":true} /* @' ring */
						,{"id" : 7, "keyCode":  55, "key": "&", "otherKey":"7"} /* sharp s */
						,{"id" : 8, "keyCode": 191, "key": "/", "otherKey":"?"} /* stroke */
						,{"id" : 9, "keyCode": 190, "key": ".", "otherKey":">", "shiftKey":true} /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":"<"}   /* cedilla */
						,{"id" :11, "keyCode":  57, "key": "(", "otherKey":"9"} /* breve */
						,{"id" :12, "keyCode":  56, "key": "*", "otherKey":"8"} /* ogonek */
						,{"id" :13, "keyCode": 173, "key": "_", "otherKey":"-"} /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":">"} /* overdot */
						,{"id" :15, "keyCode":  59, "key": ";", "otherKey":":"} /* underdot */
						,{"id" :16, "keyCode":  50, "key": "\"", "otherKey":"|"} /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o"} /* o - circle (ctrlshift c is taken by lightning)*/
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 191, "key": "?"}
						 ,{"id": 2, "charCode":  33, "keyCode":  49, "key": "!"}
						 ,{"id": 3, "charCode": 101, "keyCode":  36, "key": "$"}
					  ]
					}
,
					{ "locale" : "fr",
    				"map_deadKeys" : [
						 {"id" : 1, "keyCode":  55, "key": "7", "otherKey":"`", "ctrlKey":true, "shiftKey":false}                  /* grave */
						,{"id" : 2, "keyCode":  52, "key": "4", "otherKey":"'", "ctrlKey":true, "shiftKey":true}                   /* acute */
						,{"id" : 3, "keyCode": 221, "key": "^", "otherKey":"9", "ctrlKey":false, "shiftKey":false, "altKey":false} /* circumflex */
						,{"id" : 4, "keyCode":  50, "key": "~", "otherKey":"2", "altKey": true}                                    /* tilde */
						,{"id" : 5, "keyCode": 221, "key": "..", "otherKey":"^", "ctrlKey":false, "shiftKey":true}                 /* umlaut */
						,{"id" : 6, "keyCode":  48, "key": "0", "otherKey":"@", "ctrlKey":true, "shiftKey":true}                   /* ring */
						,{"id" : 7, "keyCode":  49, "key": "&", "otherKey":"1", "ctrlKey":true, "shiftKey":true}                   /* sharp s */
						,{"id" : 8, "keyCode": 191, "key": "/", "otherKey":":", "ctrlKey":true}                                    /* stroke */
						,{"id" : 9, "keyCode": 226, "key": "<", "otherKey":">", "ctrlKey":true, "shiftKey":false}                  /* caron */
						,{"id" :10, "keyCode": 188, "key": ",", "otherKey":"?", "ctrlKey":true, "shiftKey":false}                  /* cedilla */
						,{"id" :11, "keyCode":  53, "key": "(", "otherKey":"5", "ctrlKey":true, "shiftKey":true}                   /* breve */
						,{"id" :12, "keyCode": 220, "key": "*", "ctrlKey":true, "shiftKey":false}                  /* ogonek */
						,{"id" :13, "keyCode":  56, "key": "_", "otherKey":"8", "ctrlKey":true, "shiftKey":true}                   /* macron */
						,{"id" :14, "keyCode": 190, "key": ".", "otherKey":";", "ctrlKey":true, "shiftKey":true}                   /* overdot */
						,{"id" :15, "keyCode": 190, "key": ";", "otherKey":".", "ctrlKey":true, "shiftKey":false}                  /* underdot */
						,{"id" :16, "keyCode":  51, "key": "\"", "otherKey":"8", "ctrlKey":true, "shiftKey":false}                 /* double acute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o"}                                                    /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 188, "key": "?"}
						 ,{"id": 2, "charCode":   0, "keyCode": 223, "key": "!"}
						 ,{"id": 3, "charCode": 101, "keyCode":  59, "key": "$"}
					  ]
					}
,
					{ "locale" : "it",
					  "map_deadKeys" : [
						 {"id" : 1, "keyCode":  59, "key": "&#232;", "shiftKey": false} /* grave */
						,{"id" : 2, "keyCode":  59, "key": "&#233;", "shiftKey": true } /* acute */
						,{"id" : 3, "keyCode": 221, "key": "^",      "shiftKey": true } /* circumflex */
						,{"id" : 4, "keyCode": 220, "key": "|", "otherKey":"\\",      "shiftKey": true } /* tilde */
						,{"id" : 5, "keyCode": 190, "key": ":", "otherKey":".",      "shiftKey": true } /* umlaut */
						,{"id" : 6, "keyCode": 222, "key": "&#778;", "otherKey":"#", "shiftKey": true } /* ring */
						,{"id" : 7, "keyCode":  54, "key": "&", "otherKey":"6",      "shiftKey": true } /* sharp s */
						,{"id" : 8, "keyCode":  55, "key": "/", "otherKey":"7",      "shiftKey": true } /* stroke */
						,{"id" : 9, "keyCode": 226, "key": ">", "otherKey":"\\",      "shiftKey": true } /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":";",  "shiftKey": false} /* cedilla */
						,{"id" :11, "keyCode":  56, "key": "(", "otherKey":"8",      "shiftKey": true } /* breve */
						,{"id" :12, "keyCode": 107, "key": "*", "otherKey":"+",      "shiftKey": true } /* ogonek */
						,{"id" :13, "keyCode": 109, "key": "_", "otherKey":"-",      "shiftKey": true } /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":":",      "shiftKey": false} /* overdot */
						,{"id" :15, "keyCode": 188, "key": ";", "otherKey":",",      "shiftKey": true } /* underdot */
						,{"id" :16, "keyCode":  50, "key": "\"", "otherKey":"2",     "shiftKey": true } /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o",      "shiftKey": true } /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 219, "key": "?"}
						 ,{"id": 2, "charCode":   0, "keyCode":  49, "key": "!"} /* already supported natively by italian keyboard */
						 ,{"id": 3, "charCode":   0, "keyCode":  52, "key": "$"}
					  ]
					}
,
					{ "locale" : "de",
					  "map_deadKeys" : [
						 {"id" : 1, "keyCode": 192, "charCode": 96, "key": "&#96;",  "shiftKey": true } /* grave */
						,{"id" : 2, "keyCode": 192, "charCode": 39, "key": "&#180;", "shiftKey": false} /* acute */
						,{"id" : 3, "keyCode": 220, "key": "^",      "shiftKey": false } /* circumflex */
						,{"id" : 4, "keyCode": 107, "key": "*", "otherKey":"+",      "shiftKey": true } /* tilde */
						,{"id" : 5, "keyCode": 190, "key": ":", "otherKey":".",      "shiftKey": true } /* umlaut */
						,{"id" : 6, "keyCode":  48, "key": "0", "otherKey":"-",      "shiftKey": false } /* ring above */
						,{"id" : 7, "keyCode":  54, "key": "&", "otherKey":"6",      "shiftKey": true } /* sharp s */
						,{"id" : 8, "keyCode":  55, "key": "/", "otherKey":"7",      "shiftKey": true } /* stroke */
						,{"id" : 9, "keyCode": 226, "key": ">", "otherKey":"<",      "shiftKey": true } /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":";",  "shiftKey": false} /* cedilla */
						,{"id" :11, "keyCode":  56, "key": "(", "otherKey":"8",      "shiftKey": true } /* breve */
						,{"id" :12, "keyCode": 191, "key": "'", "otherKey":"#",      "shiftKey": true } /* ogonek */
						,{"id" :13, "keyCode": 109, "key": "_", "otherKey":"-",      "shiftKey": true } /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":":",      "shiftKey": false} /* overdot */
						,{"id" :15, "keyCode": 188, "key": ";", "otherKey":",",      "shiftKey": true } /* underdot */
						,{"id" :16, "keyCode":  50, "key": "\"", "otherKey":"?",     "shiftKey": true } /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o",      "shiftKey": true } /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 219, "key": "?"}
						 ,{"id": 2, "charCode":   0, "keyCode":  49, "key": "!"}
						 ,{"id": 3, "charCode":   0, "keyCode":  52, "key": "$"}
					  ]
					}
,
					{ "locale" : "sv",
					  "map_deadKeys" : [
						 {"id" : 1, "keyCode": 219, "key": "&#96;", "shiftKey": true } /* grave */
						,{"id" : 2, "keyCode": 219, "key": "&#180;", "shiftKey": false} /* acute */
						,{"id" : 3, "keyCode":  59, "key": "^", "otherKey":"\"",      "shiftKey": true } /* circumflex */
						,{"id" : 4, "keyCode":  59, "key": "~", "otherKey":"^",      "shiftKey": false} /* tilde */
						,{"id" : 5, "keyCode": 190, "key": ":", "otherKey":".",      "shiftKey": true } /* umlaut */
						,{"id" : 6, "keyCode":  52, "key": "&#164;", "shiftKey": true } /* ring */
						,{"id" : 7, "keyCode":  54, "key": "&", "otherKey":"6",      "shiftKey": true } /* sharp s */
						,{"id" : 8, "keyCode":  55, "key": "/", "otherKey":"7",      "shiftKey": true } /* stroke */
						,{"id" : 9, "keyCode": 226, "key": ">", "otherKey":"<",      "shiftKey": true } /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":";",  "shiftKey": false} /* cedilla */
						,{"id" :11, "keyCode":  56, "key": "(", "otherKey":"8",      "shiftKey": true } /* breve */
						,{"id" :12, "keyCode": 191, "key": "'", "otherKey":"*",      "shiftKey": false} /* ogonek */
						,{"id" :13, "keyCode":  48, "key": "=", "otherKey":"0",      "shiftKey": true } /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":":",      "shiftKey": false} /* overdot */
						,{"id" :15, "keyCode": 188, "key": ";", "otherKey":",",      "shiftKey": true } /* underdot */
						,{"id" :16, "keyCode":  50, "key": "\"", "otherKey":"?",     "shiftKey": true } /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o",      "shiftKey": true } /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode":  107, "key": "?"}
						 ,{"id": 2, "charCode":   0, "keyCode":   49, "key": "!"}
						 ,{"id": 3, "charCode":   0, "keyCode": 9999, "key": "%"} /* not used */
					  ]
					}
,
					{ "locale" : "ru",
					  "map_deadKeys" : [
						 {"id" : 1, "keyCode": 226, "key": "\\",     "shiftKey": false} /* grave */
						,{"id" : 2, "keyCode": 220, "key": "/", "otherKey":"?",      "shiftKey": true } /* acute */
						,{"id" : 3, "keyCode":  54, "key": "^", "otherKey":"6",      "shiftKey": true } /* circumflex */
						,{"id" : 4, "keyCode": 192, "key": "~",      "shiftKey": true } /* tilde */
						,{"id" : 5, "keyCode":  59, "key": ":", "otherKey":";",      "shiftKey": true } /* umlaut */
						,{"id" : 6, "keyCode":  51, "key": "3", "otherKey":"#",      "shiftKey": true } /* ring */
						,{"id" : 7, "keyCode":  52, "key": "$", "otherKey":"4",      "shiftKey": true } /* sharp s */
						,{"id" : 8, "keyCode":  53, "key": "%", "otherKey":"5",      "shiftKey": true } /* stroke */
						,{"id" : 9, "keyCode": 190, "key": ">", "otherKey":".",      "shiftKey": true } /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":"<",  "shiftKey": false} /* cedilla */
						,{"id" :11, "keyCode":  57, "key": "(", "otherKey":"9",      "shiftKey": true } /* breve */
						,{"id" :12, "keyCode":  56, "key": "*", "otherKey":"8",      "shiftKey": true } /* ogonek */
						,{"id" :13, "keyCode": 226, "key": "|", "otherKey":"\\",      "shiftKey": true } /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":">",      "shiftKey": false} /* overdot */
						,{"id" :15, "keyCode":  59, "key": ";", "otherKey":":",      "shiftKey": false} /* underdot */
						,{"id" :16, "keyCode": 222, "key": "\"", "otherKey":"'",     "shiftKey": true } /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o",      "shiftKey": true } /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 219, "key": "?"}
						 ,{"id": 2, "charCode":   0, "keyCode":  49, "key": "!"}
						 ,{"id": 3, "charCode":   0, "keyCode":  52, "key": "$"}
					  ]
					}
,
					{ "locale" : "hu",
    				"map_deadKeys" : [
						 {"id" : 1, "keyCode":  55, "key": "7", "otherKey":"=", "shiftKey":true} /* grave */
						,{"id" : 2, "keyCode":  57, "key": "9", "otherKey":")", "shiftKey":true} /* acute */
						,{"id" : 3, "keyCode":  51, "key": "3", "otherKey":"6"} /* circumflex ^ */
						,{"id" : 4, "keyCode":  49, "key": "1", "otherKey":"'"} /* tilde ~ */
						,{"id" : 5, "keyCode":   0, "charCode": 220, "key": "Ü", "shiftKey":true}  /* umlaut */
						,{"id" : 6, "keyCode":  53, "key": "5", "otherKey":"%", "shiftKey":true} /* ring */
						,{"id" : 7, "keyCode":   0, "charCode": 225, "key": "Á", "shiftKey":false} /* sharp s - no key up event */
						,{"id" : 8, "keyCode":  68, "charCode": 68, "key": "D", "shiftKey":true} /* stroke */
						,{"id" : 9, "keyCode":  50, "key": "2", "shiftKey":true} /* caron */
						,{"id" :10, "keyCode": 188, "charCode": 44, "key": "comma", "otherKey":"?"}  /* cedilla */
						,{"id" :11, "keyCode":  52, "key": "4", "otherKey":"!"} /* breve */
						,{"id" :12, "keyCode":  54, "key": "6", "shiftKey":true, "otherKey":"/"} /* ogonek little tail */
						,{"id" :13, "keyCode": 173, "charCode": 95, "key": "-", "otherKey":"_"} /* macron bar over */
						,{"id" :14, "keyCode":  56, "charCode": 40, "key": "8", "shiftKey":true, "otherKey":"("} /* overdot */
						,{"id" :15, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":":"} /* underdot */
						,{"id" :16, "keyCode":   0, "charCode": 246, "key": "Ö", "otherKey":"˝", "shiftKey":false} /* double accute - no key up event*/
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o"} /* o - circle (ctrlshift c is taken by lightning)*/
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode": 191, "key": "?"}
						 ,{"id": 2, "charCode":  33, "keyCode":  49, "key": "!"}
						 ,{"id": 3, "charCode": 101, "keyCode":  36, "key": "$"}
					  ]
					}
,
					{ "locale" : "es",
					  "map_deadKeys" : [
						 {"id" : 1, "keyCode": 192, "key": "&#96;", "shiftKey": false } /* grave */
						,{"id" : 2, "keyCode":  0,  "charCode": 180, "key": "&#180;", "shiftKey": false} /* acute */
						,{"id" : 3, "keyCode": 192, "key": "^", "otherKey":"&#96;", "shiftKey": true } /* circumflex */
						,{"id" : 4, "keyCode":  52, "key": "4", "otherKey":"$",  "shiftKey":true} /* tilde */
						,{"id" : 5, "keyCode":   0, "charCode": 168, "key": "&#776;", "otherKey":"&#776;"} /* umlaut */
						,{"id" : 6, "keyCode":   0, "charCode": 186, "key": "&#176;", "shiftKey": true, "altKey": true } /* ring  */
						,{"id" : 7, "keyCode":  54, "key": "&", "otherKey":"6",      "shiftKey": true } /* sharp s */
						,{"id" : 8, "keyCode":  55, "key": "/", "otherKey":"7",      "shiftKey": true } /* stroke */
						,{"id" : 9, "keyCode":  60, "key": ">", "otherKey":"<",      "shiftKey": true } /* caron */
						,{"id" :10, "keyCode": 188, "key": "comma", "otherKey":";",  "shiftKey": false} /* cedilla */
						,{"id" :11, "keyCode":  56, "key": "(", "otherKey":"8",      "shiftKey": true } /* breve */
						,{"id" :12, "keyCode": 171, "key": "plus", "otherKey":"*",   "shiftKey": true} /* ogonek */
						,{"id" :13, "keyCode": 173, "key": "-", "otherKey":"_",      "shiftKey": true } /* macron */
						,{"id" :14, "keyCode": 190, "charCode": 46, "key": ".", "otherKey":":",  "shiftKey": false} /* overdot */
						,{"id" :15, "keyCode": 188, "key": ";", "otherKey":",",      "shiftKey": true } /* underdot */
						,{"id" :16, "keyCode":  50, "key": "\"", "otherKey":"2",     "shiftKey": true } /* double accute */
						,{"id" :17, "keyCode":  79, "key": "O", "otherKey":"o",      "shiftKey": true } /* circle */
						,{"id" :18, "keyCode":  71, "key": "G", "otherKey":"g"} /* greek */
					  ],
					  "map_liveKeys" : [
						  {"id": 1, "charCode":   0, "keyCode":  222, "key": "?"}
						 ,{"id": 2, "charCode":   0, "keyCode":   49, "key": "!"}
						 ,{"id": 3, "charCode":   0, "keyCode": 9999, "key": "%"} /* not used */
					  ]
					}
				 ];
  
	let currentLayout = null,
	    decUnicode = "";
  
  
  const msg_commands = [
    "keyPress",
    "keyUp"
  ]  
  
  ZombieKeys = {
    DisableListeners: false,
    HexUnicodeKey: {
      "modifiers": {"ctrlKey": false, "shiftKey": false, "altKey":  true},
			"keyCode": 88
    },
    DecUnicodeModifiers:  {"ctrlKey": false, "shiftKey": false, "altKey":  true}
  }
  
	ZombieKeys.logMappingString = function (mapping) {
		let message="";
		for (let mappee in mapping) {
			if (mappee.charCodeAt(0) < 256) // filter out cyrillic
				message += mappee+" ("+mappee.charCodeAt(0)+") => "+
					mapping[mappee]+" ("+mapping[mappee].charCodeAt(0)+") ";
		}
		return message+"\n";
	}  
  
  ZombieKeys.displayMapping = async function (k) {
    let map = deadKeys[k].mapping;
		if (await ZombieKeys.Preferences.isPreference('showMapping') && !ZombieKeys.Util.isPrivateBrowsing) {
			ZombieKeys.Util.logToConsole("created zombie id "+ (k+1) +" you can now press: \n" + ZombieKeys.logMappingString(map));
		}
	};

  ZombieKeys.Util = {
    // 367
    get isPrivateBrowsing() {
      return false; // Thunderbird is never private
      // if Firefox, check if we are in private mode
      // used to use nsIPrivateBrowsingService.privateBrowsingEnabled
    } ,

    // 391
    logTime: function logTime() {
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
    } ,
    
    // 405
    // xml - obsolete parameter
    logToConsole: function logToConsole(msg, xml, optionTag) {
      let title = "[ZombieKeys]" 
        + (optionTag ? '{' + optionTag.toUpperCase() + '} ' : '')
        + ' ' + this.logTime() + "\n";
      console.log(title + msg);
    } ,

    logException: function logException(aMessage, ex) {
      let stack = ''
      if (typeof ex.stack!='undefined')
        stack = ex.stack.replace("@","\n  ");
      // let's display a caught exception as a warning.
      let fn = ex.fileName || "?";
      // this.logError(aMessage + "\n" + ex.message, fn, stack, ex.lineNumber, 0, 0x1);
      console.error(aMessage, ex);
    },
    
    /** 
    * only logs if debug mode is set and specific debug option are active
    * 
    * @optionString {string}: comma delimited options
    * @msg {string}: text to log 
    */   
    logDebugOptional: async function(optionString, msg) {
      let options = optionString.split(',');
      for (let i=0; i<options.length; i++) {
        let option = options[i];
        if (await ZombieKeys.Preferences.isDebugOption(option)) {
          this.logWithOption(...arguments);
          break; // only log once, in case multiple log switches are on
        }
      }
    },
    
    // first argument is the option tag
    logWithOption: function logWithOption(a) {
      arguments[0] =  "QuickFolders "
        +  '{' + arguments[0].toUpperCase() + '} ' 
        + ZombieKeys.Util.logTime() + "\n";
      console.log(...arguments);
    },
    
  }
  
  ZombieKeys.Preferences = {
    root: "extensions.zombiekeys.",
    isDebug: async function() {
      return await this.getBoolPref("debug");
    },
    
    isPreference: async function(option) {
      return await this.getBoolPref(option);
    },    
    
    isDebugOption: async function(option) { // granular debugging
      if(!await this.isDebug()) return false;
      try { return await this.getBoolPref("debug." + option);}
      catch(e) { 
        return true; // more info is probably better in this case - this is an illegal value after all.
      }
    }, 
    
    getBoolPref: async function getBoolPref(p) {
      let ans = false,
          key = p.startsWith(ZombieKeys.Preferences.root) ? p : ZombieKeys.Preferences.root + p;
      
      try {
        ans = await browser.LegacyPrefs.getPref(key);
      }
      catch(ex) {
        ZombieKeys.Util.logException("getBoolPref("  + p +") failed\n", ex);
        throw(ex);
      }
      return ans;
    },
    
  }
  
  // 906
 	async function logKey(why, event) {
		const util = ZombieKeys.Util;
	  if (util.isPrivateBrowsing)
			return;
		let keyEventProps = ['keyCode', 'charCode', 'shiftKey', 'altKey', 'ctrlKey'];

		let message=why,
		    key_Pressed='';
		for (let k=0; k<keyEventProps.length; k++) {
			message += keyEventProps[k] + "=" + event[keyEventProps[k]]+" ";

			if(keyEventProps[k] == 'keyCode' && event[keyEventProps[k]]>0 )
				key_Pressed += '  kC [' + String.fromCharCode(event[keyEventProps[k]]) + ']';
			if(keyEventProps[k] == 'charCode' && event[keyEventProps[k]]>0)
				key_Pressed += '  cC [' + String.fromCharCode(event[keyEventProps[k]]) + ']';

		}
		message += key_Pressed;
		util.logToConsole(message+"\n");
	}

  // 944
	function checkModifiers(event, modifiers) {
		for (let key in modifiers) {
			if (event[key] != modifiers[key]) {
				return false;
			}
		}
		return true;
	}


  // 954
	// THIS INSERTS THE ZOMBIEFIED CHARACTER
	async function fakeKey(event, chr, createKeyUp) {
		const util = ZombieKeys.Util;
		try {
			let isDebug = ZombieKeys.Preferences.isDebugOption('fakeKey');
			if (isDebug) {
				logKey("fakeKey: ('" + chr + "' " + event.type + ")", event);
				if (event.type=='keypress')
					ZombieKeys.LastAliveKeyDown = chr; // remember keyPress
				else {
					if (chr==ZombieKeys.LastAliveKeyDown) { // avoid duplication on keyup!
						ZombieKeys.LastAliveKeyDown = null;
						return;
					}
					ZombieKeys.LastAliveKeyDown = null;
				}
			}

			if (await ZombieKeys.Preferences.isPreference('subComma')) {
				switch (chr) {
					case "\u015e": // S-cedilla
						chr = "\u0218";
						break;
					case "\u015f": // s-cedilla
						chr = "\u0219";
						break;
					case "\u0162": // T-cedilla
						chr = "\u021a";
						break;
					case "\u0163": // t-cedilla
						chr = "\u021b";
						break;
					case "\u1e10": // D-cedilla - does not exist in Unicode
						break;
					case "\u1e11": // d-cedilla - does not exist in Unicode
						break;
				}
			}
      
      return {
        text: chr,
        charCode: chr.charCodeAt(0)
      }
			
      
      // we do NOT have target as it cannot be transmitted to the background
			let target = event.originalTarget ? event.originalTarget : (event.target ? event.target : document.commandDispatcher.focusedElement);
			// compose window or elements that do not expose selection (e.g. gmail compose area)
			if (target.nodeName=="HTML" ||
				null==target.selectionStart ||
				isNaN(target.selectionStart)
			) {

				// PRESS
				let keypress_event = document.createEvent("KeyboardEvent"), // KeyEvents
				    eventView = (event.view) ? event.view : keypress_event.view; // make xbl compatible (?)
        keypress_event.initKeyEvent("keypress", true, true, eventView,
                 false, false, false, false,     // ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, 
                 0, chr.charCodeAt(0));
									 
				util.logDebugOptional("fakeKey", ("faking '" + chr + "': " + keypress_event.type + " + target: " + target.id + "\n---"));
				target.dispatchEvent(keypress_event);
			}
			else {
				ZombieKeys.insertAtCaret(target, chr);
			}
			// "keypress" or "keyup"
			event.preventDefault();
			event.stopPropagation();

		}
		catch(ex) {
			util.logToConsole("exception during fakekey: " + ex.toString());
		}

	};

  // 1143
	async function keyPressHandler(event) {
	  if (ZombieKeys.DisableListeners) return;
		const util = ZombieKeys.Util;
		let isDebug = await ZombieKeys.Preferences.isDebugOption('keyPressHandler');
		if (isDebug) { ZombieKeys.logKey("press: ", event); }

		// check "alive" keys which fire during "keypress"
		for (let k=0; k<aliveKeys.length; k++) {
			if (  ( (event.keyCode && event.keyCode  == aliveKeys[k].keyCode)
					||
				    (event.charCode && event.charCode == aliveKeys[k].charCode)    )
				&&
				checkModifiers(event, aliveKeys[k].modifiers)) {
				return await fakeKey(event, aliveKeys[k].target);
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
						return fakeKey(event, deadKey.mapping[code], true); // copy event with keyup!
					}
					else
						return fakeKey(event, deadKey.mapping[code], false);
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
		if (ZombieKeys.DisableListeners || event.keyCode<20)
			return {
        isHandled: false
      }; // ignore CTRL,SHIFT and ALT
		let isDebug = await ZombieKeys.Preferences.isDebugOption('keyUpHandler');
		if (isDebug) {ZombieKeys.logKey("up: ", event);}

		// check "alive" keys which only fire on "keyup"
		for (let k=0; k<aliveKeys.length; k++) {
			if (( (event.keyCode && event.keyCode  == aliveKeys[k].keyCode)
					||
				    (event.charCode && event.charCode == aliveKeys[k].charCode)    )
				&&
				checkModifiers(event, aliveKeys[k].modifiers)) {
				return ZombieKeys.fakeKey(event, aliveKeys[k].target);
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
				return {
          isHandled: true,
          stopPropagation: true
        };
			} else if (event.keyCode == 18) {
				// released ALT - let's insert
				if (decUnicode != "") {
					let code = parseInt(decUnicode, 10);
					return await ZombieKeys.fakeKey(event, String.fromCharCode(code)); // isHandled: true ?
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



  async function notificationHandler(data) {
    let result;
    switch (data.command) {
      case "keyPress":
        // console.log("ZK notification handler keyPress", data.event);
        result = await keyPressHandler(data.event);
        console.log(result);
        return result;
      
      case "keyUp":
        // console.log("ZK notification handler Up", data.event);
        result = await keyUpHandler(data.event);
        console.log(result);
        return result;
    }
  }

// message listener - SELECTIVE!
// every message listener must have its unique set of messages (if it returns something)
messenger.runtime.onMessage.addListener((data, sender) => {
  if (msg_commands.includes(data.command)) {
    let p = notificationHandler(data, sender);  // await
    return p; // the result of this is a Promise
  }
});
  