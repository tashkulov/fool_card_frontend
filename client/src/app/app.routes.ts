import { Routes } from '@angular/router';
import { NewGameComponent } from './new-game/new-game.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-game', component: NewGameComponent },
  { path: 'in-game', component: PlayPageComponent} 
];
