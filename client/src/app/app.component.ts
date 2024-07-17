import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TelegramService } from './telegram.service';
import {NewGameComponent} from "./new-game/new-game.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  styles: [],
  templateUrl: 'app.components.html',
  imports: [
    NewGameComponent,
    RouterOutlet
  ]
})
export class AppComponent {

}
