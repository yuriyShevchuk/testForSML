import { Injectable } from '@angular/core';
import { ANSWERS } from '../mock-answers';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveUserInfo(userData: any): void {
    const userInfo = {
      name: userData['name'],
      id: userData['id'],
      fbImage: userData['image']
    };
    if (localStorage.getItem('user_info')) {
      localStorage.removeItem('user_info');
    }
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  }

  getPrevUserAnswer(): any {
    const user = this.getCurrentUserInfo();
    const answers = this.getAllAnswers();
    if (answers && answers[user['id']]) {
      return answers[user['id']];
    }
    return undefined;
  }

  deletePrevUserAnswer(): void {
    const answers = this.getAllAnswers();
    const user = this.getCurrentUserInfo();
    delete answers[user['id']];
    this.saveAnswers(answers);
  }

  getCurrentUserInfo(): any {
    let user = localStorage.getItem('user_info');
    user = JSON.parse(user);
    return user;
  }

  getAllAnswers(): any {
    if (localStorage.getItem('answers')) {
      let answers = localStorage.getItem('answers');
      answers = JSON.parse(answers);
      return answers;
    }
    return undefined;
  }

  setMockAnswers(): void {
    if (!localStorage.getItem('answers')) {
      localStorage.setItem('answers', JSON.stringify(ANSWERS));
      console.log('mock answers set!!! ', localStorage.getItem('answers'));
    }
  }

  saveAnswers(answers: any): void {
    if (localStorage.getItem('answers')) {
      localStorage.removeItem('answers');
    }
    localStorage.setItem('answers', JSON.stringify(answers));
  }

}
