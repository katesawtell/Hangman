let astronomyWords = ["constellation", "celestial", "equinox", "interstellar", "radiation"];
let foodWords = ["partfait", "zucchini", "macaroni", "barbecue", "edamame"];
let animalWords = ["axolotl", "hyena", "koala", "rhinoceros", "hippopotamus"];
const imagesArray = ['img/main.png', 'img/man1.png', 'img/man2.png', 'img/man3.png', 'img/man4.png', 'img/man5.png', 'img/man6.png', 'img/man7.png'];

let categories = document.querySelector("#categories");
let wordDisplay = document.getElementById("word");
let letterLines = document.getElementById("letterLines");
let correctLetters = [];
let incorrectLetters = [];
let numWrong = 0;
let keyboard = document.getElementById("keyboard");
let resetBtn = document.getElementById("reset");
let wrongLetters = document.getElementById("wrongLetters");
let image = document.getElementById("image");

astronomy.addEventListener("click", function() {
  chooseRandomWord("Astronomy");
});
food.addEventListener("click", function() {
  chooseRandomWord("Food");
});
animals.addEventListener("click", function() {
  chooseRandomWord("Animals");
});
reset.addEventListener("click", function() {
  location.reload();
});

function chooseRandomWord(category) {
  document.getElementById("begin").innerHTML = "";
  document.getElementById("chosenCategory").innerHTML = `You Chose the Category <strong>${category}</strong>`;
  categories.style.display = "none";
  image.style.display = "block";
  wrongLetters.style.display = "block";
  let randomWord;
  switch (category) {
    case "Astronomy":
      randomWord = astronomyWords[Math.floor(Math.random() * 5)];
      break;
    case "Food":
      randomWord = foodWords[Math.floor(Math.random() * 5)];
      break;
    case "Animals":
      randomWord = animalWords[Math.floor(Math.random() * 5)];
      break;
    default:
      alert("Invalid category");
  }
  displayLetterLine(randomWord);
  letKeyboardWork(randomWord);
  updateMan(numWrong, randomWord);
}


function displayLetterLine(randomWord) {
  wordLength = randomWord.length;
  for (let i = 0; i < wordLength; i++) {
    letterLines.innerHTML += "_ ";
  }
}

function letKeyboardWork(randomWord) {
  keyboard.style.display = "block";

  // Handle virtual keyboard click
  keyboard.addEventListener("click", function(event) {
    if (event.target.classList.contains("key") && !event.target.disabled) {
      let letter = event.target.getAttribute("pressed").toLowerCase(); // Assuming 'pressed' attribute is stored as uppercase
      event.target.disabled = true;
      addUsedLetter(letter, randomWord);
    }
  });

  // Handle physical keyboard press
  document.addEventListener('keypress', function(event) {
    const letter = event.key.toLowerCase();
    if (letter.match(/[a-z]/) && letter.length === 1) { // Ensure only single lowercase alphabetic characters are processed
      const button = document.querySelector(`button[pressed="${letter.toLowerCase()}"]`); // Find the corresponding button
      if (button && !button.disabled) {
        button.disabled = true;
        addUsedLetter(letter, randomWord);
      }
    }
  });
}

function addUsedLetter(letter, randomWord) {
  if (randomWord.includes(letter)) {
    correctLetters.push(letter);
    console.log("line82, pushing into correct " + letter)
    letterLines.innerHTML = "";
    let letterCheck = 0;
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] == letter || correctLetters.includes(randomWord[i])) {
        letterCheck++;
        letterLines.innerHTML += randomWord[i] + " ";
      } else {
        letterLines.innerHTML += "_ ";
      }
    }
    if (letterCheck == randomWord.length) {
      wonGame();
    }
  } else {
    incorrectLetters.push(letter);
    numWrong++;
    updateMan(numWrong, randomWord);
    displayWrongLetters(letter);
  }
}

function displayWrongLetters(letter) {
  wrongLetters.innerHTML += letter + " ";
}

function updateMan(numWrong, randomWord) {
  image.src = imagesArray[numWrong];
  if (numWrong >= 7) {
    lostGame(randomWord);
  }
}

function lostGame(randomWord) {
  document.getElementById("begin").textContent = "AHH too bad the word was: " + randomWord;
  document.getElementById("chosenCategory").innerHTML = "";
  document.getElementById("reset").style.display = "block";
  keyboard.style.display = "none";
}

function wonGame() {
  document.getElementById("begin").textContent = "Yay you won! ";
  document.getElementById("chosenCategory").innerHTML = "";
  document.getElementById("reset").style.display = "block";
  image.src = 'img/winner.png';
  keyboard.style.display = "none";
}



