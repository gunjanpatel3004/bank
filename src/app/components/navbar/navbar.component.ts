import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onLogout() {
    // Perform logout logic (e.g., clear local storage)
    localStorage.removeItem('token');
    this.router.navigate(['/']); // Redirect to login page
  }

  goBackToDashboard() {
    this.router.navigate(['/dashboard']); // Navigate back to the dashboard
  }
}