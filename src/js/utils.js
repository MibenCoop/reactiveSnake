import { checkCollision, getRandomPosition } from './canvas';
import { SNAKE_LENGTH, APPLE_COUNT } from './constants';

export function isGameOver(scene) {
  let snake = scene.snake;
  let head = snake[0];
  let body = snake.slice(1, snake.length);
  return body.some(segment => checkCollision(segment, head));
}

export function nextDirection(prev, next) {
  //Если ось x и y противоположна, то двигаемся в том же направлении, что и до этого
  if ((next.x === prev.x * -1) || (next.y === prev.y * -1)) {
    return prev;
  }

  return next;
}

export function move(snake, [direction, snakeLength]) {
  let nx = snake[0].x;
  let ny = snake[0].y;
  
  nx += 1 * direction.x;
  ny += 1 * direction.y;

  let tail;
  if (snakeLength > snake.length) {
    tail = { x: nx, y: ny };
  } else {
    tail = snake.pop();
    tail.x = nx;
    tail.y = ny;
  }

  snake.unshift(tail);

  return snake;
}

export function eat(apples, snake) {
  let head = snake[0];
//   console.log('eat', apples, snake);
  // debugger;
  if (checkCollision(apples[0], head)) {
    apples.pop(0);
    return generateApples();
  }

  return apples;
}

export function generateSnake() {
  let snake = [];

  for (let i = SNAKE_LENGTH - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  return snake;
}

export function generateApples() {
  let apples = [];

  for (let i = 0; i < APPLE_COUNT; i++) {
    apples.push(getRandomPosition());
  }

  return apples;
}