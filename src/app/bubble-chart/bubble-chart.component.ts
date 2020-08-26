import { Component, OnInit, OnChanges} from '@angular/core';
import {ViewChild} from '@angular/core';
import {HostListener} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {PhotonData} from '../models/photon.data';
import { Observable, Subscription } from 'rxjs';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';
import {GoogleChartComponent} from 'ng2-google-charts';
import { ChartReadyEvent } from 'ng2-google-charts';
import * as math from 'mathjs';

@Component({
    selector: 'app-bubble-chart',
    templateUrl: './bubble-chart.component.html',
    styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, OnChanges{
    @ViewChild('logChart', { static: false }) chart: GoogleChartComponent;
    tempFormat = localStorage.getItem('tempFormat');
    loading = true;
    avg = 0.00;
 //   item: Observable<PhotonData>;
    bblavg: number;
    bblstd: number;
    bblcontrol: number;
    bblTotal: any;
    heating: any;
    totalruntime: any;
    heatper: any;
    coolper: any;
    offper: any;
    cooling: any;
    off: any;
    bblCurrent: any;
     data: any;
     item: Observable<PhotonData>;
     columns = [];
    series = {};
    vAxisTitle = 'temp';
    constructor(private fb: FirebaseService) {
        this.fb.chartbbl
        .subscribe(res => {
            this.data = res;
            this.updateChart();
            this.loading = false;
        });
     /*    this.fb.data.subscribe(res => {
              this.bblTotal = +res.bblttl;
           // this.loading = false;
          }); */
        };
    

public bubbleChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: {
      cols: [
        {id: '1', label: 'Date', type: 'number'},
        // {id: '2', label: 'Beer', type: 'number'},
        {id: '2', label: 'Bubble Rate', type: 'number'},
        {id: '3', label: 'Mode', type: 'number'}
  
      ],
      rows: [{c:[{v: 0},{v: 0},{v: 0} ]},
     ],
    },
    options: {
        title: 'Bubble Rate Log',
        series: this.series,
        async: true,
        explorer: { axis: 'horizontal',
            keepInBounds: true },
        hAxis: {
            title: 'Date',
            gridlines: {
                count: -1,
                units: {
                    days: {format: ['MMM dd']},
                    hours: {format: ['HH:mm', 'ha']},
                }
            },
            minorGridlines: {
                units: {
                    hours: {format: ['hh:mm:ss a', 'ha']},
                    minutes: {format: ['HH:mm a Z', ':mm']}
                }
            },
        },
        vAxis: { title: this.vAxisTitle},
        backgroundColor: '#F3F3F3',
        tooltip: {isHtml: true },
        colors: ['#0000FF', '#009900'],
        defaultColors: ['#0000FF', '#009900']
    },
};

ngOnChanges() {
    this.updateChart();
    // this.averagebblrate();
    // console.log('profile changessss');
}

ngOnInit() {
   // const tablecolumns = this.bubbleChart.component.wrapper.getDatatable().getNumberOfColumns();
    for (let i = 0; i < 4; i++) {
        this.columns.push(i);
        if (i > 0) {
            this.series[i - 1] = {};
        };
        this.item = this.fb.data;
        this.item.subscribe(res => {
          if (res !== undefined) {
            this.bblTotal = +res.bblttl;
            this.bblCurrent = +res.bblrate;
          //  this.loading = false;
          }
        });

    console.log('ddata',this.bblTotal)
    
    // this.averagebblrate();
}}

public click (event: ChartSelectEvent) {
    const ccbubbleChart = this.bubbleChart.component;
    const wwbubbleChart = ccbubbleChart.wrapper;
    if (event.column > 0) {
        // if row is undefined, we clicked on the legend
        if (event.row === null) {
            const col = event.column;
            if (this.columns[col] === col) {
                // hide the data series
                this.columns[col] = {
                    label: wwbubbleChart.getDataTable().getColumnLabel(col),
                    type: wwbubbleChart.getDataTable().getColumnType(col),
                    calc: function () {
                        return null;
                    }
                };
                // grey out the legend entry
                this.series[col - 1].color = '#CCCCCC';
            } else {
                // show the data series
                this.columns[col] = col;
                this.series[col - 1].color = null;
            }
            wwbubbleChart.setView({'columns': this.columns});
            wwbubbleChart.draw();
        }
    }
}
// // public averagebblrate() {
// //     var total = 0;
// //     for (let i = 0; i < this.data.rows.length; i++) {
// //      console.log(this.data.rows.length)
// //      total = total + this.data.rows[i].c[1]
// //      };
// //      var avg = 0
// //      avg = total / this.data.rows.length;
// //      console.log('avg',avg)
// //     return avg;

// }

public updateChart () {
    console.log('data check',this.data);
    if (this.data.rows.length > 1){
        console.log('data length',this.data.rows.length);
        this.bubbleChart.dataTable = this.data;
        // console.log('test value', this.data.rows[1].c[1]);
        var targetvalue = 0.00;
    for (let i = 0; i < this.data.rows.length; i++) {
    //  console.log(this.data.rows.length);
     targetvalue =  targetvalue + parseFloat(this.data.rows[i].c[1].v);
    // console.log('data', targetvalue)
    };

    //  console.log('total',targetvalue);
     this.avg =  (targetvalue / this.data.rows.length);
    //  console.log('avg',this.avg)
    this.historyStats () ;
    }
}

/*    bblAvg () {
        if (this.data.rows.length > 1){
 //           console.log('data length',this.data.rows.length);
   //         this.bubbleChart.dataTable = this.data;
            // console.log('test value', this.data.rows[1].c[1]);
            var targetvalue = 0.00;
        for (let i = 0; i < this.data.rows.length; i++) {
        //  console.log(this.data.rows.length);
         targetvalue =  targetvalue + parseFloat(this.data.rows[i].c[1].v);
        // console.log('data', targetvalue)
        };
    
        //  console.log('total',targetvalue);
         this.avg =  (targetvalue / this.data.rows.length);
        //  console.log('avg',this.avg)
    
        }
    }*/
    historyStats () {
        if (this.data.rows.length > 1){
            const hData = [];
            var targetvalue = 0.00;
//            var avgvalue = 0.00;
            var coolcount = 0;
            var heatcount = 0;
            var offcount = 0;
            var statecheck : any;
    
            for (let i = 0; i < this.data.rows.length; i++) {
            //  console.log(this.data.rows.length);
                targetvalue =  parseFloat(this.data.rows[i].c[1].v);
                hData.push(targetvalue);
                statecheck =  parseFloat(this.data.rows[i].c[2].v).toFixed(0);
                console.log ('state',statecheck);
                if( statecheck == 0){
                    offcount = offcount + 1;
                };
                if(statecheck == 1){
                    coolcount = coolcount +1
                };
                if (statecheck == 2) {
                     heatcount = heatcount +1                    
                };
    //            avgvalue = avgvalue + parseFloat(this.data.rows[i].c[1].v);
             //  console.log('hdata', targetvalue)
            };
            console.log('hdata', targetvalue)
            console.log('heat',heatcount);
            console.log('cool',coolcount);
            console.log('off',offcount);
           console.log('heat time',this.heating);
           this.cooling = coolcount * 10;
           this.off = offcount * 10;
           this.heating = heatcount * 10;
           this.totalruntime = (this.data.rows.length ) * 5 / 60;
           if (heatcount > 0){
            this.heatper = heatcount / (this.data.rows.length ) * 100
             };
            if (heatcount == 0) {
                this.heatper = 0
            };
            if (coolcount > 0){
                this.coolper = coolcount / (this.data.rows.length ) * 100
            };
            if (coolcount == 0) {
                    this.coolper = 0
            };
            if (offcount > 0){
                    this.offper = offcount / (this.data.rows.length ) * 100
                };
            if (offcount == 0) {
                        this.offper = 0
                };

        /*     this.coolper = this.cooling / (this.data.rows.length ) * 100
            this.offper = this.off / (this.data.rows.length ) * 100 */
            
            //       this.beeravg =  (targetvalue / this.data.rows.length);
       //       console.log('avg',this.beeravg);
             this.bblavg = math.mean(hData);
             this.bblstd = math.std(hData);
             this.bblcontrol = this.bblstd * 2;
             console.log('bbld', hData)
       //      console.log('bavg',this.hData);
             targetvalue = 0.00;
         //    const hData2 = [];
     
  /*           for (let i = 0; i < this.data.rows.length; i++) {
            //  console.log(this.data.rows.length);
             targetvalue =  parseFloat(this.data.rows[i].c[2].v);
             hData2.push(targetvalue);
             
             //  console.log('data', targetvalue)
            };
        
            //  console.log('total',targetvalue);
             this.fridgeavg =  math.mean(hData2);
             this.fridgestd = math.std(hData2);
             this.fridgecontrol = this.fridgestd * 2;
    
    //          console.log('avg',this.fridgeavg)*/
            
        }
    }
    
@HostListener('window:resize', ['$event'])
    onWindowResize(event: any) {
    // console.log(event.target.innerWidth);
    // Make sure you don't call redraw() in ngOnInit()
    //   - chart would not be initialised by that time, and
    //   - this would cause chart being drawn twice
    this.chart.draw();
}

public readyOneTime(event: ChartReadyEvent) {
    if (this.tempFormat === 'C') {
        this.vAxisTitle = 'Bubble Count (BPM)';
        this.chart.wrapper.setOption('vAxis.title','Bubble Count (BPM)');
    }else {
        this.vAxisTitle = 'Bubble Count (BPM)';
        this.chart.wrapper.setOption('vAxis.title','Bubble Count (BPM)');
    }
     this.chart.draw();
}

}
