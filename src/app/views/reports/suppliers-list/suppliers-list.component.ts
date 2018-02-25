import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit {

  constructor(private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("SUPPLIERS LIST");
  }
  
  
  generate(){}
}
