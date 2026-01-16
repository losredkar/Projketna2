import { Component } from '@angular/core';
import { Auth } from '../../../Core/Services/auth';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLoggedIn = false;

  constructor(private authService: Auth) {}
  ngOnInit() {
    // Kaksno je trenutno stanje, ali je kdo prijavljen
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user; // true, če user prijavljen, sicer false
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
