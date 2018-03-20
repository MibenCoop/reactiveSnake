
  //Main, util
export const SNAKE_LENGTH = 6;

export const APPLE_COUNT = 1;
export const POINTS_PER_APPLE = 1;

export const SPEED = 50;

export const DIRECTIONS = {
  37: { x: -1, y: 0 },
  39: { x: 1, y: 0 },
  38: { x: 0, y: -1 },
  40: { x: 0, y: 1 }
};


export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight; 
export const CELL_SIZE = 30;
export const COLS = Math.round(CANVAS_WIDTH / CELL_SIZE);
export const ROWS = Math.round(CANVAS_HEIGHT / CELL_SIZE);