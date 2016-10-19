// Global variables
var randomWord = '';
var guesses = 0;
var matchedGuesses = 0;

// require prompt to use to make the game 
// require the objects/ exports you will use
var prompt = require('prompt');
var wordFile = require('./word.js');
var selectWord = require('./game.js');

prompt.start();

game = {
	wordBank : selectWord.game.words,	// create or import a list of words
	wordsWon : 0,	// count of words Found
	guessesRemaining : 7, 	// per word
	currentWord : null, 	// the word object
	startGame : function (word){
		// make sure the user has 7 guesses
		this.guessesRemaining = 7;
		this.guessedLetters = [];
		this.currentWord = '';
		// get a random word from the array
		var randomNum = Math.floor(Math.random() * this.wordBank.length)
		// populate currentWord (made from Word constructor function) object with letters
		this.currentWord = wordFile.WordConstructor(this.wordBank[randomNum]);
		this.guessesRemaining = 7;
		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
    // reset guess count for new game	
    this.guessesRemaining = 7;
	},
	keepPromptingUser : function(){
		var self = this;
		prompt.get(['guessLetter'], function(err, result) {
	    // result is an object like this: { guessLetter: 'f' }
	    var decreaseGuesses = true;
	    // loop through letter objects to update object
	    for ( var i=0; i < self.currentWord.length; i++){
	    	if( result.guessLetter == self.currentWord[i].letter && self.currentWord[i].status == false){
	    		self.currentWord[i].status = true;
	    		self.currentWord[i].display = self.currentWord[i].letter;
	    		 // push letters into guessedLetters array
	   			self.guessedLetters.push(result.guessLetter);
	    		decreaseGuesses = false;
	    		// Check if you won
	    		var matchedLettersCount = 0;
	    		for ( var j=0; j < self.currentWord.length; j++){
	    			if (self.currentWord[j].status == true){
	    				matchedLettersCount++;
	    			} 
	    		}
	    		if (matchedLettersCount == self.currentWord.length){
	    			console.log('You win! Would you like to play again?');
	    			game.startGame();
	    			return;
	    		} else{
	    			console.log('Great job! The letter ' + result.guessLetter + ' is in the word.')
	    		}
	    	}
	    }

	    for ( var i=0; i < self.guessedLetters.length; i++){
	    	if( result.guessLetter == self.guessedLetters[i]){
	    		console.log('You have already guessed that letter! Try another one.');
	    		decreaseGuesses = false;
	    		
	    	}
	    }

	    // Incorrect guess and not guessed already
	    if (decreaseGuesses == true){
	    	self.guessesRemaining--;
	    	console.log('The letter ' + result.guessLetter + ' is not in the word');
	    	self.guessedLetters.push(result.guessLetter);
	    }
	    
	    // When user has no guesses remaining show them the word
	    if (self.guessesRemaining == 0){
	    	var printWord = '';
	    	for (var i = 0; i < self.currentWord.length; i++){
	    		printWord += self.currentWord[i].letter;
	    	}
	    	console.log('You lose! The word was ' + printWord + '.');
	    	// Restart game
	    	console.log('Play again!');
	    	game.startGame();
	    } else {
	    	// If user has guesses remaining and word is not found, display remaining guesses
	    	console.log('Guesses Remaining: ' + self.guessesRemaining);
	    	console.log('You have already guessed: ' + self.guessedLetters);
		    // Shows word
		   	var printWord = '';
		   	for ( var i=0; i < self.currentWord.length; i++){
		   		printWord += self.currentWord[i].display;
		   	}
		   	console.log(printWord);
		   	self.keepPromptingUser();
		   } 
		});
	}
};

game.startGame();
