import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private loginStatus = new BehaviorSubject(false);
  currentLoginStatus = this.loginStatus.asObservable();

  constructor() { }

  changeLoginStatus(status: boolean): void {
    this.loginStatus.next(status);
  }
}
