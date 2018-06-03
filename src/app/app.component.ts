import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { MessageConfig } from "./generic/message.config";
import { Router} from "@angular/router";
import { XfsPageComponent} from './generic/xfs-page/xfs-page.component';
import { DataPasserService } from './generic/services/data-passer.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    entryComponents: [LoginComponent],
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    constructor(private config: MessageConfig, private router: Router, private dataPasserService: DataPasserService) {
        this.config.load();
        this.getSession();
        this.xfsPrevention();
    }


    getSession(){
        if(localStorage.getItem('access-token')){
           this.dataPasserService.accessToken = localStorage.getItem('access-token');
           this.dataPasserService.client =  localStorage.getItem('client');
           this.dataPasserService.tokenType = localStorage.getItem('tokenType');
           this.dataPasserService.expiry =  localStorage.getItem('expiry');
           this.dataPasserService.uid =  localStorage.getItem('uid');
           this.dataPasserService.username = localStorage.getItem('uid');
        }else{
            this.router.navigate(['']);
        }
        
    }
    
    xfsPrevention(){
        if(self != top){
            this.router.navigate(['/xfs']);
        }
    }
}

