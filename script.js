function initiateGame() {
    const actionsList = ["rock", "scissor", "paper"];
    const winCombinations = ["rockscissor", "scissorpaper", "paperrock"];
    let userSelection = "";
    let computerSelection = "";
    let playerScore = 0;
    let computerScore = 0;
    
    const headerSection = document.querySelector(".header-section");
    const selectionSection = document.querySelector(".main-section");
    const resultSection = document.querySelector(".last-area");
    const footerSection = document.querySelector(".footer-section");
    const userChoiceDisplay = document.querySelector(".user-pick");
    const computerChoiceDisplay = document.querySelector(".pc-pick");
    const resultDisplay = document.querySelector(".resultContainer");
    const resultTitle = resultDisplay.querySelector(".title");
    const againstComputerText = resultDisplay.querySelector(".against-pc");
    const playAgainButton = document.querySelector(".play-again");
    const nextButton = document.querySelector(".footer-section .next");
    const rulesContainer = document.querySelector(".rules-Container");
    const closeRulesButton = rulesContainer.querySelector(".close-btn");
    const openRulesButton = document.querySelector(".rules-btn");
    const victorySection = document.querySelector(".victorysection");
    const playerScoreDisplay = document.querySelector('.userScore h1');
    const computerScoreDisplay = document.querySelector('.computerScore h1');
  
    window.addEventListener("load", () => {
  
      loadComputerScoreFromStorage();
      loadPlayerScoreFromStorage();
  
      const gameChoices = document.querySelectorAll(".main-section .game-card");
      gameChoices.forEach((choice) => {
        choice.addEventListener("click", (event) => {
          userSelection = getPlayerSelection(event.target); 
          computerSelection = getComputerSelection();
          startRound();
        });
      });
  
      playAgainButton.addEventListener("click", restartGame);
      closeRulesButton.addEventListener("click", closeRules);
      openRulesButton.addEventListener("click", openRules);
      nextButton.addEventListener("click", showVictoryMessage);
      victorySection.querySelector("button").addEventListener("click", restartGame);
    });
  
    function startRound() {
      determineWinner(userSelection, computerSelection);
      selectionSection.classList.add("hidden");
      resultSection.classList.remove("hidden");
      resetBeforeDisplay();
      createChoiceElement(true, userSelection);
      createChoiceElement(false, computerSelection);
    }
  
    function getPlayerSelection(target) {
      if (target.nodeName === "IMG") {
        return target.parentElement.classList[1];
      }
      return target.classList[1];
    }

    function getComputerSelection() {
      return actionsList[Math.floor(Math.random() * 3)];
    }
  
    function determineWinner(player, opponent) {
      if (player === opponent) {
        resultTitle.innerText = "TIE UP!";
        againstComputerText.classList.add("hidden");
      } else if (isPlayerWinner(player + opponent)) {
        resultTitle.innerText = "YOU WIN";
        againstComputerText.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        userChoiceDisplay.classList.add('.highlightChoice');
        updatePlayerScore(playerScore + 1);
      } else {
        resultTitle.innerText = "YOU LOSE";
        againstComputerText.classList.remove("hidden");
        updateComputerScore(computerScore + 1);
      }
    }
  
    function isPlayerWinner(result) {
      return winCombinations.includes(result);
    }
  
    function createChoiceElement(isUser, choice) {
      const choiceElement = document.createElement("div");
      choiceElement.classList = [`game-card ${choice}`];
      choiceElement.innerHTML = `<img src="./images/${choice}.png" alt="${choice}"/>`;
      if (isUser) {
        userChoiceDisplay.append(choiceElement);
      } else {
        computerChoiceDisplay.append(choiceElement);
      }
    }
  
    function loadComputerScoreFromStorage() {
      let score = +window.localStorage.getItem('computerScore') || 0;
      computerScore = score;
      updateComputerScore(computerScore);
    }
  
    function loadPlayerScoreFromStorage() {
      let score = +window.localStorage.getItem('playerScore') || 0;
      playerScore = score;
      updatePlayerScore(playerScore);
    }
  
    function updatePlayerScore(score) {
      playerScore = score;
      playerScoreDisplay.innerHTML = playerScore;
      window.localStorage.setItem('playerScore', playerScore);
    }
  
    function updateComputerScore(score) {
      computerScore = score;
      computerScoreDisplay.innerHTML = computerScore;
      window.localStorage.setItem('computerScore', computerScore);
    }
  
    function restartGame() {
      selectionSection.classList.remove("hidden");
      resultSection.classList.add("hidden");
      nextButton.classList.add("hidden");
      victorySection.classList.add("hidden");
      headerSection.classList.remove("hidden");
      footerSection.classList.remove("hidden");
    }
  
    function resetBeforeDisplay() {
      userChoiceDisplay.innerHTML = "";
      computerChoiceDisplay.innerHTML = "";
    }
  
    function closeRules() {
      rulesContainer.classList.add("hidden");
    }
  
    function openRules() {
      rulesContainer.classList.remove("hidden");
    }
  
    function showVictoryMessage() {
      victorySection.classList.remove("hidden");
      headerSection.classList.add("hidden");
      selectionSection.classList.add("hidden");
      resultSection.classList.add("hidden");
      footerSection.classList.add("hidden");
    }
  }
  
  initiateGame();
