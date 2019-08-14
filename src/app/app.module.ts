import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {Ng2GoogleChartsModule } from 'ng2-google-charts';

import { FirebaseService } from './services/firebase.service';
import { ParticleService } from './services/particle.service';
import { DialogsService } from './services/dialogs.service';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SetupComponent } from './setup/setup.component';
import { BeerConstantComponent } from './beerconstant/beerconstant.component';
import { ChangeTempDialogComponent } from './change-temp-dialog/change-temp-dialog.component';
import { ChamberConstantComponent } from './chamber-constant/chamber-constant.component';
import { OffComponent } from './off/off.component';
import { BeerProfileComponent } from './beer-profile/beer-profile.component';
import { ProfileChartComponent } from './profile-chart/profile-chart.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { HistoryChartComponent } from './history-chart/history-chart.component';
import { TabChangeDialogComponent } from './tab-change-dialog/tab-change-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PidHelpDialogComponent } from './pid-help-dialog/pid-help-dialog.component';
import { fireBaseConfig } from '../environments/firebase.config';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginDialogComponent,
    SetupComponent,
    BeerConstantComponent,
    ChangeTempDialogComponent,
    ChamberConstantComponent,
    OffComponent,
    BeerProfileComponent,
    ProfileChartComponent,
    ProfileDialogComponent,
    HistoryChartComponent,
    TabChangeDialogComponent,
    PidHelpDialogComponent,


  ],
  imports: [
    Ng2GoogleChartsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MaterialModule

  ],


  providers: [
    FirebaseService,
    ParticleService,
    DialogsService
  ],
  entryComponents: [
    LoginDialogComponent,
    ChangeTempDialogComponent,
    ProfileDialogComponent,
    TabChangeDialogComponent,
    PidHelpDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
