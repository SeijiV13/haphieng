import { Http, Response } from '@angular/http';
import { AuthGuard } from './../../guards/auth.guard';
import { HttpClient } from './../../httpClient.config';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private http: Http) { }

  login(email, password){
     return this.httpClient.postBaseLogin(`/auth/sign_in?email=${email}&password=${password}`, "").map((res: Response)=> res);
  }
  

}
