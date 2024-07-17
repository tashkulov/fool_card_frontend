import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  @Input() user: any;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('User in NewGameComponent:', this.user); // Log user data in NewGameComponent
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
