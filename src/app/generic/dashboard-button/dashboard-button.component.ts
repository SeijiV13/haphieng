import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../generic/services/dashboard.service';
@Component({
  selector: 'dashboard-button',
  templateUrl: './dashboard-button.component.html',
  styleUrls: ['./dashboard-button.component.css']
})
export class DashboardButtonComponent implements OnInit {
  @Input() appraiserWorkload: string;
  @Input() appraiserCompanyWorkload: string;
  @Input() appraiserWorkloadType: string;
  @Input() appraiserCompanyWorkloadType: string;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

  }

  goToAppraisalWorkloadOutside(workloadType: string, appraisalType: string) {
    this.dashboardService.loadWorkload(workloadType, appraisalType, '', '', '');
  }

}
