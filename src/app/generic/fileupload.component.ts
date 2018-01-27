import { Component, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import {InitService} from './init.config';

const headers = new Headers();
headers.append('Content-Type', 'multipart/form-data');
const args:RequestOptionsArgs = {headers:headers};
@Component({
    selector: 'file-upload',
    template: `
    <input type="text">
    <input type="file" (change)="upload($event)">
    `
})
export class FileUploadComponent {
    private baseUrl : string
    constructor(private http: Http, private el: ElementRef, private _init : InitService) {
        this.baseUrl = _init.getConfig('host');
    }
   

    upload2() {
        /*
         for (var key in this.el.nativeElement) {
            alert("key: " + key + " - value: " + this.el.nativeElement[key]);  
        }*/
        let inputEl = this.el.nativeElement.firstElementChild;
        if (inputEl.files.length > 0) { // a file was selected
            let file:FileList = inputEl.files[0];
            this.http
                .post('http://your.upload.url', file)
                // do whatever you do...
                // subscribe to observable to listen for response
        }
    }

    upload($event) {
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    const formData = new FormData();
    formData.append('fileName', "boom");
    formData.append('file', file);
    this.http.post( this.baseUrl + "/setUpload.htm", formData, args).subscribe(res => {res.json()});
    }
}