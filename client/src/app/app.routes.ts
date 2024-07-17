import { Routes } from '@angular/router';;
import {NewGameComponent} from "./new-game/new-game.component";
import {NewMyGameComponent} from "./new-my-game/new-my-game.component";


export const routes: Routes = [
  { path: '', component: NewMyGameComponent },
  { path: 'create-game', component: NewGameComponent }
];

