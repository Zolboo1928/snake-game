let randomFruitX = Math.random(Math.floor() * 30 + 1);
let gameAction = document.querySelector(".gameAction");
let scoreNum = document.getElementById("score-counter-num");
const up = document.querySelector(".up");
const right = document.querySelector(".right");
const down = document.querySelector(".down");
const left = document.querySelector(".left");
let snakeX,snakeY
let scoreEl;
let foodY;
let foodX;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let gameOver = false;
let highScore = document.querySelector("#highScore")
let highScoreNum = Number(highScore.innerHTML);
const body = document.querySelector("body")
let setSpeed = document.querySelector("#setSpeed");
let currentSpeed = setSpeed.value; 
let interval;
let grid = document.querySelector(".gameAction");


setSpeed.addEventListener("change",()=>{
  currentSpeed = setSpeed.value
  clearInterval(interval)
  interval = setInterval(initgame,currentSpeed)
})



snakeX = Math.floor(Math.random() * 30) + 1,
snakeY = Math.floor(Math.random() * 30) + 1;

const backGroundColorChanging = ()=>{
   const red = Math.floor(Math.random() * 256);
   const blue = Math.floor(Math.random() * 256);
   const green = Math.floor(Math.random() * 256);
   body.style.backgroundColor=`rgb(${red},${blue},${green})`
}

const changeDirection = (e) => {
  if (e.key === "ArrowDown" && velocityY != -1 && velocityY !== 1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowUp" && velocityY != 1 && velocityY !== -1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowRight" && velocityX != -1 && velocityX !== 1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX != 1 && velocityX !== -1) {
    velocityX = -1;
    velocityY = 0;
  }
  initgame();
};

const changeDirectionButton = () => {
  up.addEventListener("click", () => {
    if (velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    }
  });
  right.addEventListener("click", () => {
    if (velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
  });
  down.addEventListener("click", () => {
    if (velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    }
  });
  left.addEventListener("click", () => {
    if (velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    }
  });
  initgame();
};

const handleGameOver = () => {
  clearInterval(interval);
  alert("Game over! Press OK to play again.");
  location.reload();
};

const initgame = () => {

    if (snakeX > 30 || snakeX <= 0 || snakeY <= 0 || snakeY > 30) {
      gameOver = true;
    }

  if (gameOver) return handleGameOver();
  let htmlmarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

  if (snakeX == foodX && snakeY == foodY) {
    foodchange();
    snakeBody.push([foodX, foodY]);
    scoreEl = Number(scoreNum.textContent) + 1;
    scoreNum.textContent = scoreEl;
    currentSpeed = currentSpeed - 2;
    setSpeed.value=currentSpeed
    clearInterval(interval);
    interval = setInterval(initgame, currentSpeed);
    console.log(currentSpeed);
    if (scoreEl > localStorage.getItem("current")) {
      localStorage.setItem("current", scoreEl);
    }
    highScore.innerHTML = localStorage.getItem("current");
  }

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  
  for (let i = 0; i < snakeBody.length; i++) {
    htmlmarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }


  // let noWall = document.querySelector("#checkbox").checked;
  // let snakeYChecker;

  // for (const item of snakeBody[0]) {
  //   snakeYChecker = snakeY
  // }
  // if (noWall === true) {
  //   if (velocityY == -1 && snakeYChecker==0) {
  //     snakeBody[0] = [snakeX, snakeY + 30];
  //   }
  // } else if (noWall === false) {
  //   if (snakeX > 30 || snakeX <= 0 || snakeY <= 0 || snakeY > 30) {
  //     gameOver = true;
  //   }
  // }
  gameAction.innerHTML = htmlmarkup;
};

const foodchange = () => {
  foodY = Math.floor(Math.random() * 30) + 1;
  foodX = Math.floor(Math.random() * 30) + 1;
};


highScore.innerHTML = localStorage.getItem("current");
backGroundColorChanging()
setInterval(backGroundColorChanging,5000)
foodchange();
initgame();
interval = setInterval(initgame, currentSpeed);
document.addEventListener("click", changeDirectionButton);
document.addEventListener("keydown", changeDirection);