import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

interface Card {
  id: number;
  imagePath: string;
  isCardClicked: boolean;
  isCardBeaten: boolean;
  isCardDropped: boolean;
  targetX?: number;  // Целевые координаты X
  targetY?: number;
  stX?: number;
  stY?: number;
  bX?: number;
  bY?: number;// Целевые координаты Y
}

interface Deck {
  id: number;
  imagePath: string;
  stX?: number;
  stY?: number;
  rotDeg?: number;
}

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
  isMyTurn: boolean = false;

  decks: Deck[] = [
    {
      imagePath: 'assets/img/card-cover.png',
      id: 0,
      stX: -80,
      stY: -450,
      
    }
  ];

  botCards: Deck[] = [
    { id: 1, imagePath: 'assets/img/card-cover.png', stX: 113, stY: -630, rotDeg: 0},
    { id: 2, imagePath: 'assets/img/card-cover.png', stX: 93, stY: -630, rotDeg: 20},
    { id: 3, imagePath: 'assets/img/card-cover.png', stX: 133, stY: -630, rotDeg: -20},
  ]

  cards: Card[] = [
    { id: 1, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 50, targetY: -370, stX: 0, stY: 0 },
    { id: 2, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 100, targetY: -370, stX: 45, stY: 0 },
    { id: 3, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 150, targetY: -370, stX: 90, stY: 0 },
    { id: 4, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 50, targetY: -300, stX: 135, stY: 0 },
    { id: 5, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 100, targetY: -300, stX: 180, stY: 0 },
    { id: 6, imagePath: 'assets/img/sp_14.svg', isCardClicked: false, isCardBeaten: false, isCardDropped: false, bX: 300, bY: -400, targetX: 150, targetY: -300, stX: 225, stY: 0 }
  ];

  droppedCards: Card[] = [];

  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onCardClick(card: Card) {
    if (!card.isCardBeaten) {
      card.isCardClicked = !card.isCardClicked;
      card.isCardDropped = !card.isCardDropped;
      this.addToDroppedCards(card);
    }

  }

  addToDroppedCards(card: Card) {
    // Добавляем карту в список выкинутых карт, если её ещё там нет

    this.droppedCards.push(card);

  }

  cardBeat() {
    this.droppedCards.forEach(card => {
      card.isCardBeaten = !card.isCardBeaten;
    });
  }

  inPlayPageMainButtonHandler() {
    if (!this.isReady) {
      this.isReady = !this.isReady
    } else if (this.isReady) {

      if (!this.isMyTurn) {
        this.cardBeat();
      }


    }
  }
}
