import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changeForm: FormGroup
  constructor(private dataPasserService: DataPasserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle('CHANGE PASSWORD')
    this.changeForm = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    })
  }

  clear(){
    this.changeForm.reset();
  }

  changePassword(){

  }

}
