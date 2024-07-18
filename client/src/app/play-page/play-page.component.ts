import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-play-page',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './play-page.component.html',
  styleUrl: './play-page.component.css'
})
export class PlayPageComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
