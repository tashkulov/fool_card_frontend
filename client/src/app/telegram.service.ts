import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private initDataUnsafe: any;
  private user: any;

  constructor() {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      this.initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      this.user = this.initDataUnsafe.user;
      console.log('User data in service:', this.user); // Логирование данных пользователя
    } else {
      console.error('Telegram WebApp is not available or window is not defined.');
    }
  }

  getUser() {
    return this.user;
  }
}