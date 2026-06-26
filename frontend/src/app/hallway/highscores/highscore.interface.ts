export interface RankedHighscore {
  rank: number;
  highscore: Highscore;
}

export interface Highscore {
  id: number;
  name: string;
  timestamp: string;
  score: number;
  level: number;
  difficulty: number;
}