function getRandomArbitrary(max) {
    return Math.random() * max;
}

export function getRandomPosition(boardWidth, SPACE) {
    const position = Math.floor(getRandomArbitrary(boardWidth) / SPACE)
    return position * SPACE;
}

export function generateTarget(target, board) {
    const span = document.createElement("span");
    span.classList.add("target");
    span.style.top = target.y + "px";
    span.style.left = target.x + "px";
    board.append(span);
}
