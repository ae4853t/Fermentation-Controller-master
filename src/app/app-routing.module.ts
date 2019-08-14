import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SetupComponent } from './setup/setup.component';
import { HistoryChartComponent } from './history-chart/history-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main',  component: MainComponent },
  { path: 'setup',  component: SetupComponent },
  { path: 'app-history-chart',  component: HistoryChartComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
