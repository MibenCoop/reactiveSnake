
import { ROWS, COLS, CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE} from './constants'

export function renderScene(ctx, scene) {
  //Render Background
  ctx.fillStyle = '#94C100';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(20, 40, CANVAS_WIDTH-40, CANVAS_HEIGHT-80);
  //Score
  // let textX = CANVAS_WIDTH / 2;
  // let textY = CANVAS_HEIGHT / 2;
  let text = "Score: " + scene.score.toString();
  paintText(ctx, text, 75, 25, 'rgba(0, 0, 0)');
  //Apples
  paintCell(ctx, scene.apples[0], 'black');
  
  //Snake
  scene.snake.forEach((segment, index) => paintCell(ctx, zeroWalls(segment), 'black'));
}

export function renderGameOver(ctx) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let textX = CANVAS_WIDTH / 2;
  let textY = CANVAS_HEIGHT / 2;

  paintText(ctx, 'GAME OVER!', textX, textY, 'black', 25);
}


export function getRandomPosition(snake = []) {
  let position = {
    x: getRandomNumber(4, COLS - 4),
    y: getRandomNumber(4, ROWS - 4)
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



function paintText(ctx, text, x, y, fillStyle, fontSize) {
  ctx.fillStyle = fillStyle;
  ctx.font = `bold 15px sans-serif`;

  let textX = x;
  let textY = y;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(text, textX, textY);
}

function zeroWalls(point) {
  // console.log(point);
  //Чтобы игрок проходил через стены
  //Костыль через подгон клеток
  if ( (point.x > COLS - 1)) {
    point.x = 1;
  } else if( point.x < 1) {
    point.x = COLS - 1;
  }
  if ( point.y > ROWS-4) {
    point.y = 2;
  } else if( point.y < 2) {
    point.y = ROWS - 4;
  }

  return point;
}

function paintCell(ctx, point, color) {
  const x = point.x * CELL_SIZE + (point.x);
  const y = point.y * CELL_SIZE + (point.y);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}