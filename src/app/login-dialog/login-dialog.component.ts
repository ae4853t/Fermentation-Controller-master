import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ParticleService } from '../services/particle.service';
import {FirebaseService} from '../services/firebase.service';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'login-dialog',
    templateUrl: './login-dialog.component.html',
    styles: [`
        .head {
      background-color : #ffc4c4;
        }`
    ]
})
export class LoginDialogComponent implements OnInit{
    public devices: string[];
    selectedDevice: string;
    loginSuccess = false;

    constructor(private fbService: FirebaseService,
        private particleService: ParticleService,
        public dialogRef: MatDialogRef<LoginDialogComponent>) {}

    login(form: { username: any; password: any; }) {
        let username = form.username;
        username = username.trim();
        const password = form.password;
        this.particleService.Login(username, password)
            .subscribe(
            res => {
                const deviceCheck = localStorage.getItem('Device');
                this.loginSuccess = true;
                this.selectedDevice = 'Click to Select Device';
                this.particleService.ListDevices()
                    .subscribe(res => this.devices = res);
            },
            err => {
                console.log('login failed', err);
                alert('Login Failed: ' + err);
                }
            );

    }
   ngOnInit() {
       const deviceCheck = localStorage.getItem('Device');
       if (deviceCheck === null){
         this.selectedDevice = 'Click to Select Device';
       } else {
           this.selectedDevice = localStorage.getItem('Device');
       }
    }

    onChange(value: string) {
        console.log('devisce change');
        this.particleService.NewDevice(value);
        this.dialogRef.close();
    }

  }

