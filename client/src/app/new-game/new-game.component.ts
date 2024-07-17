import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";
;

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    MatRadioGroup,
    MatRadioButton,
    MatCheckbox,
    MatIcon,
    RouterOutlet,
  ],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {

  bet: number = 1000;
  gameMode: string = '';
  playerCount: number = 2;
  privateGame: boolean = false;

  setBet(amount: number) {
    this.bet = amount;
  }

  createGame() {
    console.log({
      bet: this.bet,
      gameMode: this.gameMode,
      playerCount: this.playerCount,
      privateGame: this.privateGame
    });
  }
  increaseBet() {
    this.bet += 100;
  }

  decreaseBet() {
    if (this.bet >= 100) {
      this.bet -= 100;
    }
  }
}
