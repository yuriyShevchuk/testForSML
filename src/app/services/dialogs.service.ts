import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {YesNoDialogComponent} from '../dialogs/yes-no-dialog/yes-no-dialog.component';
import {OkDialogComponent} from '../dialogs/ok-dialog/ok-dialog.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  dialogAnswer: boolean;

  constructor(private dialog: MatDialog) { }

  openOkDialog(title, message, closeOnNav) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.closeOnNavigation = closeOnNav;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      message: message
    };
    this.dialog.open(OkDialogComponent, dialogConfig);
  }

  openYesNoDialog(title, message): Observable<boolean> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      message: message
    };

    const dialogRef = this.dialog.open(YesNoDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }
}
