const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterBox = document.querySelector(".letter");
const progressWord = document.querySelector(".word-in-progress");
const guessRemaining = document.querySelector(".remaining");
const guessRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const dotRemover = function(word) {
    const dots = [];
    for (const letter of word) {
        console.log(letter);
        dots.push("●")
    };

    progressWord.innerText = dots.join("");
};

dotRemover(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterBox.value;
    const goodGuess = letterInput(guess)
    if (goodGuess){
        makeGuess(guess);
    };
    letterBox.value = ""
});

const letterInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    }
    else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter.";
    }
    else {
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter."
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessUpdater();
        updateWordInProg(guessedLetters);
    }
};

const guessUpdater = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProg = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●")
        };
    };
    progressWord.innerText = revealWord.join("");
    winCheck();
};

const winCheck = function() {
    if (word.toUpperCase() === progressWord.innerText) {
       message.classList.add("win");
       message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
};