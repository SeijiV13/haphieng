import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { MessageConfig } from "./generic/message.config";
import { Router} from "@angular/router";
import { XfsPageComponent} from './generic/xfs-page/xfs-page.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    entryComponents: [LoginComponent],
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    constructor(private config: MessageConfig, private router: Router) {
        sessionStorage.clear();
        localStorage.clear();
        this.config.load();
        this.xfsPrevention();
    }
    
    xfsPrevention(){
        if(self != top){
            this.router.navigate(['/xfs']);
        }
    }
}

