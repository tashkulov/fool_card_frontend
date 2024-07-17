import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-root',
  template: `
    <div>Имя: {{ user?.first_name }}</div>
    <div>Фамилия: {{ user?.last_name }}</div>
    <div>Username: {{ user?.username }}</div>
    <div>Язык: {{ user?.language_code }}</div>
    <div>aksjdhkasjdh</div>

  `,
  standalone: true,
  styles: []
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
