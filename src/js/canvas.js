
import { ROWS, COLS, CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE} from './constants'

export function renderScene(ctx, scene) {
  //Background
  ctx.fillStyle = '#94C100';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //Score
  const textX = CANVAS_WIDTH / 2;
  const textY = CANVAS_HEIGHT / 2;
  paintText(ctx, scene.score.toString(), textX, textY, 'rgba(0, 0, 0, 0.1)', 140);

  //Apples
  paintCell(ctx, scene.apples[0], 'red');

  //Snake
  scene.snake.forEach((segment, index) => paintCell(ctx, zeroWalls(segment), 'black'));
}

export function renderGameOver(ctx) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const textX = CANVAS_WIDTH / 2;
  const textY = CANVAS_HEIGHT / 2;

  paintText(ctx, 'GAME OVER!', textX, textY, 'black', 25);
}


export function getRandomPosition(snake = []) {
  const position = {
    x: getRandomNumber(0, COLS - 1),
    y: getRandomNumber(0, ROWS - 1)
  };

  if (isEmptyCell(position, snake)) {
    return position;
  }

  return getRandomPosition(snake);
}

export function checkCollision(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isEmptyCell(position, snake) {
  return !snake.some(segment => checkCollision(segment, position));
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function paintText(ctx, text, x, y, fillStyle, fontSize = 16) {
  ctx.fillStyle = fillStyle;
  ctx.font = `bold ${fontSize}px sans-serif`;

  const textX = x;
  const textY = y;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(text, textX, textY);
}

function zeroWalls(point) {
  if ( point.x > COLS - 1) {
    point.x = 0;
  } else if( point.x < 0) {
    point.x = COLS - 1;
  } 
  if ( point.y > ROWS - 1) {
    point.y = 0;
  } else if( point.y < 0) {
    point.y = ROWS - 1;
  }
  return point;
}

function paintCell(ctx, point, color) {
  let x = point.x * CELL_SIZE + (point.x);
  let y = point.y * CELL_SIZE + (point.y);
  // Checks in case the screen goes out
  if ( x > CANVAS_WIDTH - CELL_SIZE ) x = CANVAS_WIDTH - CELL_SIZE;
  if ( y > CANVAS_HEIGHT - CELL_SIZE ) y = CANVAS_HEIGHT - CELL_SIZE;   
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}