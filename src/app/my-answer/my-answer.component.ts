import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {DialogsService} from '../services/dialogs.service';
import {Router} from '@angular/router';

const CHOICES_TO_GO = [
    {value: 0, name: 'Need to decide'},
    {value: 1, name: 'I will go'},
    {value: 2, name: 'I won\'t go'}
  ];

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css']
})
export class MyAnswerComponent implements OnInit {
  myName: string;
  choices = CHOICES_TO_GO;
  myChoice = 0;
  withMe: number;
  errors = [];
  user: any;

  constructor(
    private storageService: LocalStorageService,
    private dialogService: DialogsService,
    private router: Router
  ) { }

  setInitialData(): void {
    this.user = this.storageService.getCurrentUserInfo();
    this.myName = this.user['name'];
    const prevAnswer = this.storageService.getPrevUserAnswer();
    if (prevAnswer) {
      this.myChoice = prevAnswer['choice'];
      this.withMe = prevAnswer['with'];
    } else {
      this.myChoice = 0;
      this.withMe = 0;
    }
  }

  onSubmit(): void {
    if (this.myChoice == 0) {
      if (this.storageService.getPrevUserAnswer()) {
        this.storageService.deletePrevUserAnswer();
        this.setInitialData();
        this.dialogService.openOkDialog(
          'Excellent',
          'Your answer was deleted!',
          true
        );
        console.log('Your answer was deleted!!!');
        return;
      }
      this.dialogService.openOkDialog(
        'Error!',
        'Your answer was not counted! Fill up the form later, pls.',
        true
      );
      this.errors.push('Your answer was not counted... Fill up the form later, pls.');
      return;
    }

    this.errors = this.validateData();
    if (this.errors.length > 0) {
      console.log('there r errors in the form!!!!', this.errors);
      return;
    }

    let answers = this.storageService.getAllAnswers();
    if (!answers) { answers = {}; }
    answers[this.user['id']] = {
      name: this.myName,
      picture: this.user['fbImage'],
      with: this.withMe,
      choice: this.myChoice
    };
    this.storageService.saveAnswers(answers);
    this.dialogService.openOkDialog(
      'Excellent',
      'Your answer was accepted.',
      true);
    console.log('All answers after save: ', localStorage.getItem('answers'));
    this.router.navigate(['/all-answers']);
  }

  validateData(): string[] {
    const errors = [];
    if (this.myName === '') {
      errors.push('Name can not be blank!');
    }
    if (this.withMe && this.withMe < 0) {
      errors.push('Number of your friends should be 0 or bigger!');
    }
    return errors;
  }

  ngOnInit() {
    this.setInitialData();
  }

}
