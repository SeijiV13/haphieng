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
  users = {
    seiji: { password: "a"},
    gelo: { password: "a"},
    sky: { password: "a"},
  }
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    if(this.form.valid){
    let username = this.form.controls['username'].value;
    let password = this.form.controls['password'].value;
    if(this.users[username]){
       let userPassword = this.users[username].password;
       if(password == userPassword){
        this.router.navigate(['/home']);
       }else{
         this.loginError = true;
       }
    }else{
        this.loginError = true;
    }
    }
  }

}
