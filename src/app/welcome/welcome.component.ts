import { Component, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DataPasserService } from '../generic/services/data-passer.service';
import { DropdownService } from '../generic/services/dropdown.service';
import { DashboardService } from '../generic/services/dashboard.service';
import { GenericModalComponent} from '../generic/generic-modal/generic-modal.component';
import { Router } from '@angular/router';
import { HttpClient} from '../generic/httpClient.config';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { GenericTableComponent} from '../generic/generic-table/generic-table.component';
import { AgmCoreModule } from '@agm/core';
import * as jsPDF from 'jspdf';
import * as $ from 'jquery';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})

export class WelcomeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataPasserService: DataPasserService,
    private dropdownService: DropdownService,
    private dashboardService: DashboardService,
    private http :HttpClient,
    private fb: FormBuilder) {

  }


  ngOnInit() {
     //SET TITLE OF PAGE
     this.dataPasserService.sendPageTitle("DASHBOARD");

  }




}
