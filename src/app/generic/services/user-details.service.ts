import { Injectable } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "../../generic/httpClient.config";
import { Http } from "@angular/http";

@Injectable()
export class UserDetailsService {

  constructor(private httpClient: HttpClient, private http: Http) { }

  getUserDetails(): Observable<any> {
    return this.httpClient.getBase(`app/maintenance/users`).map((res: Response) => res.json());
  }

}
