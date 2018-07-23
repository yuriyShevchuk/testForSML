import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyAnswerComponent} from './my-answer/my-answer.component';
import {AllAnswersComponent} from './all-answers/all-answers.component';

const routes: Routes = [
  {path: '', redirectTo: '/my-answer', pathMatch: 'full'},
  { path: 'my-answer', component: MyAnswerComponent },
  { path: 'all-answers', component: AllAnswersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
