import { Routes } from '@angular/router';
import { Upload } from './upload/upload';
import { Results } from './results/results';

export const routes: Routes = [
  { path: '', component: Upload },
  { path: 'results/:id', component: Results },
];
