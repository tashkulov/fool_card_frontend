import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
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
