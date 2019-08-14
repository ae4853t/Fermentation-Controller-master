import { Observable } from 'rxjs';
import { LoginDialogComponent } from '..//login-dialog/login-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Injectable } from '@angular/core';




@Injectable()
export class DialogsService {
    constructor(private dialog: MatDialog) { }
    public login(): Observable<any> {
        let dialogRef: MatDialogRef<LoginDialogComponent>;
        dialogRef = this.dialog.open(LoginDialogComponent);
        return dialogRef.afterClosed();
    }
}
