import { Injectable } from '@angular/core';
import { HttpClient } from '../generic/httpClient.config';
import { Observable} from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable()
export class AgentService {
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
     }
   
   
   filterAgents(name, description, address, page){
    return this.httpClient.getBase(`/api/v1/haphieng/agents?page=${page}&filters%5Bname=${name}&filters%5Bdescription=${description}&filters%5Baddress=${address}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
   }
   getAgents(): Observable<any>{
      return this.httpClient.getBase(`/api/v1/haphieng/agents`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
   }

   getAgent(id){
     return this.httpClient.getBase(`/api/v1/haphieng/agents/${id}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
   }

   createAgent(agent){
      return this.httpClient.postBase(`/api/v1/haphieng/agents`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
   }

   editAgent(agent, id){
     return this.httpClient.putBase(`/api/v1/haphieng/agents/${id}`, agent).map(this.httpClient.handleMap).catch(this.httpClient.handleError)
   }

   deleteAgent(id){
     return this.httpClient.deleteBase(`/api/v1/haphieng/agents/${id}`).map(this.httpClient.handleMap);
   }

}
