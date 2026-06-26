import { TestBed } from "@angular/core/testing";

import { Highscores } from "./highscores";

describe("Highscores", () => {
  let service: Highscores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Highscores);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
