import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';


// model
import {Row} from '../models/row';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {

  public row: Row;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {row: Row},
    private mdDialogRef: MatDialogRef<ProfileDialogComponent>
  ) {}

  ngOnInit() {
    this.row = this.data.row;
  }

}
