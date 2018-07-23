import { Component, OnInit } from '@angular/core';
import {SharedDataService} from './services/shared-data.service';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean;

  constructor(
    private sharedData: SharedDataService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.sharedData.currentLoginStatus.subscribe( status => this.isLogged = status);
    this.localStorage.setMockAnswers();
  }
}
