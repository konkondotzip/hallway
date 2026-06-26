import { Routes } from '@angular/router';
import { Example } from './sussy/sussy';
import { Hallway } from './hallway/hallway';

export const routes: Routes = [
  {
    path: 'sussy',
    component: Example,
    title: "Sussy"
  },
  {
    path: 'gaming',
    component: Hallway,
    title: "Gaming"
  }
];
