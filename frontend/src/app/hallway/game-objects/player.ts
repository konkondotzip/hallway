import { Coordinate2D } from "../game-data/constants";
import { GameObject } from "./game-object.interface";
import { Level } from "./level";

export class Player implements GameObject {
  pos = 10;
  color: "blue" | "cyan" = "blue";
  size = 1;
  velocity: number = 0;
  forwardSpeed: number = 0.1;
  backwardSpeed: number = -0.0125;

  constructor(pos: number = 10) {
    this.pos = pos;
  }

  move(isForwards: boolean, deltaTime: number) {
    if (isForwards) {
      this.velocity = this.forwardSpeed;
      this.color = "blue";
    } else {
      this.velocity = this.backwardSpeed;
      this.color = "cyan";
    }
    this.pos += this.velocity * deltaTime;
    if (this.pos < 0) this.pos = 0;
  }
}