import { Level } from "../game-objects/level";
import { Coordinate2D, levels, u } from "./constants";

export function coordsToPoints(coords: Coordinate2D[]) {
  let points: number[] = [];
  coords.forEach(p => {
    points.push(p.x * u);
    points.push(p.y * u);
  });
  return points;
}

export function getLevel(id: number): Level | undefined {
  return levels.find(l => l.id == id);
}