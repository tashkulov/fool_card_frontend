import { Routes } from '@angular/router';
import { NewGameComponent } from './new-game/new-game.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // Отображает HomePageComponent по корневому пути
  { path: 'create-game', component: NewGameComponent } // Отображает NewGameComponent по пути '/create-game'
];
