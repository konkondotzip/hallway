package zip.konkon.hallway;

public class RankedHighscore {
  private Highscore highscore;
  private int rank;
  private boolean last;

  public RankedHighscore(Highscore highscore, int rank, boolean last) {
    this.highscore = highscore;
    this.rank = rank;
    this.last = last;
  }

  public Highscore getHighscore() {
    return highscore;
  }

  public int getRank() {
    return rank;
  }

  public boolean isLast() {
    return last;
  }
}
