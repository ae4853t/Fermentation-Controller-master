import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-temp-dialog',
  templateUrl: './change-temp-dialog.component.html',
  styleUrls: ['./change-temp-dialog.component.css']
})
export class ChangeTempDialogComponent implements OnInit {

 
  constructor(
    public dialogRef: MatDialogRef<ChangeTempDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}