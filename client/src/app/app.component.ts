import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TelegramService } from './telegram.service';
import {NewGameComponent} from "./new-game/new-game.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
  imports: [
    NewGameComponent,
    RouterOutlet
  ]
})

export class AppComponent implements OnInit {
  user: any;

  constructor(private telegramService: TelegramService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.user = this.telegramService.getUser();
    console.log('User in component:', this.user); // Логирование данных пользователя в компоненте
    this.cdr.detectChanges(); // Принудительное обнаружение изменений
  }
}