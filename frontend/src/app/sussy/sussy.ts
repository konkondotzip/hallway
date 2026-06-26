import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './sussy.html',
  styleUrl: './sussy.scss',
})
export class Example {
  sus = String.fromCharCode(Array.from({ length: (true).toString().toUpperCase().charCodeAt(0) }, (_, i) => i).reduce((a, b) => a + b));
}
