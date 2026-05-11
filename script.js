let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let scoreNumber = document.querySelector(".score-number");
let startBtn = document.querySelector(".start-btn");
let restartBtn = document.querySelector(".restart-btn");

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
    if (gameRunning === true) {
        return;
    }

    gameRunning = true;
    gameLoop = setInterval(drawGame, 120);
};

restartBtn.onclick = function () {
    clearInterval(gameLoop);
    resetGame();
};

function resetGame() {
    snake = [
        { x: 8, y: 8 }
    ];

    direction = "RIGHT";
    score = 0;
    gameRunning = false;

    scoreNumber.innerText = score;

    food = {
        x: randomFoodPosition(),
        y: randomFoodPosition()
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.fillText("Press Start", 95, 180);
}

function drawGame() {
    if (gameRunning === false) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#22d3ee";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#22d3ee";

        ctx.fillRect(
            snake[i].x * boxSize,
            snake[i].y * boxSize,
            boxSize,
            boxSize
        );
    }

    ctx.shadowBlur = 0;
}

function drawFood() {
    ctx.fillStyle = "#fb7185";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#fb7185";

    ctx.fillRect(
        food.x * boxSize,
        food.y * boxSize,
        boxSize,
        boxSize
    );

    ctx.shadowBlur = 0;
}

function moveSnake() {
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    if (direction === "RIGHT") {
        snakeHeadX++;
    } else if (direction === "LEFT") {
        snakeHeadX--;
    } else if (direction === "UP") {
        snakeHeadY--;
    } else if (direction === "DOWN") {
        snakeHeadY++;
    }

    let newHead = {
        x: snakeHeadX,
        y: snakeHeadY
    };

    snake.unshift(newHead);

    if (snakeHeadX === food.x && snakeHeadY === food.y) {
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
    let snakeHead = snake[0];

    if (
        snakeHead.x < 0 ||
        snakeHead.y < 0 ||
        snakeHead.x >= 18 ||
        snakeHead.y >= 18
    ) {
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (
            snakeHead.x === snake[i].x &&
            snakeHead.y === snake[i].y
        ) {
            endGame();
        }
    }
}

function endGame() {
    gameRunning = false;
    clearInterval(gameLoop);

    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText("Game Over", 90, 180);
}

function randomFoodPosition() {
    return Math.floor(Math.random() * 18);
}

function changeDirection(event) {
    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}