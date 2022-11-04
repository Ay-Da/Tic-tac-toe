const BOARD = document.getElementById("board");
const SQUARES = Array.from(document.querySelectorAll(".square"));
const RESULT_MESSAGE = document.getElementById("result-message");
const RESTART_BUTTON = document.getElementById("restart-button");
const PLAYER_Aymen = "Aymen";
const PLAYER_Mariam = "Mariam";
const WINNER_SOUND = new Audio("win.wav");
let winnerCombo;
let result;

let currentPlayer = PLAYER_Mariam;
BOARD.classList.add(currentPlayer);

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// This lets the sound effect overlap
function playFillSound() {
  const SOUND = document.getElementById("pop-sound");
  SOUND.load();
  SOUND.play();
}

function newGame() {
  RESULT_MESSAGE.innerText = "";
  RESTART_BUTTON.classList.add("hidden");
  SQUARES.forEach((square) => {
    square.classList.remove(
      "Mariam",
      "Aymen",
      "winner-squares",
      "end-game",
      "filled"
    );
    square.addEventListener("click", fillSquare);
  });
}

newGame();

// Adds player classes to clicked game squares
function fillSquare(e) {
  let square = e.target;
  // Checks whether clicked square already has a player class
  if (!square.classList.contains("filled")) {
    square.classList.add(currentPlayer, "filled");
    playFillSound();
    // Swaps currentPlayer class of BOARD (used for hover preview effect)
    BOARD.classList.toggle("Mariam");
    BOARD.classList.toggle("Aymen");
    checkWinner();
    if (result != currentPlayer) {
      checkTiedResult();
    }
    switchPlayer();
  }
}

function checkWinner() {
  WINNING_COMBOS.forEach((combo) => {
    if (
      SQUARES[combo[0]].classList.contains(currentPlayer) &&
      SQUARES[combo[1]].classList.contains(currentPlayer) &&
      SQUARES[combo[2]].classList.contains(currentPlayer)
    ) {
      result = currentPlayer;
      WINNER_SOUND.play();
      // Adds background colour to winner squares
      winnerCombo = combo;
      winnerCombo.forEach((number) => {
        SQUARES[number].classList.add("winner-squares");
      });
      displayResult(result);
    }
  });
}

function checkTiedResult() {
  const isFilled = (square) => square.classList.contains("filled");
  if (SQUARES.every(isFilled)) {
    displayResult();
  }
}

function switchPlayer() {
  currentPlayer == PLAYER_Mariam
    ? (currentPlayer = PLAYER_Aymen)
    : (currentPlayer = PLAYER_Mariam);
}

function displayResult(result) {
  result == currentPlayer
    ? (RESULT_MESSAGE.innerText = `THE WINNER IS ${result.toUpperCase()}!`)
    : (RESULT_MESSAGE.innerText = `IT'S A TIE!`);
  // Removes event listeners for all squares so no empties can be filled
  // Adds endGame class to prevent next-move hover effect after win/tie
  SQUARES.forEach((square) => {
    square.removeEventListener("click", fillSquare);
    square.classList.add("end-game");
  });
  RESTART_BUTTON.addEventListener("click", newGame);
  RESTART_BUTTON.classList.remove("hidden");
}
