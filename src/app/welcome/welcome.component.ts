import { Component, ViewChild } from '@angular/core';
import { AuthenticateService } from "../login/loginService/authenticate.service";
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
  providers: [AuthenticateService],
  styleUrls: ['./welcome.component.css'],
})

export class WelcomeComponent {
   editorOptions = {
    placeholder: "insert content..."
  };
  lat: number = 51.678418;
  lng: number = 7.809007;
  formGroup: FormGroup;
  @ViewChild('genericTable') genericTable: GenericTableComponent;
  @ViewChild('genericModal') genericModal: GenericModalComponent;
  headers = [
    'Request No.',
    'Title No.',
    'Request Status',
    'Province',
    'City',
  ];
  results = [
    /*{'reqNo': '1', 'titleNo': '123', 'reqStatus': 'New', 'province': 'Batangas', 'city': 'Batangas'},
    {'reqNo': '2', 'titleNo': '234', 'reqStatus': 'New', 'province': 'Batangas', 'city': 'Batangas'},
    {'reqNo': '3', 'titleNo': '345', 'reqStatus': 'New', 'province': 'Batangas', 'city': 'Batangas'}*/
  ]
  keys = [
      {"name":'requestNo', "behavior": 'clickable'},
      {"name":'titleNo', },
      {"name":'reqStatus'},
      {"name":'province'},
      {"name":'city'},
  ]
  //JSON Contains  NAME, ID, , LOGO, TYPE, BEHAVIOR, 
  buttons = [
    {'name': "Select", 'id': "select-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'select', 'behavior':'single'}
  ]

  constructor(
    private _service: AuthenticateService,
    private route: ActivatedRoute,
    private router: Router,
    private dataPasserService: DataPasserService,
    private dropdownService: DropdownService,
    private dashboardService: DashboardService,
    private http :HttpClient,
    private fb: FormBuilder) {

  }

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  openModal(){
    this.genericModal.show();
  }
  ngOnInit() {
     //SET TITLE OF PAGE
     this.dataPasserService.sendPageTitle("DASHBOARD");
     this.formGroup = this.fb.group({
       quill: [''],
       propRefNo: ['', Validators.required],
       applicationDate: [''],
       status:['', Validators.required],
       applicationNo: ['', Validators.required]
     })
  }
  doSearch(){
    console.log(this.formGroup.controls['quill'].value)
    this.genericTable.doSearch('re/requests?requestNo=');
  }

  download() {
           //creating pdf
            var doc = new jsPDF();
            doc.text(20, 20, 'Hello world!');
            doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
            doc.rect(50, 100, 10, 10);
            doc.addPage();
            doc.text(20, 20, 'Do you like that?');
    
            // Save the PDF
            doc.save('Test.pdf');
        }

}
