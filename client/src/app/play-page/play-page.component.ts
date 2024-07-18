import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-play-page',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './play-page.component.html',
  styleUrl: './play-page.component.css'
})
export class PlayPageComponent {
  isReady: boolean = false;
  isMyTurn: boolean = true;
  isCardClicked: boolean = false;
  isCardDropped: boolean = false;
  isCardBeaten: boolean = false;

  constructor(private router: Router) {
    
  }

  readyHandler() {
    this.isReady = true;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onCardClick() {
    this.isCardClicked = !this.isCardClicked;
    this.isCardDropped = !this.isCardDropped;
  }

  inPlayPageMainButtonHandler() {
    if (!this.isReady) {
      this.isReady = !this.isReady
    } else if (this.isReady) {
      if (this.isCardDropped) {
        if (this.isMyTurn) {
          this.isCardBeaten = !this.isCardBeaten;
        }
      }
    }
  }
}
