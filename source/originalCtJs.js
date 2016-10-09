var xMargin = 96;
var yMargin = 32;
var lineSpace = 8;
var scriptVariety = [true,true];
var rawDocument = [];
var currentCursorSpot = 0;
var justPressedKey;
var currentlyPressedKeys=[];
var arrayOfWords = [];
var arrayOfLines = [];
var arrayOfPages = [];
var cursorsLine = 0;
var cursorInLine = 0;
var lineLengthInCharacters = 0;
var lineLength = Math.floor((window.innerWidth-(96*2))/12);
// A dictionary returning numbers based off the name of the key pressed. These are the key codes for each key.
var keysToKeyCodes = {
  'backspace':8,
  'tab':9,
  'enter':13,
  'shift':16,
  'ctrl':17,
  'alt':18,
  'caps lock':20,
  'escape':27,
  'space':32,
  'left':37,
  'up':38,
  'right':39,
  'down':40,
  'delete':46,
  '0':48,
  '1':49,
  '2':50,
  '3':51,
  '4':52,
  '5':53,
  '6':54,
  '7':55,
  '8':56,
  '9':57,
  'a':65,
  'b':66,
  'c':67,
  'd':68,
  'e':69,
  'f':70,
  'g':71,
  'h':72,
  'i':73,
  'j':74,
  'k':75,
  'l':76,
  'm':77,
  'n':78,
  'o':79,
  'p':80,
  'q':81,
  'r':82,
  's':83,
  't':84,
  'u':85,
  'v':86,
  'w':87,
  'x':88,
  'y':89,
  'z':90,
  'left command':91,
  'right command':93,
  'numpad0':96,
  'numpad1':97,
  'numpad2':98,
  'numpad3':99,
  'numpad4':100,
  'numpad5':101,
  'numpad6':102,
  'numpad7':103,
  'numpad8':104,
  'numpad9':105,
  'f1':112,
  'f2':113,
  'f3':114,
  'f4':115,
  'f5':116,
  'f6':117,
  'f7':118,
  'f8':119,
  'f9':120,
  'f10':121,
  'f11':122,
  'f12':123,
  'semicolon':186,
  'equals':187,
  'comma':188,
  'minus':189,
  'period':190,
  'forward slash':191,
  'tilda':192,
  'left bracket':219,
  'back slash':220,
  'right bracket':221,
  'single quote':222,
  'greek':250,
  'slanty':251,
  'superscript':252,
  'subscript':253,
};
// A dictionary that returns a key name, given a key code.
var keyCodesToKeys = {};
for (var property in keysToKeyCodes){
  keyCodesToKeys[keysToKeyCodes[property]] = property;
}
// An Array, whos elements are dictionaries. The first going from keys to key codes, the second going from key codes to keys.
var ktkc = [keysToKeyCodes,keyCodesToKeys];
// The image of a red bar used as the image of the cursor
var cursorImage = new Image();
cursorImage.src = 'c0000.PNG';
/* 
Below the character object is defined. Each character is added to the document after certain conditions are met.
The conditions are, and are checked in their order listed:
(0) That the key most recently pressed is the character in the array Triggers.
(1) That if there are any necessary conditions, that all of them are met. If there are unmet necessary conditions, 
that character is not added to the document. A necessary condition, is that a key is pressed down prior to the
trigger condition being met (that shift is held down prior to the a key being pressed, before capital A is added).
(2) That there are no met precluding conditions. If a precluding condition is met, the character is not added,
regardless to whether trigger or necessary conditions are met.
Precluding and necessary conditions must each be specified. For example, if there were no precluding conditions,
capital A and lowercase a would both be incited by shift + a. For lowercase a, it must be specified not to be added
if shift is pressed down.
 */
