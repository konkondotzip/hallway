package zip.konkon.hallway;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/hallway/highscores")
public class HighwayController {

  @Autowired
  private HighscoreRepository repository;

  private HighscoreService service;

  public HighwayController(HighscoreService service) {
    this.service = service;
  }

  @PostMapping(path = "/add")
  public @ResponseBody String addNewHighscore(@RequestBody Highscore newHighscore) {
    Optional<Highscore> existing = repository.findByName(newHighscore.getName());

    if (existing.isEmpty()) {
      repository.save(newHighscore);
      return "new highscore saved";
    }

    Highscore current = existing.get();

    if (newHighscore.getScore() > current.getScore()) {
      current.setScore(newHighscore.getScore());
      current.setTimestamp(newHighscore.getTimestamp());
      current.setLevel(newHighscore.getLevel());
      current.setDifficulty(newHighscore.getDifficulty());

      repository.save(current);
      return "highscore updated";
    }

    return "score not high enough";
  }

  @GetMapping(path = "/{name}")
  public @ResponseBody RankedHighscore getHighscoreById(@PathVariable String name) {
    return service.getRanking(name);
  }

  @GetMapping(path = "/top")
  public @ResponseBody List<RankedHighscore> getTopHighscores(@RequestParam(defaultValue = "10") Integer limit) {
    return service.getTop(limit);
  }

  @GetMapping(path = "/{name}/ranking")
  public @ResponseBody List<RankedHighscore> getWindow(@PathVariable String name,
      @RequestParam(defaultValue = "3") int window) {
    return service.getRankingWindow(name, window);
  }

  @GetMapping(path = "/all")
  public @ResponseBody Iterable<Highscore> getAllHighscores() {
    return repository.findAll(service.sort);
  }

  @DeleteMapping(path = "/remove")
  public @ResponseBody void deleteHighscore(@RequestParam String name) {
    repository.deleteByName(name);
  }
}