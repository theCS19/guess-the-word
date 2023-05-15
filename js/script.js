const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterBox = document.querySelector(".letter");
const progressWord = document.querySelector(".word-in-progress");
const guessRemaining = document.querySelector(".remaining");
const guessRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

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
    const guess = letterBox.value;
    console.log(guess);
    letterBox.value = ""
});