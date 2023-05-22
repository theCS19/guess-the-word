const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterBox = document.querySelector(".letter");
const progressWord = document.querySelector(".word-in-progress");
const guessRemaining = document.querySelector(".remaining");
const guessRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    dotRemover(word);
};

getWord();

const dotRemover = function(word) {
    const dots = [];
    for (const letter of word) {
        console.log(letter);
        dots.push("●")
    };

    progressWord.innerText = dots.join("");
};

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
        updateRemainingGuesses(guess);
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

const updateRemainingGuesses = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `The word has no ${guess}`;
        remainingGuesses -= 1;
    }
    else {
        message.innerText = `The word contains the letter ${guess}`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! the word was <span class="highlight">${word}</span>`;
        startOver();
    }
    else if (remainingGuesses === 1) {
        guessRemainingSpan.innerText = `${remainingGuesses} guess`
    }
    else {
        guessRemainingSpan.innerText = `${remainingGuesses} guesses`
    }
}

const winCheck = function() {
    if (word.toUpperCase() === progressWord.innerText) {
       message.classList.add("win");
       message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`;
       startOver();
    }
};

const startOver = function() {
    guessButton.classList.add("hide");
    guessRemaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
}

playAgain.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    guessRemainingSpan.innerText = `${remainingGuesses} guesses`;
    getWord();

    guessButton.classList.remove("hide");
    guessRemaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgain.classList.add("hide");
});