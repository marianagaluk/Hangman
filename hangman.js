/*

Created by Mariana Galuk in 15/12/2017.

The game consists of:

- a secret word that is randomly chosen among a word list;
- buttons that represent each letter to be guessed, that triggers an onClick event;
- a function that checks if the letter guessed matches with the secret word;
- a function that outputs for the user if the guess was wrong or right by displaying the right
letter within the empty spaces of the word field or decreasing the number of attempts remaining;
- a finish message if the user won or lost the game;
- a restart button to let the user continue with a new word.

*/

"use strict";

var word = getWord();
var attempts = 6;
var correct = 0;

/*
Gets a random word from the word list on "wordlist.js".
wordlist is the array that stores all the words that Hangman will randomly select for the game.
*/
function getWord(){
	// gets a random number within the list number of elements.
	var randomNumber = Math.floor(Math.random() * wordList.length);
	// gets the word from that random position.
	var returnWord = wordList[randomNumber];
	return returnWord;
}

/*
Checks if the letter guessed matches with the letters of the secret word.
If yes, the right letter is added to the array.
*/
function getMatches(wrd, ltr) {
	var w = wrd.toUpperCase();
	var l = ltr.toUpperCase();
	var ret = [];
	var myArray = w.split("");
	for (var i=0; i<myArray.length; i++) {
		if (myArray[i] == l) {
			ret.push(i);
		}
	}
	return ret;
}

/*
Function checks if the user won or lost the game.
The final message of either winning or losing is displayed for the user
and the keyboard is disabled since the game is finished. Now the only
interaction option in the screen is the restart button.
*/
function finish(win) {
	if (win == true) {
		var message = "YOU HAVE WON! The word is " + word.toUpperCase();

	} else {
		var message = "GAME OVER! The word is " + word.toUpperCase();
	}
	var resultSpan = document.getElementById("result");
	resultSpan.innerHTML = message;
	var keyboardDiv = document.getElementById("keyboard");
	var keyboardNodes = keyboardDiv.childNodes
	for (var cn = 0; cn < keyboardNodes.length; cn++){ 
		if (keyboardNodes[cn].nodeName == "BUTTON") {
			keyboardNodes[cn].disabled = "disabled";
		}
	}
}
//Function runs by onClick event when the user clicks on the chosen letter.
function findSecretWord(el) {
	console.log(el.id);
	var letter = el.id;
	var matches = getMatches(word, letter);
	console.log(matches);
	//disables the button that was clicked to avoid duplate attempts
	el.disabled = "disabled";
	/*
	Check if the array returned have values
	If yes it means there was a match.
	*/
	if (matches.length > 0) {
		// Count the correct answers
		correct = correct + matches.length;
		/* 
		The returned values will be the positions in the word 
		where the letter appears. We loop through them.
		*/
		for (var i=0; i<matches.length; i++) {
			/* 
			We then use the position to change the text 
			in the same position of the hidden word table.
			*/
			var match = matches[i];
			var displayTable = document.getElementById("board");
			var displayRow = displayTable.rows[0];
			var displayCell = displayRow.cells[match];
			console.log(displayCell);
			displayCell.innerHTML = letter.toUpperCase();
		}

		/*
		Check if user completed the word by comparing the word size
		with the number of correct letters guessed.
		*/
		if (correct == word.length) {
			finish(true);
		}

	/*
	If the user made a wrong guess, the number of further attempts is decreased
	and the hangman image is changed.
	*/
	} else {
		attempts--;
		console.log(attempts);
		
		var hangImageSrc = "assets/" + attempts + ".png";
		var hangImage = document.getElementById("hang");
		hangImage.src = hangImageSrc;

		var livesSpan = document.getElementById("lives");
		livesSpan.innerHTML = attempts;
		
		console.log(hangImage.src);

		if (attempts == 0) {
			finish(false); 
		}
	}
}

/*
The code bellow runs at load time and prepares the game.
Further interactions are done via the function findSecretWord when the user clicks on the letter.
*/

var myArray = word.split("");

/*
The secret word is displayed in a table of one row, with one column per char.
The table is created empty on HTML and on the code below I add the row and in a loop 
add the columns based on the word's length.
At this point the colum is filled with "_", so the player can have an idea of the size of the word.
Later on the "_" is replaced by the word letters when the player gets it right.
*/
var display = document.getElementById("board");
console.log(display);

var row = document.createElement("tr");

for (var i=0; i<myArray.length; i++) {
	var cell = document.createElement("td");
	var content = document.createTextNode("_");
	cell.appendChild(content);
	row.appendChild(cell);
	
}
display.appendChild(row);



