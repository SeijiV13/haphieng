import { HttpClient } from './../generic/httpClient.config';
import { Injectable } from '@angular/core';

@Injectable()
export class TransferringService {

  constructor(private httpClient: HttpClient) { }
  getTransfers(){
    return this.httpClient.getBase(`/api/v1/haphieng/stock_transfers`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredTransfers(refNo, customer, page, status){
    return this.httpClient.getBase(`/api/v1/haphieng/stock_transfers?page=${page}&filters%5Breference_number=${refNo}&filters%5Bstatus=${status}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getFilteredTransfersWithoutPage(refNo){
    return this.httpClient.getBase(`/api/v1/haphieng/stock_transfers?&filters%5Breference_number=${refNo}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }


  getSuspendedTransfers(){
    return this.httpClient.getBase(`/api/v1/haphieng/stock_transfers?filters%5Bstatus=suspend`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPostedTransfers(){
    return this.httpClient.getBase(`/api/v1/haphieng/stock_transfers?filters%5Bstatus=posted`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getTransfer(id){
    return this.httpClient.getBase(`/api/v1/haphieng/stock_transfers/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  createTransfer(body){
    return this.httpClient.postBase(`/api/v1/haphieng/stock_transfers`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  editTransfer(id, body){
    return this.httpClient.putBase(`/api/v1/haphieng/stock_transfers/${id}`, body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getTransferHistory(customer, product){
    return this.httpClient.getBase(`/api/v1/haphieng/product_stock_transfers?filters%5Bcustomer_id=${customer}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

}
