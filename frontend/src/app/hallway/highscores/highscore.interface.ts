export interface RankedHighscore {
  rank: number;
  highscore: Highscore;
}

export class Highscore {
  id?: number;
  name: string;
  timestamp: string;
  score: number;
  level: number;
  difficulty: number;

  constructor(name: string, timestamp: string, score: number, level: number, difficulty: number) {
    this.name = name;
    this.timestamp = timestamp;
    this.score = score;
    this.level = level;
    this.difficulty = difficulty;
  }
}