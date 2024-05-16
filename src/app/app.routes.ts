import { Routes } from '@angular/router';

import { GarageComponent } from './components/garage.component';
import { WinnersComponent } from './components/winners.component';
import { NotFoundComponent } from './shared/components/404-page.component';

export const routes: Routes = [
  {
    path: 'garage',
    component: GarageComponent,
  },
  {
    path: 'winners',
    component: WinnersComponent,
  },
  { path: '', redirectTo: '/garage', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
