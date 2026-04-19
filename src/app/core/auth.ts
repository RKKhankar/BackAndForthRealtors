import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  constructor() {
    // ✅ Restore login state on reload
    this.isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('loggedIn', 'false');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}