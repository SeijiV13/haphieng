import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { CookieService} from 'ngx-cookie';
import { Router } from '@angular/router';
import { MessageConfig } from "../message.config";
@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  private router: Router;
  private errMes: MessageConfig;

  constructor(private injector: Injector, private cookieService: CookieService) {
    super(true);
    setTimeout(() => {
      this.router = <Router>this.injector.get(Router);
      this.errMes = <MessageConfig>this.injector.get(MessageConfig);
    }, 500);
  }

  handleError(error) {

    console.log(error);
    if (error && error.type == "ERROR") {
      localStorage.setItem("errorMessage", error.message);
    }
    if (this.cookieService && this.cookieService.get("token")) this.router.navigate(['/home/error']);
    else this.router.navigate(['/error']);

    /*else if(localStorage.getItem("errorMessage")){
      redirect = true;
    }
    if(redirect){
      if(Cookie && Cookie.get("token")) this.router.navigate(['/home/error']);
      else  this.router.navigate(['/error']);
    }*/
  }
}

@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    }
  ]
})
export class ErrorHandlerModule { }