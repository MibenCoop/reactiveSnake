import Rx from 'rxjs';

import { DIRECTIONS, SPEED, SNAKE_LENGTH,APPLE_COUNT, POINTS_PER_APPLE, CANVAS_HEIGHT,CANVAS_WIDTH } from './constants';

import {
  renderScene,
  renderGameOver
} from './canvas';

import {
  isGameOver,
  nextDirection,
  move,
  eat,
  generateSnake,
  generateApples
} from './utils';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Create canvas element and append it to the page
 */
let canvas = document.createElement('canvas');
canvas.width =CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

/**
 * Starting values
 */
const INITIAL_DIRECTION = DIRECTIONS[39];

let ticks$ = Rx.Observable.interval(SPEED);
let click$ = Rx.Observable.fromEvent(document, 'click');
let keydown$ = Rx.Observable.fromEvent(document, 'keydown');
let keyup$ = Rx.Observable.fromEvent(document, 'keyup');


// .filter((event) => {
//   if ((event.keyCode == 37) || (event.keyCode == 38) || (event.keyCode == 39) || (event.keyCode == 40)) {
//     return event.keyCode;
//   }
//  })
let direction$ = keydown$
.map((event) => DIRECTIONS[event.keyCode])
.filter(direction => !!direction)
.startWith(INITIAL_DIRECTION)
.scan(nextDirection)
.distinctUntilChanged();

let length$ = new Rx.BehaviorSubject(SNAKE_LENGTH);

let snakeLength$ = length$
.scan((step, snakeLength) => snakeLength + step)
.share();

let score$ = snakeLength$
.startWith(0)
.scan((score, _) => score + POINTS_PER_APPLE);

let snake$ = ticks$
.withLatestFrom(direction$, snakeLength$, (_, direction, snakeLength) => [direction, snakeLength])
.scan(move, generateSnake())
.share();

let apples$ = snake$
.scan(eat, generateApples())
.distinctUntilChanged()
.share();

let appleEaten$ = apples$
.skip(1)
.do(() => length$.next(POINTS_PER_APPLE))
.subscribe();

let scene$ = Rx.Observable.combineLatest(snake$, apples$, score$, (snake, apples, score) => ({ snake, apples, score }));
let game$ = ticks$
    .withLatestFrom(scene$, (_, scene) => scene)
    .takeWhile(scene => {
      // console.log('takeWhile');
      return !isGameOver(scene);
     })
    .subscribe({
        next: (scene) => renderScene(ctx, scene),
        complete: () => {
          console.log('complete game');
          renderGameOver(ctx);
        }
    }); 

  const pauser = new Subject();

  // let pausable = pauser
                      // .switchMap(paused => paused ? Observable.never : game$);
  // pausable.subscribe(x => console.log(x));
  // pauser.next(true);

  // let pause$ = keydown$
  //   .filter((event) => {
  //     if ( event.keyCode == 27 ) {
  //       return event.keyCode;
  //     }
  //   })
  //   .scan((acc) => {
  //     console.log('acc', acc);
  //     if (acc ) {
        
  //       ticks$ = Rx.Observable.interval(0);
  //     } else {
  //       ticks$ = Rx.Observable.interval(SPEED);
  //     }
  //     return !acc;
  //   }, true)
  //   .subscribe();
    