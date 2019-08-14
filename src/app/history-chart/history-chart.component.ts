import { Component, OnInit, OnChanges} from '@angular/core';
import {ViewChild} from '@angular/core';
import {HostListener} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';
import {GoogleChartComponent} from 'ng2-google-charts';
import { ChartReadyEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit, OnChanges {
    @ViewChild('logChart', { static: false }) chart: GoogleChartComponent;
    tempFormat = localStorage.getItem('tempFormat');
    loading = true;
    data: any;
    columns = [];
    series = {};
    vAxisTitle = 'temp';
    constructor(private fb: FirebaseService) {
        this.fb.chart
        .subscribe(res => {
            this.data = res;
            this.updateChart();
            this.loading = false;
        });
    }

public historyChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: {
      cols: [
        {id: '1', label: 'Date', type: 'number'},
        {id: '2', label: 'Beer', type: 'number'},
        {id: '3', label: 'Chamber', type: 'number'}
      ],
      rows: [{c:[{v: 0},{v: 0},{v: 0} ]},
     ],
    },
    options: {
        title: 'Fermentation Log',
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
    // console.log('profile changessss');
}

ngOnInit() {
   // const tablecolumns = this.historyChart.component.wrapper.getDatatable().getNumberOfColumns();
    for (let i = 0; i < 4; i++) {
        this.columns.push(i);
        if (i > 0) {
            this.series[i - 1] = {};
        }
    }
}

public click (event: ChartSelectEvent) {
    const cchistoryChart = this.historyChart.component;
    const wwhistoryChart = cchistoryChart.wrapper;
    if (event.column > 0) {
        // if row is undefined, we clicked on the legend
        if (event.row === null) {
            const col = event.column;
            if (this.columns[col] === col) {
                // hide the data series
                this.columns[col] = {
                    label: wwhistoryChart.getDataTable().getColumnLabel(col),
                    type: wwhistoryChart.getDataTable().getColumnType(col),
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
            wwhistoryChart.setView({'columns': this.columns});
            wwhistoryChart.draw();
        }
    }
}


public updateChart () {
    console.log('data check',this.data);
    if (this.data.rows.length > 1){
        console.log('data length',this.data.rows.length);
        this.historyChart.dataTable = this.data;
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
        this.vAxisTitle = 'Temperature \xB0C';
        this.chart.wrapper.setOption('vAxis.title','Temperature \xB0C');
    }else {
        this.vAxisTitle = 'Temperature \xB0F';
        this.chart.wrapper.setOption('vAxis.title','Temperature \xB0F');
    }
     this.chart.draw();
}

}
