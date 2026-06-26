import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Highscore } from "./highscore.interface";
import { Observable } from "rxjs";

@Service()
export class HighscoresService {
  private http = inject(HttpClient)

  getHighscores(): Observable<Highscore[]> {
    return this.http.get<Highscore[]>(`${apiUrl}/all`);
  }

  addHighscore(h: Highscore): Observable<any> {
    return this.http.post(`${apiUrl}/add`, h);
  }
}
export let apiUrl: string = "http://localhost:8080/hallway/highscores"