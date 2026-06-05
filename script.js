let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let scoreNumber = document.querySelector(".score-number");
let startBtn = document.querySelector(".start-btn");
let restartBtn = document.querySelector(".restart-btn");

let gameOverScreen = document.getElementById("gameOver");
let finalScore = document.getElementById("finalScore");
let playAgainBtn = document.getElementById("playAgainBtn");

let boxSize = 20;
let snake;
let direction;
let score;
let food;
let gameLoop;
let gameRunning = false;

document.addEventListener("keydown", changeDirection);

resetGame();

startBtn.onclick = function () {
    if (gameRunning) return;

    gameRunning = true;

    gameLoop = setInterval(drawGame, 120);
};

restartBtn.onclick = function () {
    clearInterval(gameLoop);
    resetGame();
    gameOverScreen.style.display = "none";
};

playAgainBtn.onclick = function () {
    gameOverScreen.style.display = "none";
    resetGame();
};

function resetGame() {

    snake = [{ x: 8, y: 8 }];
    direction = "RIGHT";
    score = 0;
    gameRunning = false;

    scoreNumber.innerText = score;

    food = {
        x: randomFoodPosition(),
        y: randomFoodPosition()
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "28px Arial";
    ctx.fillText("Press Start", 95, 180);
}

function drawGame() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(
            snake[i].x * boxSize,
            snake[i].y * boxSize,
            boxSize,
            boxSize
        );
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(
        food.x * boxSize,
        food.y * boxSize,
        boxSize,
        boxSize
    );
}

function moveSnake() {

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "RIGHT") headX++;
    else if (direction === "LEFT") headX--;
    else if (direction === "UP") headY--;
    else if (direction === "DOWN") headY++;

    let newHead = { x: headX, y: headY };
    snake.unshift(newHead);

    if (headX === food.x && headY === food.y) {
        score++;
        scoreNumber.innerText = score;

        food = {
            x: randomFoodPosition(),
            y: randomFoodPosition()
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {

    let head = snake[0];

    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= 18 ||
        head.y >= 18
    ) {
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {

    gameRunning = false;
    clearInterval(gameLoop);

    finalScore.innerText = score;
    gameOverScreen.style.display = "flex";
}

function randomFoodPosition() {
    return Math.floor(Math.random() * 18);
}

function changeDirection(event) {

    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }
    else if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }
    else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}
