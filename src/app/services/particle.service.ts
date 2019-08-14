
import {catchError, map} from 'rxjs/operators';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';


export class ParticleLoginResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
  }

export class ParticleData {
    id: string;
    expires_in: number;
    name: string;
    result: string;
  }

@Injectable()
export class ParticleService {
    accessToken: string = localStorage.getItem('AccessToken');
    device: string = localStorage.getItem('Device');

constructor(private http: HttpClient) {}


URL = 'https://api.particle.io/oauth/token';
URLDevice = 'https://api.particle.io/v1/devices/';
URLSubscribe = 'https://api.particle.io/v1/devices/';


CheckLogin(): Observable<boolean> {
    const devices = [];
    let errorMessage = {};
    console.log('checklogin', this.accessToken, this.device);
    return  Observable.create(observer => {
            this.ListDevices()
                .subscribe(
                    devices => {observer.next(true);
                        console.log('checklogin true'); },
                    error =>  {errorMessage = error;
                        console.log('loginerror', errorMessage);
                        observer.next(false);
                    });
                    return () => {
                    observer.close();
                    };
            });
}

/*
// Function to supscribe to a Particle publish.  Currently not used in this app.
// Currently not working with Angular 6.

Subscribe(eventName:string): Observable<any> {
    let deviceId = this.device;
    let accessToken = this.accessToken;
    return Observable.create(observer => {
        const eventSource = new EventSource(this.URLSubscribe+deviceId+'/events/'+eventName+'?history_limit=30&access_token='+accessToken);
        eventSource.addEventListener("status", e => observer.next(JSON.parse(JSON.parse(e.data).data)));
        eventSource.onerror = x => observer.error(this.handleError);
        return () => {
            eventSource.close();
            };
        });

}
*/
// Function to get variable data from Particle.  Input var name.  Returns result as a JSON.
// Only works if the Particle Var is formated as a JSON string.
GetVariable(varname: string): Observable<any>  {
    const deviceId = this.device;
    const accessToken = this.accessToken;
    const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + accessToken)
        .set('content-type', `application/json`);
    return this.http.get<ParticleData>(this.URLDevice + deviceId + '/' + varname, {headers}).pipe(
    map(res => JSON.parse(res.result)
    ),
    catchError(this.handleError), );
}

// Funtion to call Particle Funciton.  Pass the funtion name and the argument as strings
// Returns the entire JSON response.
CallFunction(funcname: string, arg: string): Observable<any>  {
    const deviceId = this.device;
    const accessToken = this.accessToken;
    const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + accessToken)
        .set('content-type', `application/json`);
    const body = {args: arg};
    return this.http.post<ParticleData>(this.URLDevice + deviceId + '/' + funcname, body, {headers}).pipe(
        map(res =>
            res
        ),
        catchError(this.handleError), );
}

// Function to log the user into the particle device.
//  Pass in the username and password
//  saves the access token to local storage
Login(username: string, password: string): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('client_id', 'particle');
    urlSearchParams.append('client_secret', 'particle');
    urlSearchParams.append('expires_in', '7776000');
    const body = urlSearchParams.toString();
    return this.http.post<ParticleLoginResponse>(this.URL, body, httpOptions).pipe(
        map(res => {
            console.log('login res', res);
            localStorage.setItem('AccessToken', res.access_token);
            this.accessToken = localStorage.getItem('AccessToken');
            },
            err => this.handleError));

}
//  When a new device is selected the device name is stored to local storage
NewDevice(device: string) {
    localStorage.setItem('Device', device);
    this.device = localStorage.getItem('Device');
}

//  Returns an array of all devices registered to the current user.
ListDevices(): Observable<any> {
    const accessToken =  this.accessToken;
    const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + accessToken)
        .set('content-type', `application/json`);
    return this.http.get<ParticleData>(this.URLDevice, {headers}).pipe(
        map(res => {console.log('list devices called', res);
            const device = [];
            const body = res;
            // tslint:disable-next-line:forin
            for (const i in body) {
                device[i] = body[i].name;
            }
            return device; }),
        catchError(this.handleError), );
}

// Simple error handler that logs error information to the console.
private handleError (error: HttpErrorResponse) {
    if (error.error instanceof Error) {
        console.log('Client-side error occured.');
    } else {
        console.log('Server-side error occured.');
    }
    alert ('An error occured: ' + JSON.stringify(error.error.error));
    return observableThrowError(error.error);
}

// end
}
