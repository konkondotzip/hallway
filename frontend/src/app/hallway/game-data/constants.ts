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
]
const gameOverLevelPts: Coordinate2D[] = [
  { x: 50, y: 90 },
  { x: 50, y: 10 },
]

export const gameOverLevel: Level = new Level(0, gameOverLevelPts);
export const level1: Level = new Level(1, level1Pts);
export const level2: Level = new Level(2, level2Pts);

export const levels: Level[] = [level1, level2];