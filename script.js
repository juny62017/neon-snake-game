let canvas = document.getElementById("gameCanvas");

let ctx = canvas.getContext("2d");

let boxSize = 20;

let snake = [
    { x: 8, y: 8 }
];

let direction = "RIGHT";

let gameLoop;

document.addEventListener("keydown", changeDirection);

startGame();

function startGame() {

    gameLoop = setInterval(function () {

        drawGame();

    }, 120);
}

function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();

    moveSnake();
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
}

function moveSnake() {

    let snakeHeadX = snake[0].x;

    let snakeHeadY = snake[0].y;

    if (direction === "RIGHT") {
        snakeHeadX++;
    }

    else if (direction === "LEFT") {
        snakeHeadX--;
    }

    else if (direction === "UP") {
        snakeHeadY--;
    }

    else if (direction === "DOWN") {
        snakeHeadY++;
    }

    let newHead = {
        x: snakeHeadX,
        y: snakeHeadY
    };

    snake.unshift(newHead);

    snake.pop();
}

function changeDirection(event) {

    if (event.key === "ArrowRight" &&
        direction !== "LEFT") {

        direction = "RIGHT";
    }

    else if (event.key === "ArrowLeft" &&
        direction !== "RIGHT") {

        direction = "LEFT";
    }

    else if (event.key === "ArrowUp" &&
        direction !== "DOWN") {

        direction = "UP";
    }

    else if (event.key === "ArrowDown" &&
        direction !== "UP") {

        direction = "DOWN";
    }
}