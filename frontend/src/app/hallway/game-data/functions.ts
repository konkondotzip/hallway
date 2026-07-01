import { IFrame } from "konva/lib/types";
import { Level } from "../game-objects/level";
import { Hallway } from "../hallway";
import { Highscore } from "../highscores/highscore.interface";
import { Coordinate2D, GAME_OVER, level1, levels, PLAYING, u } from "./constants";
import { player, snake } from "./entity-data";
import { Circle } from "konva/lib/shapes/Circle";
import { Line } from "konva/lib/shapes/Line";
import { Text } from "konva/lib/shapes/Text";
import { formatDate } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

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

export function updateGame(game: Hallway, frame: IFrame, elems: any): void {
  updatePlayer(game, frame, elems.player);
  updateSnake(game, frame, elems.snake);
  updateLevel(game, elems.level);
  updateGui(game, frame, elems.gameState, elems.fps, elems.score, elems.levelGui);
  checkPlayerCollision(game);
}

export function checkPlayerCollision(game: Hallway) {
  if (player.pos <= snake.pos) gameOver(game);
}

export function gameOver(game: Hallway) {
  game.gameState = GAME_OVER;
  // Das Backend unterstützt keine Zeitzonenangaben, deswegen müssen alle fest auf +0200 (MESZ) gesetzt werden
  let timestamp = formatDate(new Date(), "yyyy-MM-ddTHH:mm:ss.s'Z'", "de-DE", "+0200");
  let h = new Highscore(game.username, timestamp, game.score, game.currentLevel.id, game.difficulty);
  console.log(h);
  game.highscoreService.addHighscore(h).subscribe((response) => {
    console.log(response);
  }, (error: HttpErrorResponse) => {
    if (error.status === 200) return;
  });
  resetGame(game);
}

export function resetLevel() {
  player.pos = 10;
  snake.pos = 0;
  snake.draw();
}

export function resetGame(game: Hallway) {
  game.difficulty = 1;
  game.currentLevel = level1;
  game.score = 0;
  resetLevel();
}

export function updatePlayer(game: Hallway, frame: IFrame, elem: Circle): void {
  const deltaTime = frame.timeDiff;
  if (game.gameState == PLAYING) {
    player.move(game.isForwardPressed, deltaTime);
    if (player.pos >= game.currentLevel.maxLength) {
      let nextLevel = getLevel(game.currentLevel.id + 1);
      game.score += 100;
      game.currentLevel = nextLevel ?? level1;
      if (!nextLevel) game.difficulty++;
      resetLevel();
    }
  }
  let coords = game.currentLevel.getXYfromPos(player.pos);
  elem.x(coords.x * u);
  elem.y(coords.y * u);
  elem.fill(player.color);
}

export function updateSnake(game: Hallway, frame: IFrame, elem: Line): void {
  const deltaTime = frame.timeDiff;
  if (game.gameState == PLAYING) {
    snake.move(deltaTime, game.difficulty);
    snake.draw(game.currentLevel);
  }
  elem.points(snake.points);
  elem.fill(player.color);
}

export function updateLevel(game: Hallway, elem: Line) {
  elem.points(game.currentLevel.points);
}

export function updateGui(game: Hallway, frame: IFrame, gameState: Text, fps: Text, score: Text, level: Text) {
  gameState.text(game.gameState);

  let frameRate: number = Math.floor(frame.frameRate);
  fps.text(`${frameRate} fps`);

  score.text(`Score: ${game.score}`);

  level.text(`Level ${game.difficulty}-${game.currentLevel.id}`);
}