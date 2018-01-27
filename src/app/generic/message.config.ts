import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageConfig {

    private message:Object = null;
    private error:  Object = null;
    private titles:  Object = null;

    constructor(private http: Http) { }

    public getMessage(key: any) {
        return this.message[key];
    }

    public getErrorMessage(key: any) {
        let returnMessage = this.error[key];
        if(!returnMessage) returnMessage = key;
        return returnMessage;
    }

     public getTitleMessage(key: any) {
        return this.titles[key];
    }

    /**
     * This method:
     *   a) Loads "message.json" to  variable message
     *   b) Loads "errorMessage.json" to variable error
     */
    public load() {
        this.http.get('assets/properties/messages/messages.json').map( res => res.json() )
        .catch((error: any) => {
            console.error('Error reading message configuration file');
            return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((responseData) => {
            this.message = responseData;
        });

        this.http.get('assets/properties/messages/errorMessages.json').map( res => res.json() )
        .catch((error: any) => {
            console.error('Error reading error message configuration file');
            return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((responseData) => {
            this.error = responseData;
        });

        this.http.get('assets/properties/messages/titles.json').map( res => res.json() )
        .catch((error: any) => {
            console.error('Error reading message configuration file');
            return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((responseData) => {
            this.titles = responseData;
        });
    }
}