import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  constructor(private dataPasserSercive: DataPasserService) { }

  ngOnInit() {
    this.dataPasserSercive.sendPageTitle("CUSTOMERS LIST");
  }
  generate(){}
}
