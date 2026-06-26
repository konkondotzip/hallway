import { Coordinate2D, u } from "./constants";

export function coordsToPoints(coords: Coordinate2D[]) {
  let points: number[] = [];
  coords.forEach(p => {
    points.push(p.x * u);
    points.push(p.y * u);
  });
  return points;
}