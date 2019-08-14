import { Component, OnInit } from '@angular/core';
import { ParticleService } from '../services/particle.service';
import {FirebaseService} from '../services/firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PidHelpDialogComponent } from '../pid-help-dialog/pid-help-dialog.component';

export class SettingData {
  Kp: string;
  Ki: string;
  Kd: string;
  hKp: string;
  hKi: string;
  hKd: string;
  output: string;
  hOutput: string;
  mainMode: string;
  heatMode: string;
}

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  settingData: SettingData;
  userTempPreference: string;
  tempFormat: string;
  constructor( private fbService: FirebaseService, private particleService: ParticleService, public dialog: MatDialog) {}


  ngOnInit() {
  this.tempFormat = localStorage.getItem('tempFormat');
  this.userTempPreference = localStorage.getItem('tempFormat');
  this.particleService.GetVariable('PIDsetting') 
      .subscribe(res => {
        console.log('setting var read', res);
        this.settingData = res;
        if (this.tempFormat === 'F') {
          console.log('setting var output', this.settingData.output);
          this.settingData.output = (parseFloat(this.settingData.output) * 1.8 + 32).toFixed(2);
          console.log('setting var output mod', this.settingData.output);
      }
        console.log('setting response', this.settingData);
      }
      );
}

openDialog() {
  const dialogRef = this.dialog.open(PidHelpDialogComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


setPIDButtonHandler() {
  console.log('PID setting response', this.settingData);
  let PIDString = '';
  PIDString = this.settingData.Kp + ',';
  PIDString += this.settingData.Ki + ',';
  PIDString += this.settingData.Kd + ',';
  PIDString += this.settingData.hKp + ',';
  PIDString += this.settingData.hKi + ',';
  PIDString += this.settingData.hKd + ',';
  console.log('PID setting string', PIDString);
  this.particleService.CallFunction('PIDSetup', PIDString).subscribe(
    res => console.log('pid man res', res));
}


ManualPIDButtonHandler() {
  console.log('PID Mode response', this.settingData);

  let PIDString = '';
  PIDString = this.settingData.mainMode + ',';
  PIDString += this.settingData.heatMode + ',';
  if (this.tempFormat === 'F') {
    const output = ((parseFloat(this.settingData.output) - 32) / 1.8).toFixed(2);
    PIDString += output + ',';
  }else {
    PIDString += this.settingData.output + ',';
  }
  PIDString += this.settingData.hOutput + ',';
  console.log('PID setting string', PIDString);
  this.particleService.CallFunction('PIDSetMode', PIDString).subscribe(
    res => console.log('pid man res', res));
}

tempChange(event: { value: string; }) {
  console.log('tempchange', event.value);
  localStorage.setItem('tempFormat', event.value);
}

}
