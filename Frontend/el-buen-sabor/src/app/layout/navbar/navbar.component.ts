import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLoggedInfo$ = this._localStorageService.userLogged$;
  isLogged: boolean = false;

  constructor(
    private _localStorageService: LocalStorageService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._localStorageService.loadInfo();
    if (
      this.userLoggedInfo$.subscribe((user) =>
        user ? (this.isLogged = true) : (this.isLogged = false)
      )
    ) {
    }
  }

  logOut(): void {
    this._localStorageService.clearInfo();
    this._localStorageService.clearAllLocalStorage();
    this.logOutGoogle();
  }

  public logOutGoogle(): void {
    this.socialAuthService
      .signOut(true)
      .then(() => {
        console.log('Log out Google exitoso');
      })
      .catch((err) => {
        console.log('Log out Google error:', err);
      });
    this.router.navigate(['/home']);
  }
}
