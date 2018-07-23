import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {DialogsService} from '../services/dialogs.service';

@Component({
  selector: 'app-all-answers',
  templateUrl: './all-answers.component.html',
  styleUrls: ['./all-answers.component.css']
})
export class AllAnswersComponent implements OnInit {
  answers: any;
  user: any;
  yesImg = './assets/images/yes-check.svg';
  noImg = './assets/images/no-check.png';

  constructor(
    private storageService: LocalStorageService,
    private dialogService: DialogsService
  ) { }

  getAllAnswersArray() {
    this.answers = this.storageService.getAllAnswers();
    const answersArr = [];
    if (this.answers) {
      const answersKeys = Object.keys(this.answers);
      for (const prop of answersKeys) {
        this.answers[prop]['id'] = prop.toString();
        answersArr.push(this.answers[prop]);
      }
    }
    this.answers = answersArr;
  }

  onOwnerClick(userName: string) {
    this.dialogService.openYesNoDialog(
      `Hello, ${userName}`,
      'Do you want to delete your answer?').subscribe(
        toDelete => {
          if (toDelete) {
            this.storageService.deletePrevUserAnswer();
            this.getAllAnswersArray();
          }
        }
    );
  }

  filterAnswers(searchText: string): void {
    if (searchText.length >= 4) {
      searchText = searchText.toLowerCase();
      this.answers = this.answers.filter( answer => answer['name'].toLowerCase().indexOf(searchText) >= 0);
    } else {
      this.getAllAnswersArray();
    }
  }

  ngOnInit() {
    this.getAllAnswersArray();
    this.user = this.storageService.getCurrentUserInfo();
  }

}
