import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { PhotonData } from '../models/photon.data';

@Injectable()
export class FirebaseService {
    private _photonData: BehaviorSubject<PhotonData>;
    private dataStore: {  // This is where we will store our data in memory
        photonData: PhotonData
    };

    private photonData: PhotonData;
    private afPhoton: Observable<any>;

    private tempFormat: string;

    constructor(public af: AngularFireDatabase) {
        this.tempFormat = localStorage.getItem('tempFormat');
        this.dataStore = { photonData: this.photonData };
        this._photonData = <BehaviorSubject<PhotonData>>new BehaviorSubject(this.photonData);
        this.init();
    }

    init() {
        // let tempFormat = localStorage.getItem('tempFormat');
        this.afPhoton = this.af.object('/Photon/data').valueChanges();
        this.afPhoton.subscribe(res => {
            this.dataStore.photonData = res;
            this.ConfigureData();
            setInterval(() => { this.timeUpdate(this.dataStore.photonData.stateStartTime); }, 1000, 1000);
        });
    }





    updateRow(profile: string, key: string, item: object) {
        const items = this.af.list('/Profile/' + profile);
        // to get a key, check the Example app below
        console.log('row update', key, item);
        items.update(key, item);
    }

    addRow(profile: string, item: object) {
        const items = this.af.list('/Profile/' + profile);
        items.push(item);
    }

    deleteRow(profile: string, key: string) {
        const items = this.af.list('/Profile/' + profile);
        items.remove(key);
    }

    deleteList(list: string) {
        const items = this.af.list('/' + list);
        items.remove();
    }

    createNewProfile(name: string) {
        console.log('profile passed to service', name);
        const items = this.af.list('/Profile/' + name);
        items.push({ day: 0, temperature: 0 });
    }

