import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-entries',
  templateUrl: './sales-entries.component.html',
  styleUrls: ['./sales-entries.component.scss']
})
export class SalesEntriesComponent implements OnInit {

  constructor(private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("SALES ENTRIES");
  }

}
