package zip.konkon.hallway;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class HighscoreService {

  @Autowired
  private HighscoreRepository repository;

  public Sort sort = Sort.by(Sort.Direction.DESC, "score", "difficulty", "level", "timestamp");

  public HighscoreService(HighscoreRepository repository) {
    this.repository = repository;
  }

  public List<RankedHighscore> getTop(Integer limit) {
    List<Highscore> unranked = this.repository.findAll(sort);
    List<RankedHighscore> ranked = new ArrayList<>();

    int max = Math.min(unranked.size(), limit);

    for (int i = 0; i < max; i++) {
      boolean last = unranked.size() == i + 1;
      RankedHighscore h = new RankedHighscore(unranked.get(i), i + 1, last);
      ranked.add(h);
    }

    return ranked;
  }

  public RankedHighscore getRanking(String name) {
    List<Highscore> unranked = this.repository.findAll(sort);
    for (int i = 0; i < unranked.size(); i++) {
      Highscore h = unranked.get(i);

      if (h.getName().equals(name)) {
        return new RankedHighscore(h, i + 1, false);
      }
    }

    return null;
  }

  public List<RankedHighscore> getRankingWindow(String name, int window) {
    List<Highscore> unranked = this.repository.findAll(sort);
    List<RankedHighscore> ranked = new ArrayList<>();

    int userIndex = -1;

    for (int i = 0; i < unranked.size(); i++) {
      Highscore h = unranked.get(i);

      if (h.getName().equals(name)) {
        userIndex = i;
      }
      
      boolean last = unranked.size() == i + 1;
      ranked.add(new RankedHighscore(h, i + 1, last));
    }

    if (userIndex == -1) {
      return List.of(); // user nicht gefunden
    }

    int from = Math.max(0, userIndex - window);
    int to = Math.min(unranked.size(), userIndex + window + 1);

    return ranked.subList(from, to);
  }
}
