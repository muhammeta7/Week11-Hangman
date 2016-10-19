// require your letter objects
var letter = require('./letter.js');
// export to use in main.js
exports.WordConstructor = function(processWord){
	// array to contain letter objects
	var letterObjectArray = [];
	// loop through random word being selected & send letters to CreateLetterObject 
	for ( var i=0; i<processWord.length; i++){
		var temporaryLetter = new letter.CreateLetterObject(processWord[i], false, '_');
		letterObjectArray.push(temporaryLetter);
	}
	// send object array back to game.js
	return letterObjectArray;
}