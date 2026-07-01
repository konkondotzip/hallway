import { Level } from "../game-objects/level";

export const width: number = 700;
export const height: number = 700;

export const WAITING: string = "waiting";
export const PLAYING: string = "playing";
export const PAUSED: string = "paused";
export const GAME_OVER: string = "game over";

export const u: number = Math.min(width, height) / 100;

export class Coordinate2D {
  x: number; y: number;
  constructor(x: number, y: number) {
    this.x = x; this.y = y;
  }
};
const level1Pts: Coordinate2D[] = [
  { x: 10, y: 90 },
  { x: 90, y: 10 },
];
const level2Pts: Coordinate2D[] = [
  { x: 10, y: 90 },
  { x: 10, y: 10 },
  { x: 90, y: 90 },
  { x: 90, y: 10 },
];
const gameOverLevelPts: Coordinate2D[] = [
  { x: 50, y: 90 },
  { x: 50, y: 10 },
];
const level3Pts: Coordinate2D[] = [
  {x:10, y: 10},
  {x:10, y: 50},
  {x:50, y: 50},
  {x:50, y: 10},
  {x:90, y: 10},
  {x:90, y: 90},
  {x:10, y: 90}
];
const level4Pts: Coordinate2D[] = [
  {x:10, y:40},
  {x:30, y:10},
  {x:50, y:40},
  {x:70, y:10},
  {x:90, y:40},
  {x:50, y:90},
  {x:15, y:50}
];
const level5Pts: Coordinate2D[] = [
  {x:50, y:50},
  {x:50, y:30},
  {x:70, y:30},
  {x:70, y:70},
  {x:30, y:70},
  {x:30, y:10},
  {x:90, y:10},
  {x:90, y:90},
  {x:10, y:90},
  {x:10, y:10}
];
const level6Pts: Coordinate2D[] = [
  {x:10, y:30},
  {x:30, y:10},
  {x:10, y:80},
  {x:50, y:10},
  {x:30, y:90},
  {x:90, y:10},
  {x:90, y:30}
];
const level7Pts: Coordinate2D[] = [
  {x:50, y:90},
  {x:50, y:10},
  {x:10, y:50},
  {x:90, y:50},
  {x:60, y:10},
  {x:60, y:90},
  {x:90, y:60},
  {x:10, y:60}
];
const level8Pts: Coordinate2D[] = [
  {x:40, y:90},
  {x:30, y:90},
  {x:40, y:65},
  {x:30, y:70},
  {x:20, y:70},
  {x:10, y:60},
  {x:10, y:50},
  {x:20, y:40},
  {x:40, y:40},
  {x:35, y:30},
  {x:35, y:20},
  {x:45, y:10},
  {x:55, y:10},
  {x:65, y:20},
  {x:65, y:30},
  {x:60, y:40},
  {x:80, y:40},
  {x:90, y:50},
  {x:90, y:60},
  {x:80, y:70},
  {x:70, y:70},
  {x:60, y:65},
  {x:70, y:90},
  {x:60, y:90}
];
const level9Pts: Coordinate2D[] = [
  {x:50, y:10},
  {x:25, y:90},
  {x:90, y:40},
  {x:10, y:40},
  {x:75, y:90},
  {x:50, y:10}
];
const level10Pts: Coordinate2D[] = [
  {x:10, y:10},
  {x:30, y:20},
  {x:40, y:10},
  {x:40, y:80},
  {x:20, y:90},
  {x:10, y:80},
  {x:20, y:60},
  {x:80, y:40},
  {x:90, y:20},
  {x:80, y:10},
  {x:60, y:20},
  {x:60, y:80},
  {x:80, y:90},
  {x:90, y:80}
];

export const gameOverLevel: Level = new Level(0, gameOverLevelPts);
export const level1: Level = new Level(1, level1Pts);
export const level2: Level = new Level(2, level2Pts);
export const level3: Level = new Level(3, level3Pts);
export const level4: Level = new Level(4, level4Pts);
export const level5: Level = new Level(5, level5Pts);
export const level6: Level = new Level(6, level6Pts);
export const level7: Level = new Level(7, level7Pts);
export const level8: Level = new Level(8, level8Pts);
export const level9: Level = new Level(9, level9Pts);
export const level10: Level = new Level(10, level10Pts);

export const levels: Level[] = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10];