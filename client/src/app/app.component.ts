import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TelegramService } from './telegram.service';
import {NewGameComponent} from "./new-game/new-game.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}
