import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { Circle, CircleConfig } from 'konva/lib/shapes/Circle';
import { Stage, StageConfig } from 'konva/lib/Stage';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';
import { GAME_OVER, level1, PAUSED, PLAYING, u, WAITING } from './game-data/constants';
import { Line, LineConfig } from 'konva/lib/shapes/Line';
import { player, snake } from './game-data/entity-data';
import Konva from 'konva';
import { AnimationFn, IFrame } from 'konva/lib/types';
import { Text, TextConfig } from 'konva/lib/shapes/Text';
import { Highscores } from "./highscores/highscores";
import { Level } from './game-objects/level';
import { checkPlayerCollision, gameOver, getLevel, updateGame, updateGui, updateLevel, updatePlayer, updateSnake } from './game-data/functions';
import { NgbCollapse, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Highscore } from './highscores/highscore.interface';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { apiUrl, HighscoresService } from './highscores/highscores.service';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hallway',
  imports: [StageComponent, CoreShapeComponent, Highscores, NgbCollapse, FormsModule],
  templateUrl: './hallway.html',
  styleUrl: './hallway.scss',
  host: {
    '(body:keydown)': 'onKeyDown($event)',
    '(body:keyup)': 'onKeyUp($event)'
  }
})
export class Hallway implements AfterViewInit, OnDestroy {
  size: number = 700;

  readonly hideHighscores = signal(true);
  refreshHighscores = signal(0);

  username: string = "";
  score: number = 0;
  private modalService = inject(NgbModal);
  @ViewChild('setUsername') setUsernameElem!: any;
  readonly modalClosed = signal('');

  isForwardPressed = false;
  gameState: string = WAITING;
  currentLevel: Level = level1;
  difficulty: number = 1;

  @ViewChild('stage') stageElem!: any;
  @ViewChild('player') playerElem!: any;
  @ViewChild('snake') snakeElem!: any;
  @ViewChild('gameState') gameStateElem!: any;
  @ViewChild('fps') fpsElem!: any;
  @ViewChild('level') levelElem!: any;
  @ViewChild('score') scoreElem!: any;
  @ViewChild('levelGui') levelGuiElem!: any;
  private animation!: Konva.Animation;

  constructor(public highscoreService: HighscoresService) { }

  async ngAfterViewInit(): Promise<void> {
    try {
      const result = await this.setUsername(this.setUsernameElem);

      this.username = result;
      this.modalClosed.set(`Closed with: ${result}`);

      const elems = {
        player: this.playerElem.getNode(),
        snake: this.snakeElem.getNode(),
        gameState: this.gameStateElem.getNode(),
        fps: this.fpsElem.getNode(),
        level: this.levelElem.getNode(),
        score: this.scoreElem.getNode(),
        levelGui: this.levelGuiElem.getNode(),
        stage: this.stageElem.getNode(),
      };
      this.animation = new Konva.Animation(((frame) => updateGame(this, frame, elems)), elems.player.getLayer());
      this.animation.start();
    } catch (reason) {
      console.log("Modal geschlossen:", reason);
    }
  }

  ngOnDestroy(): void {
    if (this.animation) this.animation.stop();
  }

  setUsername(content: TemplateRef<any>) {
    return this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',   // verhindert Schließen durch Klick außerhalb
      keyboard: false       // verhindert ESC
    }).result;
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.modalClosed()) return;
    switch (event.code) {
      case "Space":
        event.preventDefault();
        if (event.repeat) return;
        if (this.gameState != PLAYING) this.gameState = PLAYING;
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
    if (!this.modalClosed()) return;
    switch (event.code) {
      case "Space":
        event.preventDefault();
        this.isForwardPressed = false;
        break;
      default:
        break;
    }
  }

  public configStage: StageConfig = {
    width: 700,
    height: 700
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
    points: this.currentLevel.points,
    stroke: 'black',
    strokeWidth: 1 * u,
  }

  public configGameStatus: TextConfig = {
    text: 'testing',
    height: 100 * u,
    width: 100 * u,
  }

  public configFps: TextConfig = {
    text: "0",
    height: 100 * u,
    width: 100 * u,
    align: "right",
  }

  public configScore: TextConfig = {
    text: `Score: ${this.score}`,
    height: 100 * u,
    width: 100 * u,
    fontSize: 2 * u,
    verticalAlign: 'bottom',
    fontFamily: 'EuroScript'
  }

  public configLevelGui: TextConfig = {
    text: `Level ${this.difficulty}-${this.currentLevel.id}`,
    height: 100 * u,
    width: 100 * u,
    fontSize: 2 * u,
    align: 'right',
    verticalAlign: 'bottom',
    fontFamily: 'EuroScript'
  }
}
