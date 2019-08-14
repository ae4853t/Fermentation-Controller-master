import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Row} from '../models/row';


@Component({
  selector: 'app-profile-chart',
  templateUrl: './profile-chart.component.html',
  styleUrls: ['./profile-chart.component.css']
})

export class ProfileChartComponent implements OnInit, OnChanges {
  @Input() currentProfile: string;
  data: any[] = [];
  currentBeer: any;
  r: Row;
  rowCount = 4;
  constructor(private fb: FirebaseService) {

  }

  options = {title: this.currentProfile,
    hAxis: {title: 'Day', gridlines: {count: this.rowCount}},
    backgroundColor: '#F3F3F3',
  };

  lineChartData =  {
    chartType: 'LineChart',
    dataTable: [
      [{'number': 'Day'}, 'Temperature', 'current'],
      [0, 55, null], [5, 66, null], [8, 70, null], [4, null, 55]],
      options: {title: this.currentProfile,
        hAxis: {title: 'Day', gridlines: {count: this.rowCount}},
        backgroundColor: '#F3F3F3',
        seriesType: 'line',
        series: {1: {type: 'bars'}},
        bar: { groupWidth: 5 }
      },
  };
  /*
   dataTable: [
    ['Task', 'Hours per Day'],
    [1,     11],
    [2,      2],
    [3,  2],
    [4, 2],
    [5,    7]
  */
ngOnChanges() {
  if (this.currentProfile !== '') {
    this.updateChart();
    console.log('profile changessss', this.currentProfile);
  }
}

ngOnInit() {
  let day: number;
  this.fb.data.subscribe(res => {
  // console.log('day',res.mode);
  if (res.mode === '3') {
  // tslint:disable-next-line:radix
      day = (Date.now() - (parseInt(res.profileStartTime) * 1000)) / 86400000;
      this.currentBeer = [day, null, parseFloat(res.beerTemp)];
      this.updateChart();
    }else {
      day = 0;
      this.currentBeer = [day, null, parseFloat(res.beerTemp)];
    }
    // console.log('day',day);

  });
}
/*
{
  cols:[
    {id: '1', label: 'Date', type: 'date'},
    {id: '2', label: 'Beer', type: 'number'},
    {id: '3', label: 'Chamber', type: 'number'},
  ],
  rows:item,
}
item.beer={c:[{v: new Date(item.ts), f:'February 28, 2008'},
{v: parseFloat(item.beerTemp).toFixed(2)},
{v: parseFloat(item.chamberTemp).toFixed(2)}]};
*/

updateChart () {
  this.fb.table(this.currentProfile).subscribe(res => {
    this.data = [[{'number': 'Day'}, 'Temperature', 'Current']];
    res.forEach(element => {
     this.r = element;
     this.data.push([this.r.day, this.r.temperature, null]);
    });
    this.data.push(this.currentBeer);
    // this.data.push([4,null,55]);
    this.rowCount = this.data.length - 2;
    this.lineChartData =  {
      chartType: 'ComboChart',
      dataTable: this.data,
      options: {title: this.currentProfile,
        hAxis: {title: 'Day', gridlines: {count: this.data[this.rowCount][0]}},
        backgroundColor: '#F3F3F3',
        seriesType: 'line',
        series: {1: {type: 'bars'}},
        bar: { groupWidth: 5 }
      },
    };
  });


  const tempFormat = localStorage.getItem('tempFormat');
  if (tempFormat === 'C') {
    // this.yAxisLabel = 'Temperature \xB0C';
  }else {
    // this.yAxisLabel = 'Temperature \xB0F';
  }

}



}
