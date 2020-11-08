window.onload = fadeIn();
let computerSelection;
let playerSelection;
let computerScore = 0;
let playerScore = 0;

let buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
const main = document.querySelector("main");
const endAlrt = document.querySelector("#end-alert");
const endDesc = document.querySelector("#end-desc");
const returnMainBtn = document.querySelector("#retry-btn");
const desc = document.querySelector("#desc1");
const container = document.querySelector("#results-container");

function fadeIn() {
  let text = document.querySelector(".animate");

  let strText = text.textContent;
  let splitText = strText.split("");
  text.textContent = "";
  for (i = 0; i < splitText.length; i++) {
    text.innerHTML += `<span>${splitText[i]}</span>`;
  }

  let char = 0;
  let timer = setInterval(onTick, 50);

  function onTick() {
    const span = text.querySelectorAll("span")[char];
    span.classList.add("fade");
    char++;
    if (char === splitText.length) {
      complete();
      return;
    }
  }
  function complete() {
    clearInterval(timer);
    timer = null;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    playerSelection = img.alt.toLowerCase();
    container.style.opacity = 0;
    console.log(container.style.opacity);
    playRound(playerSelection, computerSelection);

    if (playerScore === 5 || computerScore === 5) {
      declareWinner();
    }
  });
});

const myArray = ["Rock", "Paper", "Scissors"];

function computerPlay() {
  return myArray[~~(Math.random() * myArray.length)];
}

function playRound(playerSelection, computerSelection) {
  computerSelection = computerPlay().toLowerCase();
  playerSelection = playerSelection.toLowerCase();
  if (computerSelection == playerSelection) {
    displayResults("Tie game!");
  } else if (
    (computerSelection == "rock" && playerSelection == "scissors") ||
    (computerSelection == "scissors" && playerSelection == "paper") ||
    (computerSelection == "paper" && playerSelection == "rock")
  ) {
    computerScore = ++computerScore;
    keepCpuScore();
    if (computerScore === 1) {
      displayResults(
        `Oh no! You lost.
        ${capitalize(computerSelection)} beats ${playerSelection}.`
      );
    } else if (computerScore === 2) {
      displayResults(
        `Arghh. ${capitalize(
          computerSelection
        )} beats ${playerSelection}. Give it another shot!`
      );
    } else if (computerScore === 3) {
      displayResults(
        `${capitalize(
          computerSelection
        )} beats ${playerSelection}. It's ok. You got this!!`
      );
    } else if (computerScore === 4) {
      displayResults(
        `Oh no, it's match point!! ${capitalize(
          computerSelection
        )} beats ${playerSelection}. Don't let us down!`
      );
    } else {
      displayResults(`${computerSelection} beats ${playerSelection}`);
    }
  } else {
    playerScore = ++playerScore;
    keepPlayerScore();
    if (playerScore === 1) {
      displayResults(
        `Lets go!!! You won.
        ${capitalize(playerSelection)} beats ${computerSelection}.`
      );
    } else if (playerScore === 2) {
      displayResults(
        `You're pretty good at this. ${capitalize(
          playerSelection
        )} beats ${computerSelection}.`
      );
    } else if (playerScore === 3) {
      displayResults(
        `Mankind has a chance! ${capitalize(
          playerSelection
        )} beats ${computerSelection}.`
      );
    } else if (playerScore === 4) {
      displayResults(
        `${capitalize(
          playerSelection
        )} beats ${computerSelection}. One more and you're a hero!`
      );
    } else {
      displayResults(`${playerSelection} beats ${computerSelection}`);
    }
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayResults(str) {
  container.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 800,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-in",
  });
  container.textContent = str;
}

function declareWinner() {
  rplContent();
  if (playerScore > computerScore) {
    endDesc.textContent = "You win! Mankind lives another day!!";
    returnMainBtn.innerText = "Play Again";
  } else {
    endDesc.textContent = "You lost...who will save mankind now?";
    returnMainBtn.innerText = "Try Again?";
  }
  fadeIn();
}

function rplContent() {
  main.classList.add("disappear");
  endAlrt.classList.remove("disappear");
  desc.classList.remove("animate");
  endDesc.classList.add("animate");

  returnMainBtn.addEventListener("click", () => {
    main.classList.remove("disappear");
    endAlrt.classList.add("disappear");
    desc.classList.add("animate");
    resetGame();
  });
}

function resetGame() {
  fadeIn();
  container.textContent = "";
  playerScore = 0;
  computerScore = 0;
  keepPlayerScore();
  keepCpuScore();
}

function keepPlayerScore() {
  let playerScoreBox = document.querySelector("#player-score");

  playerScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 800,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-in",
  });

  playerScoreBox.textContent = playerScore;
}
function keepCpuScore() {
  let computerScoreBox = document.querySelector("#computer-score");

  computerScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 800,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-in",
  });

  computerScoreBox.textContent = computerScore;
}
