import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeTempDialogComponent } from '../change-temp-dialog/change-temp-dialog.component';
import {PhotonData} from '..//models/photon.data';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-beer-constant',
  templateUrl: './beerconstant.component.html',
  styleUrls: ['./beerconstant.component.scss']
})
export class BeerConstantComponent implements OnInit {
  @Input() item: Observable<PhotonData>;
  @Output() changeTemp = new EventEmitter();
  temperature: string;
  constructor(public dialog: MatDialog) {}

  callParent(arg: string) {
    this.changeTemp.next(arg);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChangeTempDialogComponent, {
      width: '250px',
      data: { temperature: this.temperature }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.temperature = result;
      if (this.temperature !== '') {
        this.callParent(this.temperature);
      }
    });
  }

  ngOnInit() {
  }

}