    get profileList() {
        return this.af.list('/Profile', ref => ref.orderByKey()).snapshotChanges();
        // .pipe(map(changes => {
        // return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }
    // ));
    // }
    get charttest() {
        // last 1008 is to limit to 7 days of history each sample is 10 minutes.  If the list is too long performance is very bad.
        return this.af.list<PhotonData>('/TemperatureData', ref => ref.limitToLast(500))
        .valueChanges().pipe(map(changes => {
            const rows = changes.map(ch => {
               // console.log('chart data value change', ch);
                let mode = ch.currentState;
                if (mode === '0') mode = 'Off';
                if (mode === '1') mode = 'Cool';
                if (mode === '2') mode = 'Heat';
                const options = {
                    month: 'short',
                    day: 'numeric', hour: '2-digit', minute: '2-digit'
                };
                const toolTipDate = new Date(ch.ts).toLocaleDateString('en-US', options);
                if (this.tempFormat === 'C') {
                    const temp = {
                        c: [
                            { v: new Date(ch.ts) },
                            { v: parseFloat(ch.beerTemp).toFixed(2) },
                            { v: parseFloat(ch.chamberTemp).toFixed(2) },
                            { v: this.customToolTip(toolTipDate, parseFloat(ch.chamberTemp).toFixed(2), mode) }
                        ]
                    };
                    return temp;
                } else {
                    const temp = {
                        c: [{ v: new Date(ch.ts) },
                        { v: (parseFloat(ch.beerTemp) * 1.8 + 32).toFixed(2) },
                        { v: (parseFloat(ch.chamberTemp) * 1.8 + 32).toFixed(2) },
                        { v: this.customToolTip(toolTipDate, (parseFloat(ch.chamberTemp) * 1.8 + 32).toFixed(2), mode) }
                        ]
                    };
                    return temp;
                }
            });
            return {
                cols: [
                    { id: '1', label: 'Date', type: 'date' },
                    { id: '2', label: 'Beer', type: 'number' },
                    { id: '3', label: 'Chamber', type: 'number' },
                    { id: '4', label: 'Tooltip', type: 'string', role: 'tooltip', p: { 'html': true } },
                ],
                rows: rows
            };
        }));
    }


    get chart() {
        // last 1008 is to limit to 7 days of history each sample is 10 minutes.  If the list is too long performance is very bad.
        return this.af.list<PhotonData>('/TemperatureData', ref => ref.limitToLast(300)).snapshotChanges().pipe(map(changes => {
            const rows = changes.map(ch => {
              //  console.log('chart data', ch.payload.val());
                let mode = ch.payload.val().currentState;
                if (mode === '0') mode = 'Off';
                if (mode === '1') mode = 'Cool';
                if (mode === '2') mode = 'Heat';
                const options = {
                    month: 'short',
                    day: 'numeric', hour: '2-digit', minute: '2-digit'
                };
                const toolTipDate = new Date(ch.payload.val().ts).toLocaleDateString('en-US', options);
                if (this.tempFormat === 'C') {
                    const temp = {
                        c: [
                            { v: new Date(ch.payload.val().ts) },
                            { v: parseFloat(ch.payload.val().beerTemp).toFixed(2), mode },
                            { v: parseFloat(ch.payload.val().chamberTemp).toFixed(2) },
                            { v: this.customToolTip(toolTipDate, parseFloat(ch.payload.val().chamberTemp).toFixed(2), mode) }
                        ]
                    };
                    return temp;
                } else {
                    const temp = {
                        c: [{ v: new Date(ch.payload.val().ts) },
                        { v: +((parseFloat(ch.payload.val().beerTemp) * 1.8 + 32).toFixed(2)) },
                        { v: +((parseFloat(ch.payload.val().chamberTemp) * 1.8 + 32).toFixed(2)) },
                        { v: this.customToolTip(toolTipDate, (parseFloat(ch.payload.val().chamberTemp) * 1.8 + 32).toFixed(2), mode) }
                        ]
                    };
                    return temp;
                }
            });
            return {
                cols: [
                    { id: '1', label: 'Date', type: 'date' },
                    { id: '2', label: 'Beer', type: 'number' },
                    { id: '3', label: 'Chamber', type: 'number' },
                    { id: '4', label: 'Tooltip', type: 'string', role: 'tooltip', p: { 'html': true } },
                ],
                rows: rows
            };
        }));
    }
    customToolTip(dates, temp, mode) {
        return '<div style="padding:5px 5px 5px 5px;">'
            + dates
            + '<br>'
            + 'Chamber: '
            + temp
            + '<br>'
            + 'State: '
            + mode
            + '</div>';
    }

    table($key: string) {
        return this.af.list('/Profile/' + $key, ref => ref.orderByChild('day')).snapshotChanges()
            .pipe(map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            }
            ));
    }


    get data() {
        return this._photonData.asObservable();
    }

    timeUpdate(Time: string) {
        const currentTime = Date.now();
        let startTime = +Time;
        startTime *= 1000;
        let d = new Date(currentTime - (startTime - 10000));
        if (+d < 0) {
            d = new Date(0);
        }
        // Hours part from the timestamp
        const hours = '0' + d.getUTCHours();
        // Minutes part from the timestamp
        const minutes = '0' + d.getMinutes();
        // Seconds part from the timestamp
        const seconds = '0' + d.getSeconds();

        // Will display time in 10:30:23 format
        const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        this.dataStore.photonData.stateTime = ((d.getTime() / 8.64e+7).toFixed(0) + ' Days' + ' ' + formattedTime + ' Hours');
        this._photonData.next(Object.assign({}, this.dataStore).photonData);
    }


    ConfigureData() {
        switch (this.dataStore.photonData.currentState) {
            case '0': {
                if (this.dataStore.photonData.pastState === '1') {
                    this.dataStore.photonData.currentState = 'Wait for Peak';
                } else {
                    this.dataStore.photonData.currentState = 'Idle';
                }
            }
                break;
            case '1': {
                this.dataStore.photonData.currentState = 'Cool';
            }
                break;
            case '2': {
                this.dataStore.photonData.currentState = 'Heat';
            }
                break;
            default:
                this.dataStore.photonData.currentState = 'Error';
        }

        const beerTemp = parseFloat(this.dataStore.photonData.beerTemp);
        const fridgeTemp = parseFloat(this.dataStore.photonData.fridgeTemp);
        const fridgeTarget = parseFloat(this.dataStore.photonData.fridgeTarget);
        const targetTemp = parseFloat(this.dataStore.photonData.targetTemp);
        const tempFormat = localStorage.getItem('tempFormat');
        if (tempFormat === 'C') {
            this.dataStore.photonData.beerTemp = (beerTemp.toFixed(1).toString() + ' \xB0C');
            this.dataStore.photonData.fridgeTemp = (fridgeTemp.toFixed(1).toString() + ' \xB0C');
            this.dataStore.photonData.fridgeTarget = (fridgeTarget.toFixed(1).toString() + ' \xB0C');
            this.dataStore.photonData.targetTemp = (targetTemp.toFixed(1).toString() + ' \xB0C');
        } else {
            this.dataStore.photonData.beerTemp = (((beerTemp * 1.8 + 32).toFixed(1)).toString() + ' \xB0F');
            this.dataStore.photonData.fridgeTemp = (((fridgeTemp * 1.8 + 32).toFixed(1)).toString() + ' \xB0F');
            this.dataStore.photonData.fridgeTarget = (((fridgeTarget * 1.8 + 32).toFixed(1)).toString() + ' \xB0F');
            this.dataStore.photonData.targetTemp = (((targetTemp * 1.8 + 32).toFixed(1)).toString() + ' \xB0F');
        }
    }
}
