package zip.konkon.hallway;

public class RankedHighscore {
  private Highscore highscore;
  private int rank;

  public RankedHighscore(Highscore highscore, int rank) {
    this.highscore = highscore;
    this.rank = rank;
  }

  public Highscore getHighscore() {
    return highscore;
  }

  public int getRank() {
    return rank;
  }
}
