import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService} from 'ngx-cookie';
import { HeaderComponent } from '../../../header/header.component';
import { Router} from "@angular/router";
@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  providers: [HeaderComponent]
})
export class PageNotFoundComponent implements OnInit {
  nextPageInd: string = "Login";
  constructor(private header: HeaderComponent, private cookieService: CookieService, private router: Router) {
    if (this.cookieService && this.cookieService.get("token")) this.nextPageInd = "Home";
    else this.nextPageInd = "Login";
  }

  backToLogin(){
   this.router.navigate(['/Appraisal']);
  }

  ngOnInit() {
    $(window).resize();
  }
}
