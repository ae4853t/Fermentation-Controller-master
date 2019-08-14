import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pid-help-dialog',
  templateUrl: './pid-help-dialog.component.html',
  styleUrls: ['./pid-help-dialog.component.css']
})
export class PidHelpDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PidHelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
