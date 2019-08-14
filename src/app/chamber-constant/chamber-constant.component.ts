import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeTempDialogComponent } from '../change-temp-dialog/change-temp-dialog.component';

@Component({
  selector: 'app-chamber-constant',
  templateUrl: './chamber-constant.component.html',
  styleUrls: ['./chamber-constant.component.scss']
})
export class ChamberConstantComponent implements OnInit {
  @Input() item: any;
  @Output() changeTemp = new EventEmitter();
  temperature: string;
  constructor(public dialog: MatDialog) {}

  callParent(arg: string) {
    this.changeTemp.next(arg);
  }

  openDialog() {
    console.log('item test', this.temperature);
    const dialogRef = this.dialog.open(ChangeTempDialogComponent, {
      width: '250px',
      data: { temperature: this.temperature }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.temperature = result;
      console.log('The dialog was closed', this.temperature);
      if (this.temperature !== '') {
        console.log('if passed', this.temperature);
        this.callParent(this.temperature);
      }
    });
  }

  ngOnInit() {
  }

}