function character(necessaryConditions,triggers,precludingConditions,bigImage,lilImage,charAsString){
  this.necessaryConditions = necessaryConditions;
  this.triggers = triggers;
  this.precludingConditions = precludingConditions;
  /* 
  Each character has a big and lil image variety. The lil image variety is used when the character is being added
  to a super script or a subscript 
  */
  this.bigImage = bigImage;
  this.lilImage = lilImage;
  this.charAsString = charAsString;
}
var characters = [];
// Below every character is defined
// lowercase latin characters
characters.push(new character([],[ktkc[0]['a']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1']], '','',''));
characters.push(new character([],[ktkc[0]['b']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty']], '','',''));
characters.push(new character([],[ktkc[0]['c']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1'],ktkc[0]['3']], '','',''));
characters.push(new character([],[ktkc[0]['d']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1'],ktkc[0]['3'],ktkc[0]['4']], '','',''));
characters.push(new character([],[ktkc[0]['e']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1'],ktkc[0]['4']], '','',''));
characters.push(new character([],[ktkc[0]['f']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1']], '','',''));
characters.push(new character([],[ktkc[0]['g']],[ktkc[0]['shift'],ktkc[0]['alt'],ktkc[0]['greek'],ktkc[0]['slanty']], '','',''));
characters.push(new character([],[ktkc[0]['h']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1']], '','',''));
characters.push(new character([],[ktkc[0]['i']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1'],ktkc[0]['4']], '','',''));
characters.push(new character([],[ktkc[0]['j']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt']], '','',''));
characters.push(new character([],[ktkc[0]['k']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt']], '','',''));
characters.push(new character([],[ktkc[0]['l']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['3']], '','',''));
characters.push(new character([],[ktkc[0]['m']],[ktkc[0]['shift'],ktkc[0]['alt'],ktkc[0]['greek'],ktkc[0]['slanty']], '','',''));
characters.push(new character([],[ktkc[0]['n']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['2'],ktkc[0]['1'],ktkc[0]['4']], '','',''));
characters.push(new character([],[ktkc[0]['o']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt']], '','',''));
characters.push(new character([],[ktkc[0]['p']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['2']], '','',''));
characters.push(new character([],[ktkc[0]['q']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt']], '','',''));
characters.push(new character([],[ktkc[0]['r']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt']], '','',''));
characters.push(new character([],[ktkc[0]['s']],[ktkc[0]['shift'],ktkc[0]['alt'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['3'],ktkc[0]['4']], '','',''));
characters.push(new character([],[ktkc[0]['t']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty']], '','',''));
characters.push(new character([],[ktkc[0]['u']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['4']], '','',''));
characters.push(new character([],[ktkc[0]['v']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty']], '','',''));
characters.push(new character([],[ktkc[0]['w']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty']], '','',''));
characters.push(new character([],[ktkc[0]['x']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['alt'],ktkc[0]['1'],ktkc[0]['3'],ktkc[0]['4']], '','',''));
characters.push(new character([],[ktkc[0]['y']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty']], '','',''));
characters.push(new character([],[ktkc[0]['z']],[ktkc[0]['shift'],ktkc[0]['greek'],ktkc[0]['slanty'],ktkc[0]['4']], '','',''));
// upper case latin characters
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['a']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['b']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['c']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['d']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['e']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['f']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['g']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['h']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['i']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['j']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['k']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['l']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['m']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['n']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['o']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['p']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['q']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['r']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['s']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['t']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['u']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['v']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['w']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['x']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['y']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['z']],[ktkc[0]['slanty'],ktkc[0]['greek']], '','','')); 
characters.push(new character([],[ktkc[0]['space']],[],'','','')); // Space only requires the space bar
characters.push(new character([],[ktkc[0]['enter']],[],'','','')); // Enter only requires the enter key
// Punctuation
characters.push(new character([],[ktkc[0]['period']],[ktkc[0]['shift']],'','','')); 
characters.push(new character([],[ktkc[0]['comma']],[ktkc[0]['shift']],'','',''));
characters.push(new character([],[ktkc[0]['semicolon']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['semicolon']],[],'','',''));
characters.push(new character([],[ktkc[0]['single quote']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['single quote']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['forward slash']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['1']],[],'','',''));
// Brackets
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['9']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['0']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['left bracket']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['right bracket']],[],'','',''));
characters.push(new character([],[ktkc[0]['left bracket']],[ktkc[0]['shift'],ktkc[0]['alt']],'','',''));
characters.push(new character([],[ktkc[0]['right bracket']],[ktkc[0]['shift'],ktkc[0]['alt']],'','',''));
characters.push(new character([ktkc[0]['alt']],[ktkc[0]['left bracket']],[],'','',''));
characters.push(new character([ktkc[0]['alt']],[ktkc[0]['right bracket']],[],'','',''));
// Slashes
characters.push(new character([],[ktkc[0]['forward slash']],[ktkc[0]['shift']],'','',''));
characters.push(new character([],[ktkc[0]['back slash']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['back slash']],[],'','',''));
// Numbers
characters.push(new character([],[ktkc[0]['0']],[ktkc[0]['shift']],'','',''));
characters.push(new character([],[ktkc[0]['1']],[ktkc[0]['shift'],ktkc[0]['alt']],'','',''));
characters.push(new character([],[ktkc[0]['2']],[ktkc[0]['shift'],ktkc[0]['alt']],'','',''));
characters.push(new character([],[ktkc[0]['3']],[ktkc[0]['shift'],ktkc[0]['alt']],'','',''));
characters.push(new character([],[ktkc[0]['4']],[ktkc[0]['shift'],ktkc[0]['alt']],'','',''));
characters.push(new character([],[ktkc[0]['5']],[ktkc[0]['shift']],'','',''));
characters.push(new character([],[ktkc[0]['6']],[ktkc[0]['shift']],'','',''));
characters.push(new character([],[ktkc[0]['7']],[ktkc[0]['shift']],'','',''));
characters.push(new character([],[ktkc[0]['8']],[ktkc[0]['shift']],'','',''));
characters.push(new character([],[ktkc[0]['9']],[ktkc[0]['shift']],'','',''));
// Dummy Character
characters.push(new character([ktkc[0]['escape']],[],[ktkc[0]['escape']],'','',''));
// Those symbols above the number keys when you hold shift and hit keys that are numbers
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['2']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['3']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['4']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['5']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['6']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['7']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['8']],[],'','',''));
// Greek Lowercase
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['a']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['b']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['g']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['d']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['e']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['z']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['h']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['u']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['i']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['k']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['l']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['m']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['n']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['c']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['o']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['p']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['r']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['s']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['t']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['y']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['f']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['x']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['q']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['greek']],[ktkc[0]['w']],[ktkc[0]['shift']],'','',''));
// Greek Uppercase
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['a']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['b']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['g']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['d']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['e']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['z']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['h']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['u']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['i']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['k']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['l']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['m']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['n']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['c']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['o']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['p']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['r']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['s']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['t']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['y']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['f']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['x']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['q']],[],'','',''));
characters.push(new character([ktkc[0]['greek'],ktkc[0]['shift']],[ktkc[0]['w']],[],'','',''));
// Math
characters.push(new character([],[ktkc[0]['equals']],[ktkc[0]['shift'],ktkc[0]['alt'],ktkc[0]['tilda']],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['period']],[ktkc[0]['alt']],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['comma']],[ktkc[0]['alt']],'','',''));
characters.push(new character([ktkc[0]['shift'],ktkc[0]['alt']],[ktkc[0]['period']],[],'','',''));
characters.push(new character([ktkc[0]['shift'],ktkc[0]['alt']],[ktkc[0]['comma']],[],'','',''));
characters.push(new character([ktkc[0]['alt'],ktkc[0]['equals']],[ktkc[0]['d']],[],'','',''));
characters.push(new character([ktkc[0]['alt'],ktkc[0]['equals']],[ktkc[0]['a']],[],'','',''));
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['equals']],[ktkc[0]['alt'],ktkc[0]['tilda']],'','',''));
characters.push(new character([],[ktkc[0]['minus']],[ktkc[0]['shift'],ktkc[0]['alt']],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['m']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['q']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['s']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['o']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['f']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['n']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['l']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['r']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['i']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['c']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['j']],[],'','',''));
characters.push(new character([ktkc[0]['equals'],ktkc[0]['alt']],[ktkc[0]['k']],[],'','',''));
// Modal 
characters.push(new character([ktkc[0]['2'],ktkc[0]['alt']],[ktkc[0]['p']],[],'','',''));
characters.push(new character([ktkc[0]['2'],ktkc[0]['alt']],[ktkc[0]['n']],[],'','',''));
// First Order
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['e']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['a']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['n']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['i']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['f']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['d']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['x']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['c']],[],'','',''));
characters.push(new character([ktkc[0]['1'],ktkc[0]['alt']],[ktkc[0]['h']],[],'','',''));
// Proof Theory
characters.push(new character([ktkc[0]['3'],ktkc[0]['alt']],[ktkc[0]['s']],[],'','',''));
characters.push(new character([ktkc[0]['3'],ktkc[0]['alt']],[ktkc[0]['x']],[],'','',''));
characters.push(new character([ktkc[0]['3'],ktkc[0]['alt']],[ktkc[0]['d']],[],'','',''));
characters.push(new character([ktkc[0]['3'],ktkc[0]['alt']],[ktkc[0]['c']],[],'','',''));
characters.push(new character([ktkc[0]['3'],ktkc[0]['alt']],[ktkc[0]['l']],[],'','',''));
// Set Theory
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['e']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['d']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['n']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['i']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['u']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['a']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['s']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['z']],[],'','',''));
characters.push(new character([ktkc[0]['4'],ktkc[0]['alt']],[ktkc[0]['x']],[],'','',''));
// Slanty Lower case
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['a']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['b']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['c']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['d']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['e']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['f']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['g']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['h']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['i']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['j']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['k']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['l']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['m']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['n']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['o']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['p']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['q']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['r']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['s']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['t']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['u']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['v']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['w']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['x']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['y']],[ktkc[0]['shift']],'','',''));
characters.push(new character([ktkc[0]['slanty']],[ktkc[0]['z']],[ktkc[0]['shift']],'','',''));
// Slanty Upper Case
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['a']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['b']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['c']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['d']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['e']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['f']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['g']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['h']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['i']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['j']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['k']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['l']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['m']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['n']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['o']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['p']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['q']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['r']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['s']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['t']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['u']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['v']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['w']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['x']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['y']],[],'','',''));
characters.push(new character([ktkc[0]['slanty'],ktkc[0]['shift']],[ktkc[0]['z']],[],'','',''));
// Underscore
characters.push(new character([ktkc[0]['shift']],[ktkc[0]['minus']],[],'','',''));
// A function that reutrns a string expressing the numberal of NUMBER, that is also ZEROSTOFILL long 
function zeroPadder(number,zerosToFill){
  var numberAsString = number+'';
  while (numberAsString.length<zerosToFill){
    numberAsString = '0'+numberAsString;
  }
  return numberAsString;
}
/*
  stringCharactersListed is a string where each indexed element is a string version of that character in the characters index.
  This way, if I ever write code to convert from text to Chadtech text, I can refer to the charAsString property of each 
  character
*/
var stringCharactersListed ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ \n.,;:'+"'"+'"'+'?!(){}[]{}//|01234567899@#$%^&*abgdezhtiklmnxoprstufxqwABGDEZHTIKLMNXOPRSTUFXQW=><><%~+-*#``f`````->^#EA~```````````E```U````abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
var characterToString={}
for (var characterItem = 0; characterItem<characters.length; characterItem++){
  characters[characterItem].charAsString = stringCharactersListed[characterItem];
}
/*
  Each index in the array Characters, is a character.
  Each characters big and lil images are saved as an image whos name is that index number in a format.
  Naming the characters images in this way, enables me to automate the image loading process.
  Rather than write each image load line of code, I can say load an image that is a function of that
  characters index number for all indexed characters in the characters array
*/
for (var characterItem = 0; characterItem<characters.length; characterItem++){
  characters[characterItem].bigImage = new Image();
  characters[characterItem].bigImage.src = 'w'+zeroPadder(characterItem,4)+'.PNG';
  characters[characterItem].lilImage = new Image();
  characters[characterItem].lilImage.src = 'x'+zeroPadder(characterItem,4)+'.PNG';
}
/* 
The commands array is similar to the characters ass. The command object is similar to the character object.
A difference between the two objects is that commands have executions where characters have images.
An execution is a unique function that must be written out manually.
*/
var commands = [];
/*
Some commands are repeated iterations of other commands. A 'mega' command is a command done 2 to the megaMagnitude times
The megaMagnitude can be changed by a command. 
*/
var megaMagnitude = 3;
// The command object specified
function command(necessaryConditions,triggers,precludingConditions,execution){
  this.necessaryConditions=necessaryConditions;
  this.triggers=triggers;
  this.precludingConditions=precludingConditions;
  this.execution=execution;
}
commands.push(new command([],[ktkc[0]['backspace']],[ktkc[0]['ctrl'],ktkc[0]['shift']],function backspace(){ 
  rawDocument.splice(currentCursorSpot-1,1);
  currentCursorSpot-=1;
}));
commands.push(new command([ktkc[0]['ctrl']],[ktkc[0]['backspace']],[],function megaBackSpace(){
  for (var time = 0; time < Math.pow(2,megaMagnitude); time++){
    commands[0].execution();        
  }
}));
// Naming a function 'delete' returns an error. So I named it 'reverse backspace' instead. This command is fn + backspace on mac
// and delete on PC
commands.push(new command([],[ktkc[0]['delete']],[],function reverseBackspace(){
  rawDocument.splice(currentCursorSpot,1);
}));
commands.push(new command([],[ktkc[0]['left']],[ktkc[0]['ctrl']],function leftOver(){
  if (currentCursorSpot>0){
    currentCursorSpot-=1;
  }
}));
// Go right one character
commands.push(new command([],[ktkc[0]['right']],[ktkc[0]['ctrl']],function rightOver(){
  if (currentCursorSpot<rawDocument.length){
    currentCursorSpot+=1;
  }
}));
// Go one line up
commands.push(new command([],[ktkc[0]['up']],[ktkc[0]['alt'],ktkc[0]['tab'],ktkc[0]['tilda']],function upOver(){
  if (cursorsLine==0){
    currentCursorSpot=0;
  }
  else{
    if (arrayOfLines[cursorsLine-1].length > cursorInLine){
      currentCursorSpot-=arrayOfLines[cursorsLine-1].length+1;
    }
    else{
      currentCursorSpot-=cursorInLine+1
    }
  }
  if (currentCursorSpot < 0){
    currentCursorSpot=0;
  }
}));
commands.push(new command([],[ktkc[0]['down']],[ktkc[0]['alt'],ktkc[0]['tab'],ktkc[0]['tilda']],function downOver(){
  if ((cursorsLine+1)==arrayOfLines.length){
    currentCursorSpot=rawDocument.length;
  }
  else{
    if (arrayOfLines[cursorsLine+1].length < cursorInLine){
      currentCursorSpot+=(arrayOfLines[cursorsLine].length-cursorInLine)+arrayOfLines[cursorsLine+1].length+1;
    }
    else{
      currentCursorSpot+=arrayOfLines[cursorsLine].length+1;
    }
  }
  if (currentCursorSpot > rawDocument.length){
    currentCursorSpot = rawDocument.length;
  }
}));
commands.push(new command([ktkc[0]['ctrl']],[ktkc[0]['left']],[],function megaLeftOver(){
  for (var time = 0; time < Math.pow(2,megaMagnitude); time++){
    commands[3].execution();
  }
}));
commands.push(new command([ktkc[0]['ctrl']],[ktkc[0]['right']],[],function megaRightOver(){
  for (var time = 0; time < Math.pow(2,megaMagnitude); time++){
    commands[4].execution();
  }
}));
commands.push(new command([ktkc[0]['alt']],[ktkc[0]['up']],[],function megaUpOver(){
  for (var time=0; time < Math.pow(2,megaMagnitude); time++){
    commands[5].execution();
  }
}));
commands.push(new command([ktkc[0]['alt']],[ktkc[0]['down']],[],function megaDownOver(){
  for (var time=0; time<Math.pow(2,megaMagnitude); time++){
    commands[6].execution();
  }
}));
commands.push(new command([ktkc[0]['tilda']],[ktkc[0]['up']],[],function increaseLineSpace(){
  lineSpace+=1;
}));
commands.push(new command([ktkc[0]['tilda']],[ktkc[0]['down']],[],function decreaseLineSpace(){
  lineSpace-=1;
}));
commands.push(new command([ktkc[0]['tilda']],[ktkc[0]['equals']],[], function megaIncrease(){
    megaMagnitude+=1;
}));
commands.push(new command([ktkc[0]['tilda']],[ktkc[0]['minus']],[], function megaIncrease(){
    megaMagnitude-=1;
}));
commands.push(new command([ktkc[0]['alt']],[ktkc[0]['g']],[], function setGreek(){
  if (currentlyPressedKeys.indexOf(ktkc[0]['greek']) == -1){
    currentlyPressedKeys.push(ktkc[0]['greek']);  
  }
  else{
    currentlyPressedKeys.splice(currentlyPressedKeys.indexOf(ktkc[0]['greek']),1);
    commands[0].execution();
  }
}));
commands.push(new command([ktkc[0]['alt']],[ktkc[0]['s']],[], function setSlanty(){
  if (currentlyPressedKeys.indexOf(ktkc[0]['slanty']) == -1){
    currentlyPressedKeys.push(ktkc[0]['slanty']); 
  }
  else{
    currentlyPressedKeys.splice(currentlyPressedKeys.indexOf(ktkc[0]['slanty']),1);
    commands[0].execution();
  }
}));
commands.push(new command([ktkc[0]['tab']],[ktkc[0]['up']],[], function superScriptMode(){
  if (scriptVariety[0]==true){
    scriptVariety[0]=false;
    scriptVariety[1]=true;
  }
  else{
    scriptVariety[0]=true;
  }
}));
commands.push(new command([ktkc[0]['tab']],[ktkc[0]['down']],[], function subScriptMode(){
  if (scriptVariety[0]==true){
    scriptVariety[0]=false;
    scriptVariety[1]=false;
  }
  else{
    scriptVariety[0]=true;
  }
}));
/*
The global variable 'rawDocument' is populated by characters, where the character indexed 0 is the first one
and the last element is the last one in the document. Word wrapping, paragraphs, and lines are constructed in
seperate stages of reading the prior stages result.
The first stage, constructs the array arrayOfWords out of the rawDocument. As the name implies, its elements
are arrays populated by characters. The rawDocument is read through, and its characters are added to the last
word of the arrayOfWords array. If a space or an enter is found, a new word (an empty array) is added to the 
end of arrayOfWords
The second stage constructs the array arrayOfLines out of the arrayOfWords. arrayOfWords is read through, and
each word is added to a line element in arrayOfLines. If the line element is too long (measured in the sum of
of the length of each of its word elements) a new empty line element is added to arrayOfLines. If a word
is encountered, that contained only the enter character, a new line is made regardless as to the length of the
current line. This is how the paragraph break functionality works. The enter character is read, like any other
character, but rather than being added to the document a new line is added.
The third stage, takes the line elements of arrayOfLines, and populates a line element of differentArrayOfLines
with the characters of the words of the line element of arrayOfLines. When the document is finally reorganized
as lines containing characters, during the process of updating the screen each line can be read through element 
by element.
*/
function organizeWords(){
  var lineLength = Math.floor((window.innerWidth-(96*2))/12);
  arrayOfWords = [[]];
  for (var documentCharacter=0; documentCharacter<rawDocument.length; documentCharacter++){
    switch(rawDocument[documentCharacter][0]){
      case 52:
        arrayOfWords[arrayOfWords.length-1].push(rawDocument[documentCharacter]);
        arrayOfWords.push([]);
        break;
      case 53:
        arrayOfWords.push([[53,[],[]]]);
        arrayOfWords.push([]);
        break;
      default:
        arrayOfWords[arrayOfWords.length-1].push(rawDocument[documentCharacter]);
    }
    if (documentCharacter==(currentCursorSpot-1)){
      var wordCursorIsIn = arrayOfWords.length-1;
      var characterInWord = arrayOfWords[arrayOfWords.length-1].length-1;
    }
    if (currentCursorSpot==0){
      cursorInLine=0;
    }
  }
  arrayOfLines = [[]];
  lineLengthInCharacters = 0;
  for (var word = 0; word<arrayOfWords.length; word++){
    if (arrayOfWords[word].length){
      if (arrayOfWords[word][0][0]==53){
        arrayOfLines.push([]);
        lineLengthInCharacters=0;
      } 
      else{
        if ((lineLengthInCharacters+arrayOfWords[word].length)<lineLength){
          arrayOfLines[arrayOfLines.length-1].push(arrayOfWords[word]);
          lineLengthInCharacters+=arrayOfWords[word].length;
        }
        else{
          arrayOfLines.push([]);
          arrayOfLines[arrayOfLines.length-1].push(arrayOfWords[word]);
          lineLengthInCharacters=arrayOfWords[word].length;
        }
      }       
    }
    if (wordCursorIsIn==word){
      cursorsLine = arrayOfLines.length-1;
      cursorInLine = lineLengthInCharacters - (arrayOfWords[word].length-characterInWord-1);
    } 
  }
  var differentArrayOfLines=[];
  for (var line = 0; line < arrayOfLines.length; line++){
    differentArrayOfLines.push([]);
    for (var word = 0; word<arrayOfLines[line].length; word++){
      for (var characterInstance = 0; characterInstance < arrayOfLines[line][word].length; characterInstance++){
        differentArrayOfLines[differentArrayOfLines.length-1].push(arrayOfLines[line][word][characterInstance]);
      }
    }
  }
  arrayOfLines = differentArrayOfLines;
}
/* 
The draw function updates the screen. The draw function is used in many different parts of the code.
Any time the document is changed in some way that would result in a different appearance of the screen
the draw function needs to be fired. Examples include: when a key is added, when the cursor is moved,
when the window loads, and after a new document is loaded.
First (A), the canvas size is updated, to be either match the height of the depicted document, or the 
height of the window. Which ever is taller. If the depicted document suddenly grows in height, the page
automatically scrolls down. This ensures that the cursor will always remain in view.
Prior to depicting the words (B), draw runs the organizeWords function, which takes the current content
of the document and organizes in a way that is ideal for computer and human reading. The organizeWords
function results in an array of lines, which are themselves arrays of character. Then before drawing 
the document. The entire screen is filled with black, to erase the prior image. The draw function
reads each line, character by character, and draws the character at (x,y) coordinates that are a 
function of its line and its placement in that line. Finally, if the character has any subscript
or superscript elements, those are drawn on to the document at (x,y) coordinates that are a function
of its normal-script parent, and its placement in the superscript or subscript
After the document has been drawn. The cursor is drawn. And the writeData function is fired (explained
below) (C)
*/
function draw(){
  if ( currentCursorSpot < 0){
    currentCursorSpot = 0;
  }
  //   (A)
  var chadtechCanvas = document.getElementById("Chadtech-v0.5").getContext("2d");
  chadtechCanvas.canvas.width = window.innerWidth;
  if (window.innerHeight < ((arrayOfLines.length*(16+lineSpace))+64)){
    chadtechCanvas.canvas.height = (arrayOfLines.length*(16+lineSpace))+64;
  }
  else{
    chadtechCanvas.canvas.height = window.innerHeight;
  }
  if ( ((arrayOfLines.length*(16+lineSpace))+64)-(window.pageYOffset+32+(cursorsLine*(16+lineSpace))) < 124 ){
    if (currentlyPressedKeys.length){
      window.scrollBy(0,16+lineSpace);          
    }
  }
  //    (B)
  organizeWords();
  chadtechCanvas.fillStyle="#000000";
  if (window.innerHeight > ((arrayOfLines.length*(16+lineSpace))+64)){
    chadtechCanvas.fillRect(0,0,window.innerWidth,window.innerHeight);  
  }
  else{
    chadtechCanvas.fillRect(0,0,window.innerWidth,(arrayOfLines.length*(16+lineSpace))+64);
  }
  for (var line=0; line<arrayOfLines.length; line++){
    for (var characterInstance=0; characterInstance<arrayOfLines[line].length; characterInstance++){
      chadtechCanvas.drawImage(characters[arrayOfLines[line][characterInstance][0]].bigImage,(characterInstance*12)+96,((16+lineSpace)*line)+32)
      for (var superscriptCharacterItem=0; superscriptCharacterItem<arrayOfLines[line][characterInstance][1].length; superscriptCharacterItem++){
        chadtechCanvas.drawImage(characters[arrayOfLines[line][characterInstance][1][superscriptCharacterItem]].lilImage,((characterInstance+1)*12)+89+(superscriptCharacterItem*6),((16+lineSpace)*line)+24);
      }
      for (var subscriptCharacterItem=0; subscriptCharacterItem<arrayOfLines[line][characterInstance][2].length; subscriptCharacterItem++){
        chadtechCanvas.drawImage(characters[arrayOfLines[line][characterInstance][2][subscriptCharacterItem]].lilImage,((characterInstance+1)*12)+89+(subscriptCharacterItem*6),((16+lineSpace)*line)+48);
      }
    }
  }
  //      (C)
  chadtechCanvas.drawImage(cursorImage,(cursorInLine*12)+96,(cursorsLine*(16+lineSpace))+32);
  writeData();
}
/*
documtnetUpdate checks to see if a character is to be added to the document. Or if a command is to be
executed. It does this by running through the characters (or commands) array, and checking the conditions
for each element. If it discovers a character (or command) that the justPressedKey, and currentlyPressedKeys
meet the conditions for, it stops searching and adds the character or executes the command. An explaination
of the conditions can be found above when the characters and commands are defined.
*/
function documentUpdate(){
  var keepGoingThroughCharacters=true;
  for (var characterItem=0; characterItem<characters.length && keepGoingThroughCharacters; characterItem++){
    //    (0)
    for (var aTrigger=0; aTrigger<characters[characterItem].triggers.length; aTrigger++){
      if (characters[characterItem].triggers[aTrigger]==justPressedKey){
        //     (1)
        var passedNecessaryConditions=true;
        for (var aNecessaryCondition=0; aNecessaryCondition<characters[characterItem].necessaryConditions.length; aNecessaryCondition++){
          if (currentlyPressedKeys.indexOf(characters[characterItem].necessaryConditions[aNecessaryCondition])== -1){
            passedNecessaryConditions=false;
          }
        }
        //      (2)
        var passedPrecludingConditions = true;
        for (var aPrecludingCondition=0; aPrecludingCondition<characters[characterItem].precludingConditions.length;aPrecludingCondition++){
          if(currentlyPressedKeys.indexOf(characters[characterItem].precludingConditions[aPrecludingCondition]) != -1){
            passedPrecludingConditions=false;
          }
        }
        if (passedPrecludingConditions && passedNecessaryConditions){
          if (scriptVariety[0]){
            keepGoingThroughCharacters=false;
            rawDocument.splice(currentCursorSpot,0,[characterItem,[],[]]);
            currentCursorSpot+=1;
          }
          else{
            if (scriptVariety[1]){
              rawDocument[currentCursorSpot-1][1].push(characterItem);
            }
            else{
              rawDocument[currentCursorSpot-1][2].push(characterItem);
            }
          }
        }
      }
    }
  }
  var keepGoingThroughCommands=true;
  for (var commandItem=0; commandItem<commands.length && keepGoingThroughCommands; commandItem++){
    for (var aTrigger=0; aTrigger<commands[commandItem].triggers.length; aTrigger++){
      if(commands[commandItem].triggers[aTrigger]==justPressedKey){
        var passedANecessaryCondition = !commands[commandItem].necessaryConditions.length;
        if (!passedANecessaryCondition){
          for (var aNecessaryCondition=0; aNecessaryCondition<commands[commandItem].necessaryConditions.length; aNecessaryCondition++){
            if (currentlyPressedKeys.indexOf(commands[commandItem].necessaryConditions[aNecessaryCondition])!= -1){
              passedANecessaryCondition=true;
            }
          }
        }
        var passedPrecludingConditions = true;
        for (var aPrecludingCondition=0; aPrecludingCondition<commands[commandItem].precludingConditions.length; aPrecludingCondition++){
          if(currentlyPressedKeys.indexOf(commands[commandItem].precludingConditions[aPrecludingCondition]) != -1){
            passedPrecludingConditions=false;
          }
        }
        if(passedANecessaryCondition && passedPrecludingConditions){
          commands[commandItem].execution();
          keepGoingThroughCommands=false;
        }
      }
    }
  }
  //organizeWords();
}
/*
The writeData function has a similar purpose to the draw function. Unlike the draw function though,
writeData is encoding the rawDocument characters (in the form of index numbers of the characters array)
as pixels in the left half ot the document. During the fileLoad function, these pixels are read to
open up a new document.
To encode rawDocument as data, a few stages are gone through. Variables firstByte and secondByte are 
defined, and the index number of each character in the characters array of each character in the
rawDocument array are stored in these two bytes. The two bytes are pushed into the array 
documentAsData (A).
The array of bytes, is used to fill an array of pixel values. Each byte fills a color value of a
pixel, which at this stage is an array. One the pixel is 'full' (has three values), it is pushed
into the array bunchaPixels (B).
(C) The last pixel of each document is likely to be incomplete. After all the character Bytes are read
through, the last pixel is filled with color values of 83. Or, if all the character Bytes are read
through, an additional pixel containing color values 83, is added. When Chadtech reads an uploaded
document, 83 signals to stop reading, and that the document is read in its entirety. The actual
character 83, is called a 'dummy character'. It has an image, but it is impossible to invoke the 83
character (its key press conditions are a contradiction).
After all the pixels have been generated, each pixel is placed in the 0 pixel column on the page (
the very left side) (D). If it exceeds the height of the page, it rolls over onto the next column.
*/
function writeData(){
  var chadtechCanvas = document.getElementById("Chadtech-v0.5").getContext("2d");
  documentAsData=[];
  //     (A)
  for (var documentItem=0;documentItem<rawDocument.length;documentItem++){
    var firstByte=Math.floor(rawDocument[documentItem][0]/256);
    var secondByte=rawDocument[documentItem][0]%256;
    documentAsData.push(firstByte);
    documentAsData.push(secondByte);
  }
  // (B)
  var bunchaPixels=[];
  var singlePixel=[];
  bunchaPixels.push([2,1,3,255]);
  for (var datum=0;datum<documentAsData.length;datum++){
    singlePixel.push(documentAsData[datum]);
    if(singlePixel.length==3){
      bunchaPixels.push(singlePixel);
      singlePixel=[];
    }
  }
  //      (C)
  if (singlePixel.length>0 && 3>singlePixel.length){
    while (3>singlePixel.length){
      singlePixel.push(83);
    }
  }
  else{
    singlePixel=[83,83,83];
  }
  bunchaPixels.push(singlePixel);
  //        (D)
  for (var pixel=0;pixel<bunchaPixels.length;pixel++){
    var singleCanvasSpot=chadtechCanvas.createImageData(1,1);
    var colorValues=singleCanvasSpot.data;
    colorValues[0]=bunchaPixels[pixel][0];
    colorValues[1]=bunchaPixels[pixel][1];
    colorValues[2]=bunchaPixels[pixel][2];
    colorValues[3]=255;
    chadtechCanvas.putImageData(singleCanvasSpot,Math.floor(pixel/((arrayOfLines.length*(16+lineSpace))+64)),pixel%((arrayOfLines.length*(16+lineSpace))+64));
  }
}
/*
When the mouse button is clicked in the window, the (x,y) coordinates are considered.
If they are within the document, the cursor goes to this position.
*/
function onMouseDown(event){
  xSpot = event.clientX;
  ySpot = event.clientY;
  if (xSpot<(window.innerWidth-96) && 96<xSpot && ySpot<(window.innerHeight-32) && 32<ySpot){
    var whichLineInDocuY = Math.floor((ySpot+window.pageYOffset)/(16+lineSpace));
    var whichCharInLineX = Math.floor((xSpot-96)/12);
    var characterLineClickedOn = 0;
    if ((whichLineInDocuY-1)<arrayOfLines.length){
      for (var line = 0; line<whichLineInDocuY-1; line++){
        if (arrayOfLines[line].length<lineLength){
          characterLineClickedOn+=arrayOfLines[line].length+1;    
        }
        else{
          characterLineClickedOn+=arrayOfLines[line].length;
        }
      }
      if (whichCharInLineX < arrayOfLines[whichLineInDocuY-1].length){
        currentCursorSpot=characterLineClickedOn+whichCharInLineX;    
      }
      else{
        currentCursorSpot=characterLineClickedOn+arrayOfLines[whichLineInDocuY-1].length;
      }
      draw();
    }
  }
}
/*
When a key is pressed, the variable justPressedKey is set to the keyCode of the key pressed.
The key code is then checked to see if it is already present in the array of keys currently
pressed down (currentlyPressedKeys). If it isnt, then it is added to that array. Keys like
shift and alt, which are present in multiple locations on the keyboard can be pressed down
twice in a row, before being 'pressed up'.
*/
function keyEventDown(event){
  justPressedKey=event.keyCode;
  if (currentlyPressedKeys.indexOf(event.keyCode)== -1){
    currentlyPressedKeys.push(event.keyCode);
  }
  documentUpdate();
  event.preventDefault();
}
/*
When a key is released, the keycode is recognized, and then removed from the array of
currently pressed keys.
*/
function keyEventUp(event){
  var indexToRemove = currentlyPressedKeys.indexOf(event.keyCode);
  currentlyPressedKeys.splice(indexToRemove,1);
}
function onDragOver(){
  event.preventDefault();
  return false;
}
/*
The function fileLoad is fired whenever an image file is dragged and dropped onto the canvas. 
Most of the code is within the callback function that is called after the image is loaded.
When the image is loaded, it is pasted onto the canvas. From there, the color values in the
canvas are read. Before doing any of the essential work, it is checked if the upper left most
pixel is (2,1,3) in color value. If it is, Chadtech recognizes the dropped image as a Chadtech
document. (A) It is also at this point that the file name is read, and set at the title of the
webpage.
After the dropped image has been authorized. Chadtech begins reading the pixels of the upperleft
most pixels and storing the color values. (B) If it reads any pixel with a color value 83, it stops
the while loop and moves on.
The function fileLoad then takes the color values two at a time, and combining them into single
character index numbers. It adds that number to an array reconstructedData. Once it is done, 
the global variable rawDocument is simple set to equal reconstructedData
*/
function fileLoad(){
  var chadtechCanvas = document.getElementById("Chadtech-v0.5");
  var chadtechContext = chadtechCanvas.getContext("2d");
  event.preventDefault();
  var fileNameOfDroppedFile=event.dataTransfer.files[0].name;
  if (event.dataTransfer.files[0].type.slice(0,5) == 'image'){
    var imageReader = new FileReader();
    imageReader.onloadend = (function(theFile) {
      var fileName = theFile.name;
      return function(e){
        var imageToPaste = new Image();
        imageToPaste.src = e.target.result;
        chadtechContext.canvas.height = imageToPaste.height;
        var imageToPasteHeight=imageToPaste.height;
        chadtechContext.drawImage(imageToPaste,0,0);
        var authenticChadtechDocument=false;
        //       (A)
        if (chadtechContext.getImageData(0,0,1,1).data[0]==2 && chadtechContext.getImageData(0,0,1,1).data[1]==1 && chadtechContext.getImageData(0,0,1,1).data[2]==3){
          document.title = fileNameOfDroppedFile;
          authenticChadtechDocument=true;
        }
        if (authenticChadtechDocument){
          var rawPixelData = [];
          var reconstructedDocumentData = [];
          var grabbingThisPixel=1;
          var keepGrabbing=true;
          //      (B)
          var counter = 0;
          while(keepGrabbing && counter<4000){
            var thisPixel = chadtechContext.getImageData(Math.floor(grabbingThisPixel/imageToPasteHeight),grabbingThisPixel%imageToPasteHeight,1,1).data;
            for (var colorType=0; colorType<3 && keepGrabbing; colorType++){
              if (thisPixel[colorType]==83){
                keepGrabbing=false;
              }
              else{
                rawPixelData.push(thisPixel[colorType]);
              }
            }
            grabbingThisPixel+=1;
          }
          //      (C)
          var firstByte;
          var secondByte;
          for (var pixelDatum=0; pixelDatum < rawPixelData.length; pixelDatum++){
            if (pixelDatum%2==0){
              firstByte = rawPixelData[pixelDatum]*256;
            }
            else{
              secondByte = rawPixelData[pixelDatum];
              reconstructedDocumentData.push([firstByte+secondByte,[],[]]);
            }
          }
          rawDocument=reconstructedDocumentData;
        }
        else{
          draw();
        }
      };
    })(event.dataTransfer.files[0]);
    imageReader.readAsDataURL(event.dataTransfer.files[0]);
  }
}
setTimeout(draw(), 1000);