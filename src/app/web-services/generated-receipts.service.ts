import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';

@Injectable()
export class GeneratedReceiptsService {

  constructor(private httpClient: HttpClient) { }


  getGeneratedSales(){
    return this.httpClient.getBase(`/api/v1/haphieng/generated_sales`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

}
