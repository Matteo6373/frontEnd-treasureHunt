import { Routes } from '@angular/router';
import {TreasureHuntComponent} from './core/components/treasure-hunt-component/treasure-hunt-component';
import {TreasureScrollComponent} from './core/components/treasure-scroll-component/treasure-scroll-component';

export const routes: Routes = [
  { path: '', redirectTo: 'treasures', pathMatch: 'full' },
  { path: 'treasures', component: TreasureHuntComponent},
  { path: 'treasure-scroll', component: TreasureScrollComponent}
];
