import { Coordinate2D, u } from "../game-data/constants";
import { coordsToPoints } from "../game-data/functions";

export class Level {
  id: number;
  points: number[] = [];
  coords: Coordinate2D[] = [];
  lengths: number[] = [];
  maxLength: number = 0;

  constructor(id: number, coords: Coordinate2D[]) {
    this.id = id;
    for (let i = 0; i < coords.length - 1; i++) {
      let dx = coords[i + 1].x - coords[i].x;
      let dy = coords[i + 1].y - coords[i].y;
      this.lengths.push(Math.sqrt(dx ** 2 + dy ** 2));
    }
    this.coords = coords;
    this.points = coordsToPoints(coords);
    this.maxLength = this.lengths.reduce((a, b) => a + b);
  }

  getSegmentAtPos(pos: number): number {
    if (pos == 0) return 0;
    let check = 0;
    for (let i = 0; i < this.lengths.length; i++) {
      check += this.lengths[i];
      if (check >= pos) return i;
    }
    return this.lengths.length - 1;
  }

  getXYfromPos(pos: number): Coordinate2D {
    if (pos > this.maxLength) pos = this.maxLength;
    let result: Coordinate2D = new Coordinate2D(0, 0);
    let segIdx = this.getSegmentAtPos(pos);
    let segLen = this.lengths[segIdx];
    let prevCornerPos = 0;
    for (let i = 0; i < segIdx; i++) {
      prevCornerPos += (this.lengths[i] ?? 0);
    }
    let prevCornerCoords = this.coords[segIdx];
    let nextCornerCoords = this.coords[segIdx + 1];
    let distFromLastCorner = pos - prevCornerPos;

    let dirX = (nextCornerCoords.x - prevCornerCoords.x) / segLen;
    let dirY = (nextCornerCoords.y - prevCornerCoords.y) / segLen;

    result.x = dirX * distFromLastCorner + prevCornerCoords.x;
    result.y = dirY * distFromLastCorner + prevCornerCoords.y;

    return result;
  }
}