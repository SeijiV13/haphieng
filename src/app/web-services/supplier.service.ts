import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import { Observable} from 'rxjs';
@Injectable()
export class SupplierService {

  constructor(private httpClient: HttpClient) { }
filterSuppliers(code, description): Observable<any>{
  return this.httpClient.getBase(`/api/v1/haphieng/suppliers?filters%5Bcode=${code}&filters%5Bdescription=${description}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
}
getSuppliers(): Observable<any>{
    return this.httpClient.getBase(`/api/v1/haphieng/suppliers`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

getSupplier(id){
   return this.httpClient.getBase(`/api/v1/haphieng/suppliers/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 createSupplier(agent){
    return this.httpClient.postBase(`/api/v1/haphieng/suppliers`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

 editSupplier(agent, id){
   return this.httpClient.putBase(`/api/v1/haphieng/suppliers/${id}`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError)
 }

 deleteSupplier(id){
   return this.httpClient.deleteBase(`/api/v1/haphieng/suppliers/${id}`).map(this.httpClient.handleMap);
 }


}
