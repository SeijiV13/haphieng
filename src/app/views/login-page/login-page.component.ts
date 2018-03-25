import { DataPasserService } from './../../generic/services/data-passer.service';
import { AuthenticationService } from './../../generic/services/http-services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginError: boolean = false;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private authenticationService: AuthenticationService,
              private dataPasser: DataPasserService) {
   }

  ngOnInit() {
    this.initializeForm();
    
  }
  initializeForm(){
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    let username = this.form.controls['username'].value;
    let password = this.form.controls['password'].value
    if(this.form.valid){
      this.authenticationService.login(username, password).subscribe((data)=>{
        this.dataPasser.username = data.data['email'];
        this.router.navigate(["/home"]);
     
      }, (error)=>{
        this.loginError = true;
      })
    }else{
      this.loginError = true;
    }
  }

}
