import { Component, OnInit, Input, ViewChild, Inject} from '@angular/core';
import { ParticleService } from '../services/particle.service';
// import {DialogsService} from '../services/dialogs.service';
import {FirebaseService} from '../services/firebase.service';
import {PhotonData} from '../models/photon.data';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TabChangeDialogComponent } from '../tab-change-dialog/tab-change-dialog.component';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {

  loadedCharacter: '';
  // fridgeTemp: "";
  subdata: '';
  funcres: '';
  devices = [];
  loading = true;
  currentMode = 0;
  lastTab = 0;
  // data:PhotonData | null;
  // curmode:string;
  item: Observable<PhotonData>;
 // temp: any;
  // itemSub : Subscription;
  @ViewChild('modeTab', { static: false }) modeTab;

constructor(private fbService: FirebaseService, private particleService: ParticleService, public dialog: MatDialog) {

  }



ngOnInit() {
  this.item = this.fbService.data;
  this.item.subscribe(res => {
    if (res !== undefined) {
      this.currentMode = +res.mode;
      this.loading = false;
    }
  });
}



onChange(newMode: number) {
  console.log('tab change newmode/currentmode', newMode, this.currentMode);
  if (newMode === this.currentMode) return;  // do nothing if attempting to change to currentMode.
  if (newMode === 0) {
    this.fbService.deleteList('TemperatureData');
    console.log('delete history');
  }
  if (this.currentMode !== 3) {
    if (newMode !== 3) {  // don't call particle function on mode 3 entry as it will be handled by the start of a profile.
      const arg = newMode.toString();
      this.particleService.CallFunction('setMode', arg)
      .subscribe(res => {console.log('function call response', res);
      console.log('function call response current tab', this.currentMode); });
    }
    return;
  }


  const lastTab = this.currentMode;
  this.currentMode = newMode;
  const dialogRef = this.dialog.open(TabChangeDialogComponent, {
    width: '250px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('dialog closed', result);
    const arg = newMode.toString();
    if (result === true) {

      if (arg === '0') {
        this.fbService.deleteList('TemperatureData');
        console.log('delete history');
      }
      console.log('tabchange test curretn tab', this.currentMode);
      if (arg === '3') {   // if the newMode is profile do not call the particle function.  This will be handled in the profile component.
        return;
      }
      this.particleService.CallFunction('setMode', arg)
        .subscribe(res => {console.log('function call response', res);
        console.log('function call response current tab', this.currentMode); });
      }else {
        console.log('cancel', this.currentMode, lastTab);
        this.currentMode = lastTab;
      }
  });
}





  CallFunction(arg: string) {
    console.log('callfunction', arg);
    if (localStorage.getItem('tempFormat') === 'F') {
      let Ftemp = +arg;
      Ftemp = (Ftemp - 32) / 1.8;
      arg = Ftemp.toString();
    }

    this.particleService.CallFunction('setSetpoint', arg)
      .subscribe(res => {this.funcres = res;
      console.log('function call response', res); });
  }
/*
  GetVariable() {
    this.particleService.GetVariable('fridgeTemp')
      .subscribe(res => this.fridgeTemp = res);
  }
*/
  ListDevices() {

    this.particleService.ListDevices()
      .subscribe(devices => this.devices = devices);
  }
}





