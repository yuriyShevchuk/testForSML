import { Injectable } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider
} from 'angular-6-social-login-v2';
import {SharedDataService} from './shared-data.service';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged: boolean;

  constructor(
    private socialAuthService: AuthService,
    private sharedData: SharedDataService,
    private storageService: LocalStorageService,
    private router: Router
  ) { }

  signInUser(socialPlatform: string): void {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        if (userData['token']) {
          this.isLogged = true;
          this.sharedData.changeLoginStatus(this.isLogged);
          if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
          }
          localStorage.setItem('token', userData['token']);
          this.storageService.saveUserInfo(userData);
        }
        console.log(socialPlatform, ' sign in data: ', userData);
      }
    );
  }

  signOutUser(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      // this.socialAuthService.signOut().then(() => console.log('logged out!'));
      this.isLogged = false;
      this.sharedData.changeLoginStatus(this.isLogged);
      this.router.navigate(['']);
    }
  }

  setInitialLogin(): void {
    this.isLogged = false;
    if (localStorage.getItem('token')) {
      this.isLogged = true;
    }
    this.sharedData.changeLoginStatus(this.isLogged);
  }

}
