import { Coordinate2D } from "../game-data/constants";
import { coordsToPoints } from "../game-data/functions";
import { GameObject } from "./game-object.interface";
import { Level } from "./level";

export class Snake implements GameObject {
  pos = 0;
  color: "red" = "red";
  size = 1;
  velocity = 0;
  startingSpeed: number = 0.0025;
  difficulty: number = 0.00025;
  acceleration: number = 1.0025;
  corners: Coordinate2D[] = [];
  points: number[] = [];

  move(deltaTime: number, gameSpeed: number = 1) {
    this.velocity = this.startingSpeed * gameSpeed;
    this.pos += this.velocity * deltaTime;
  }

  draw(level?: Level) {
    if (level) {
      let seg = level.getSegmentAtPos(this.pos);
      let corners: Coordinate2D[] = [];
      for (let i = 0; i <= seg; i++) {
        corners.push(level.coords[i]);
      }
      corners.push(level.getXYfromPos(this.pos));
      this.corners = corners;
      this.points = coordsToPoints(corners);
    } else {
      this.corners = [];
      this.points = [];
    }
  }
}