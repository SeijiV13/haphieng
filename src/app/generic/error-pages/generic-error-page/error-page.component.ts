import { Component, OnInit } from '@angular/core';
import { CookieService} from 'ngx-cookie';
import { AuthenticateService } from "../../../login/loginService/authenticate.service";
import * as $ from 'jquery';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
  providers:[AuthenticateService]
})
export class ErrorPageComponent implements OnInit {
  nextPageInd:string;
  loginPressed:boolean = false;
  message:string = "Oops! Something went wrong.";
  constructor(private authenticate: AuthenticateService, private cookieService: CookieService) { 

    if(localStorage.getItem("redirectLogin") == "true"){
      this.nextPageInd = "Login";
      localStorage.removeItem("redirectLogin");
    } 
    else if(this.cookieService && this.cookieService.get("token") && this.cookieService.get("token").toString().length > 0)
      this.nextPageInd = "Home";    
    else 
      this.nextPageInd = "Login";
    
    if(localStorage.getItem("errorMessage")){
        this.message = localStorage.getItem("errorMessage");
        localStorage.removeItem("errorMessage")
    }
  }

  logout(){
    if(this.cookieService.get("token") &&
        this.cookieService.get("usrid")){
      this.loginPressed = true;
      var usrid = this.cookieService.get("usrid");
      this.authenticate.remoteLogout(usrid).subscribe(
        (data) => {
        this.cookieService.remove("token");
        },(error) => {/**console.log(error.text());**/},
        ()=>{ window.location.replace('/'); }
      );
    }
    window.location.replace('/');
  }

  ngOnInit() {
    $(window).resize();
  }
}
