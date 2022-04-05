export function generateBody(snakeBody, board) {
    snakeBody.forEach((body, index) => {
        const span = document.createElement("span");
        span.classList.add("snake-body");
        span.style.top = body.y + "px";
        span.style.left = body.x + "px";
        if (index === 0) {
            span.style.backgroundColor = `hsl(200, 100%, 50%)`;
        }
        board.append(span);
    });
}

export function moveDirection(key, SPACE) {
    const direction = {
        ArrowDown: { x: 0, y: SPACE },
        ArrowUp: { x: 0, y: -SPACE },
        ArrowRight: { x: SPACE, y: 0 },
        ArrowLeft: { x: -SPACE, y: 0 },
    };
    return direction[key] || null;
}

export function moveing(snakeBody, direction) {
    if (direction === null) return;
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;
}

export function wallDetection(snakeBody, boardRect, SPACE) {
    const { width: boardWidth, height: boardHeight } = boardRect;
    const header = snakeBody[0];
    return (
        header.x < 0 ||
        header.x + SPACE > boardWidth ||
        header.y < 0 ||
        header.y > boardHeight
    );
}

export function bodyDetection(snakeBody) {
    const header = snakeBody[0];
    let hitBody = false;
    snakeBody.forEach((body, index) => {
        if (index === 0) return;
        if (body.x === header.x && body.y === header.y) {
            hitBody = true;
        }
    });
    return hitBody;
}

export function eatTarget(snakeBody, target) {
    const header = snakeBody[0];
    return header.x === target.x && header.y === target.y ? true : false;
}
