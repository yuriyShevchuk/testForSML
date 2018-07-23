import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider
} from 'angular-6-social-login-v2';
import { getAuthServiceConfigs } from './login-config';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MyAnswerComponent } from './my-answer/my-answer.component';
import { AllAnswersComponent } from './all-answers/all-answers.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { OkDialogComponent } from './dialogs/ok-dialog/ok-dialog.component';
import { YesNoDialogComponent } from './dialogs/yes-no-dialog/yes-no-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyAnswerComponent,
    AllAnswersComponent,
    OkDialogComponent,
    YesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocialLoginModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [OkDialogComponent, YesNoDialogComponent]
})
export class AppModule { }
