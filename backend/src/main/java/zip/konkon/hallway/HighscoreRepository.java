package zip.konkon.hallway;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HighscoreRepository extends JpaRepository<Highscore, Integer> {
  Optional<Highscore> findByName(String name);

  List<Highscore> findAllByOrderByScoreDesc();

  void deleteByName(String name);
}
