import { HttpClient } from './../generic/httpClient.config';
import { Injectable } from '@angular/core';

@Injectable()
export class AdjustmentsService {

  constructor(private httpClient: HttpClient) { }
  getAdjustments(){
    return this.httpClient.getBase(`/api/v1/haphieng/quantity_adjustments`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredAdjustments(refNo, page, status){
    return this.httpClient.getBase(`/api/v1/haphieng/quantity_adjustments?page=${page}&filters%5Breference_number=${refNo}&filters%5Bstatus=${status}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredAdjustmentsWithoutPage(refNo){
    return this.httpClient.getBase(`/api/v1/haphieng/quantity_adjustments?&filters%5Breference_number=${refNo}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


  getSuspendedAdjustments(){
    return this.httpClient.getBase(`/api/v1/haphieng/quantity_adjustments?filters%5Bstatus=suspend`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPostedAdjustments(){
    return this.httpClient.getBase(`/api/v1/haphieng/quantity_adjustments?filters%5Bstatus=posted`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getAdjustment(id){
    return this.httpClient.getBase(`/api/v1/haphieng/quantity_adjustments/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  createAdjustment(body){
    return this.httpClient.postBase(`/api/v1/haphieng/quantity_adjustments`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  editAdjustment(id, body){
    return this.httpClient.putBase(`/api/v1/haphieng/quantity_adjustments/${id}`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getAdjustmentHistory(customer, product){
    return this.httpClient.getBase(`/api/v1/haphieng/product_quantity_adjustments?filters%5Bcustomer_id=${customer}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


}
