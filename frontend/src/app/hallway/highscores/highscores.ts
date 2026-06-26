import { Component } from "@angular/core";
import { Highscore, RankedHighscore } from "./highscore.interface";
import { apiUrl } from "./highscores.service";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { TimeagoIntl, TimeagoPipe } from "ngx-timeago";
import { strings as germanStrings } from 'ngx-timeago/language-strings/de.js'
registerLocaleData(localeEn);
registerLocaleData(localeDe);
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-highscores",
  imports: [DatePipe, TimeagoPipe, NgbTooltipModule],
  templateUrl: "./highscores.html",
  styleUrl: "./highscores.scss",
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ]
})
export class Highscores {
  highscoresRef: HttpResourceRef<RankedHighscore[] | undefined> = httpResource(() => `${apiUrl}/top`);

  constructor(private intl: TimeagoIntl) {
    this.intl.strings = germanStrings;
    this.intl.changes.next();
  }

}
