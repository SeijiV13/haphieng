import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from '../httpClient.config';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DropdownService } from '../services/dropdown.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PositiveFactorsResolver implements Resolve<any>{

    constructor(private http: HttpClient,
                private dropdownService: DropdownService) { }

    //Observable<any> | Promise<any> | any
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.dropdownService.getPositiveFactors();
    }
    
}
