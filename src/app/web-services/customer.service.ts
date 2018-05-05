import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/customers`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 getCustomer(id){
   return this.httpClient.getBase(`/api/v1/haphieng/customers/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 createCustomer(agent){
    return this.httpClient.postBase(`/api/v1/haphieng/customers`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 editCustomer(agent, id){
   return this.httpClient.putBase(`/api/v1/haphieng/customers/${id}`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError)
 }

 deleteCustomer(id){
   return this.httpClient.deleteBase(`/api/v1/haphieng/customers/${id}`).map(this.httpClient.handleMap);
 }

}

