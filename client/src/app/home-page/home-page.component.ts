import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  @Input() user: any;

  ngOnInit() {
    console.log('User in NewGameComponent:', this.user); // Log user data in NewGameComponent
  }
}
