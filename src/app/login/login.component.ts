import { Component, OnInit } from '@angular/core';

import {SharedDataService} from '../services/shared-data.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean;

  constructor(
    private sharedData: SharedDataService,
    private loginService: LoginService
  ) { }

  socialSingIn(socialPlatform: string): void {
    this.loginService.signInUser(socialPlatform);
  }

  socialSignOut(): void {
    this.loginService.signOutUser();
  }

  setInitialLoginStatus(): void {
    this.loginService.setInitialLogin();
  }

  ngOnInit() {
    this.setInitialLoginStatus();
    this.sharedData.currentLoginStatus.subscribe(status => this.isLogged = status);
  }
}
