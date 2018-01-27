import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '../../generic/httpClient.config';
import { InitService } from '../../generic/init.config';
@Injectable()
export class DashboardService {
  taskList: any[] = [];
  workloadOutsideLink: string;
  constructor(private httpClient: HttpClient, private http: Http,
    private _init: InitService) {
    this.workloadOutsideLink = _init.getConfig("dashBoardWorkload");
  }

  // Get task list
  getTaskList(): Observable<any> {
    return this.httpClient.getBase(`app/dashboard`).map(this.httpClient.handleMap);
  }

  //Get appraisal regions
  getAppraisalRegions(): Observable<any> {
    return this.httpClient.getBase(`app/dashboard/appraisalRegions`).map(this.httpClient.handleMap);
  }

  getAppraisalRegion(): Observable<any> {
    return this.httpClient.getBase(`app/dashboard/appraisalRegion`).map(this.httpClient.handleMap);
  }

  //Get Appraisal Workload
  getAppraisalWorkload(workloadType: string, workloadAppraisalType: string): Observable<any> {
    return this.httpClient.getBase(`app/dashboard/workload/${workloadType}-${workloadAppraisalType}`).map(this.httpClient.handleMap);
  }

  //Get Appraisal Workload
  loadWorkload(workloadType: string, appraisalType: string, userAppraisalRegion: string, appraisalCompany: string, role: string) {
    if (userAppraisalRegion == '') {
      this.getAppraisalRegion().subscribe((data) => {
        userAppraisalRegion = data['rc_region'];
        if (appraisalCompany == '')
          appraisalCompany = data['code2'];
        if (userAppraisalRegion == 'HEAD OFFICE')
          userAppraisalRegion = 'Head Office';

        window.open(this.workloadOutsideLink + "?workloadType=" + workloadType + "&appraisalType=" + appraisalType + "&appraisalRegion=" + userAppraisalRegion + "&appraisalCompany=" + appraisalCompany + "&role=" + role, "_blank");
      },
        (err) => {
          let varErr = JSON.parse(err._body);
        });
    } else {
      window.open(this.workloadOutsideLink + "?workloadType=" + workloadType + "&appraisalType=" + appraisalType + "&appraisalRegion=" + userAppraisalRegion + "&appraisalCompany=" + appraisalCompany + "&role=" + role, "_blank");
    }

  }

  /*<Dashboard>*/

}
