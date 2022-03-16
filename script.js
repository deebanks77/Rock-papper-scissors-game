// Addind event listners to the rock, paper and scissors
document.querySelector("#rock").addEventListener("click", rpsGame);
document.querySelector("#paper").addEventListener("click", rpsGame);
document.querySelector("#scissors").addEventListener("click", rpsGame);
document.querySelector(".help").addEventListener("click", displayHelp);
document.querySelector(".spanBtn").addEventListener("click", removeHelp);
document.querySelector(".newGame").addEventListener("click", playNewGame);

function displayHelp() {
  document.querySelector(".rules").style.display = "block";
}

function removeHelp() {
  document.querySelector(".rules").style.display = "none";
}

const rpsData = {
  rock: { scissors: 1, rock: 0.5, paper: 0 },
  paper: { rock: 1, paper: 0.5, scissors: 0 },
  scissors: { paper: 1, scissors: 0.5, rock: 0 },
  wins: 0,
  losses: 0,
  draws: 0,
};

// rpsGame function
function rpsGame(event) {
  console.log(event.target.id);
  //   get your choice and computer choice
  const you = event.target.id;
  const computer = botChoice();
  //   determin winner
  const result = rpsData[you][computer];
  let message = determinWinner(result);
  //   display winner on browser
  displayWinner(you, computer, message);
  //   display score
  displayScore(result);
}

function botChoice() {
  let random = Math.floor(Math.random() * 3);
  let rps = ["rock", "paper", "scissors"][random];
  return rps;
}

// determin winner on database
function determinWinner(result) {
  let message, color;
  if (result === 1) {
    message = "You won!";
    color = "green";
    rpsData["wins"]++;
  } else if (result === 0.5) {
    message = "You tied!";
    color = "yellow";
    rpsData["draws"]++;
  } else {
    message = "You lost!";
    color = "red";
    rpsData["losses"]++;
  }

  return { msg: message, clr: color };
}

// display result on user interface
function displayWinner(yourChoice, botChoice, message) {
  document.querySelector("#rock").style.display = "none";
  document.querySelector("#paper").style.display = "none";
  document.querySelector("#scissors").style.display = "none";

  let yourDiv, botDiv, messageDiv;
  yourDiv = document.createElement("div");
  messageDiv = document.createElement("div");
  botDiv = document.createElement("div");

  yourDiv.setAttribute("class", "divImage");
  botDiv.setAttribute("class", "divImage");
  messageDiv.setAttribute("class", "divImage");

  yourDiv.innerHTML = `<img src='images/${yourChoice}.jpg'/>`;
  botDiv.innerHTML = `<img src='images/${botChoice}.jpg'/>`;

  messageDiv.innerHTML = `<h1 style="color:${message["clr"]}; font-size: 60px; padding: 30px;">${message["msg"]}</h1>`;

  document.querySelector(".rps-image-container").appendChild(yourDiv);
  document.querySelector(".rps-image-container").appendChild(messageDiv);
  document.querySelector(".rps-image-container").appendChild(botDiv);
}

function displayScore(result) {
  if (result === 1) {
    // do something here
    document.querySelector("#wins").textContent = rpsData["wins"];
  } else if (result === 0.5) {
    // do something here
    document.querySelector("#draws").textContent = rpsData["draws"];
  } else {
    // do something here
    document.querySelector("#losses").textContent = rpsData["losses"];
  }
}

function playNewGame() {
  let divImage = document.querySelectorAll(".divImage");
  divImage.forEach((cur) => {
    cur.remove();
  });

  document.querySelector("#rock").style.display = "block";
  document.querySelector("#paper").style.display = "block";
  document.querySelector("#scissors").style.display = "block";
}
/* 
Two players You and Computer
rock win scissors 
scissors wins paper
paper wins rock
*/
