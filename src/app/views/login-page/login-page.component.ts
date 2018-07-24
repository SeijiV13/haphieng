import { DataPasserService } from './../../generic/services/data-passer.service';
import { AuthenticationService } from './../../generic/services/http-services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CustomerService } from '../../web-services/customer.service';
import { ProductsService } from '../../web-services/products.service';
import { AgentService } from '../../web-services/agent.service';
import { SupplierService } from '../../web-services/supplier.service';
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
              private dataPasser: DataPasserService,
              private customerService: CustomerService,
              private productService: ProductsService,
              private agentService: AgentService,
              private supplierService: SupplierService) {
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
        let jsonData = data.json();
        let headerData = data.headers.toJSON();
        this.dataPasser.accessToken = headerData['access-token'];
        this.dataPasser.client = headerData['client'];
        this.dataPasser.tokenType = headerData['token-type'];
        this.dataPasser.expiry = headerData['expiry'];
        this.dataPasser.uid = headerData['uid'];
        
        localStorage.setItem('access-token', this.dataPasser.accessToken);
        localStorage.setItem('client', this.dataPasser.client);
        localStorage.setItem('tokenType', this.dataPasser.tokenType);
        localStorage.setItem('expiry', this.dataPasser.expiry);
        localStorage.setItem('uid', this.dataPasser.uid);
        this.customerService.getCustomers().subscribe((data)=>{
          this.dataPasser.dropdowns['customer'] = data;
        });
        this.supplierService.getSuppliers().subscribe((data)=>{
          this.dataPasser.dropdowns['supplier'] = data;
        })
        this.agentService.getAgents().subscribe((data)=>{
          this.dataPasser.dropdowns['agent'] = data;
        })
    
        this.dataPasser.username = jsonData.data['email'];
        this.router.navigate(["/home"]);
     
      }, (error)=>{
        this.loginError = true;
      })
    }else{
      this.loginError = true;
    }
  }

}
