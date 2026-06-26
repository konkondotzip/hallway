import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Circle, CircleConfig } from 'konva/lib/shapes/Circle';
import { StageConfig } from 'konva/lib/Stage';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';
import { GAME_OVER, level1, PAUSED, PLAYING, u, WAITING } from './game-data/constants';
import { Line, LineConfig } from 'konva/lib/shapes/Line';
import { player, snake } from './game-data/entity-data';
import Konva from 'konva';
import { AnimationFn, IFrame } from 'konva/lib/types';
import { Text, TextConfig } from 'konva/lib/shapes/Text';
import { Highscores } from "./highscores/highscores";

@Component({
  selector: 'app-hallway',
  imports: [StageComponent, CoreShapeComponent, Highscores],
  templateUrl: './hallway.html',
  styleUrl: './hallway.scss',
  host: {
    '(body:keydown)': 'onKeyDown($event)',
    '(body:keyup)': 'onKeyUp($event)'
  }
})
export class Hallway implements AfterViewInit, OnDestroy {
  isForwardPressed = false;
  gameState: string = WAITING;
  currentLevel: number = 0;
  gameSpeed: number = 1;

  @ViewChild('player') player!: any;
  @ViewChild('snake') snake!: any;
  @ViewChild('gameStatus') gameStatus!: any;
  @ViewChild('fps') fps!: any;
  private animation!: Konva.Animation;

  ngAfterViewInit(): void {
    const playerElem: Circle = this.player.getNode();
    const snakeElem: Line = this.snake.getNode();
    const gameStatusElem: Text = this.gameStatus.getNode();
    const fpsElem: Text = this.fps.getNode();
    const elems = { player: playerElem, snake: snakeElem, gameStatus: gameStatusElem, fps: fpsElem };
    this.animation = new Konva.Animation((frame) => this.updateAnimation(frame, elems)), playerElem.getLayer();
    this.animation.start();
  }

  ngOnDestroy(): void {
    if (this.animation) this.animation.stop();
  }

  updateAnimation(frame: IFrame, elems: any): void {
    this.updatePlayer(frame, elems.player);
    this.updateSnake(frame, elems.snake);
    this.updateGameStatus(elems.gameStatus);
    this.updateFps(frame, elems.fps);

    if (player.pos <= snake.pos) {
      this.gameState = GAME_OVER;
      this.resetGame();
    }
  }

  resetGame() {
    player.pos = 10;
    snake.pos = 0;
    snake.draw();
  }

  updatePlayer(frame: IFrame, elem: Circle): void {
    const deltaTime = frame.timeDiff;
    if (this.gameState == PLAYING) {
      player.move(this.isForwardPressed, deltaTime);
    }
    let coords = level1.getXYfromPos(player.pos);
    elem.x(coords.x * u);
    elem.y(coords.y * u);
    elem.fill(player.color);
  }

  updateSnake(frame: IFrame, elem: Line): void {
    const deltaTime = frame.timeDiff;
    if (this.gameState == PLAYING) {
      snake.move(deltaTime, this.gameSpeed);
      snake.draw(level1);
    }
    elem.points(snake.points);
    elem.fill(player.color);
  }

  updateGameStatus(elem: Text) {
    elem.text(this.gameState);
  }

  updateFps(frame: IFrame, elem: Text) {
    let fps: number = Math.floor(frame.frameRate);
    elem.text(`${fps} fps`);
  }

  public configStage: StageConfig = {
    width: 700,
    height: 700,
  };

  public configPlayer: CircleConfig = {
    radius: player.size * u,
    fill: player.color
  }

  public configSnake: LineConfig = {
    strokeWidth: snake.size * u,
    points: snake.points,
    stroke: snake.color,
  }

  public configLevel: LineConfig = {
    points: level1.points,
    stroke: 'black',
    strokeWidth: 1 * u,
  }

  public configGameStatus: TextConfig = {
    text: 'testing'
  }

  public configFps: TextConfig = {
    text: "0",
    align: "right",
    x: 95 * u,
    y: 0 * u
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        if (event.repeat) return;
        if (this.gameState != PLAYING) {
          this.gameState = PLAYING;
        }
        this.isForwardPressed = true;
        break;
      case "Escape":
        switch (this.gameState) {
          case PLAYING:
            this.gameState = PAUSED;
            break;
          case PAUSED:
            this.gameState = PLAYING;
            break;
          default:
            break;
        };
        player.velocity = 0;
        break;
      default:
        break;
    }
  }

  onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        this.isForwardPressed = false;
        break;
      default:
        break;
    }
  }
}
