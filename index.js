import {
    generateBody,
    moveDirection,
    moveing,
    wallDetection,
    bodyDetection,
    eatTarget,
} from "./snake.js";

import { getRandomPosition, generateTarget } from "./target.js";

const board = document.querySelector("#board");
const boardRect = board.getBoundingClientRect();
const { width: boardWidth } = boardRect;

const SPACE = boardWidth / 20;

let currentDirection = "";
let keyDirection = "";
let refreshSpeed = 300;
let point = 0;
let game;

let snakeBody = [
    { x: SPACE, y: SPACE * 3 },
    { x: SPACE, y: SPACE * 2 },
    { x: SPACE, y: SPACE },
];

let target = {
    x: getRandomPosition(boardWidth, SPACE),
    y: getRandomPosition(boardWidth, SPACE),
};

document.addEventListener("keyup", function (e) {
    const { key } = e;
    if (key === currentDirection) return;
    if (currentDirection === "" && key === "ArrowUp") return;
    if (currentDirection === "ArrowUp" && key === "ArrowDown") return;
    if (currentDirection === "ArrowDown" && key === "ArrowUp") return;
    if (currentDirection === "ArrowLeft" && key === "ArrowRight") return;
    if (currentDirection === "ArrowRight" && key === "ArrowLeft") return;
    keyDirection = key;
});

function update() {
    // 變更方向 & 移動
    currentDirection = keyDirection;
    const direction = moveDirection(currentDirection, SPACE);
    moveing(snakeBody, direction);

    const isEat = eatTarget(snakeBody, target);
    if (isEat) {
        point++;
        snakeBody = [...snakeBody, snakeBody[snakeBody.length - 1]];
        target = {
            x: getRandomPosition(boardWidth, SPACE),
            y: getRandomPosition(boardWidth, SPACE),
        };
        if (refreshSpeed > 50) refreshSpeed -= 10;
        clearInterval(game);
        game = setInterval(() => {
            board.innerHTML = "";
            update();
            draw();
        }, refreshSpeed);
    }
    // 碰撞偵測
    const hitWall = wallDetection(snakeBody, boardRect, SPACE);
    const hitBody = bodyDetection(snakeBody);
    if (hitWall || hitBody) {
        clearInterval(game);
        alert(`You get ${point} ${point > 1 ? "points" : "point"}`);
        location.reload();
    }
}

function draw() {
    generateBody(snakeBody, board);
    generateTarget(target, board);
}

game = setInterval(() => {
    board.innerHTML = "";
    update();
    draw();
}, refreshSpeed);
