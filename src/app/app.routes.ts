import { Routes } from '@angular/router';
import {TreasureHuntComponent} from './core/components/treasure-hunt-component/treasure-hunt-component';

export const routes: Routes = [
  { path: '', redirectTo: 'treasures', pathMatch: 'full' },
  { path: 'treasures', component: TreasureHuntComponent},
];
