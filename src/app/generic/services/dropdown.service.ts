import { Injectable } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "../../generic/httpClient.config";
import { Http } from "@angular/http";
@Injectable()
export class DropdownService {

  array = ['province', 'city', 'rePurpose', 'autoPurpose', 'classification'
    , 'propertyType', 'occupancy', 'classify', 'requestingGroup','verTitle','apprType'
    , 'branch', 'reviewer', 'requestStatus', 'requestor', 'approver', 'bearing'
    , 'appraisalCompany', 'VEHwarehouse', 'VEHmodel', 'VEHbrand', 'utility', 'reqGrpByRequestor'
    , 'externalAppraiser', 'internalAppraiser', 'improvementType', 'reportStatus'
    , 'region', 'assetType', 'tatType', 'tatPriority', 'internalAppraiserAll', 'externalAppraiserAll', 'encoder', 'approverTVR', 'requestingBranch', 'requestingBranchAll', 'tvrStatus', 'clearingInd', 'regDeeds'];


  constructor(private httpClient: HttpClient, private http: Http) { }

  //GENERIC DROPDOWN
  getDropdownValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=" + this.array.join()).map(this.httpClient.handleMap);
  }

  //get values of province dropdown
  getProvinceValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=province")
      .map(this.httpClient.handleMap);
  }

  //get values of city dropdown
  getCityValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=city").map(this.httpClient.handleMap);
  }

  //get values of purpose dropdown
  getREPurposeValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=rePurpose").map(this.httpClient.handleMap);
  }

  getAutoPurposeValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=autoPurpose").map(this.httpClient.handleMap);

  }
  //get values of classification dropdown
  getClassificationValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=classification").map(this.httpClient.handleMap);
  }

  //get values of property type dropdown
  getPropertyTypeValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=propertyType").map(this.httpClient.handleMap);
  }

  //get values of occupancy dropdown
  getOccupancyValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=occupancy").map(this.httpClient.handleMap);
  }

  //get values of classify dropdown
  getClassifyValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=classify").map(this.httpClient.handleMap);
  }

  //get values of requestingGroup drop down
  getRequestingGroupValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=requestingGroup").map(this.httpClient.handleMap);
  }

  //get values of  branch dropdown
  getBranchValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=branch").map(this.httpClient.handleMap);
  }

  //get values of reviewer dropdown
  getReviewerValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=reviewer").map(this.httpClient.handleMap);
  }

  //get values of requestStatus dropdown
  getRequestStatusValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=requestStatus").map(this.httpClient.handleMap);
  }

  //get values of appraiser dropdown
  getAppraiserValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=reviewer").map(this.httpClient.handleMap);
  }
  //get values of requestor dropdown
  getRequestorValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=requestor").map(this.httpClient.handleMap);
  }
  //get values of appraisal company dropdown
  getAppraisalCompanyValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=appraisalCompany").map(this.httpClient.handleMap);
  }

  //get values of brand dropdown
  getWarehouseValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=VEHwarehouse").map(this.httpClient.handleMap);
  }

  //get values of warehouse details
  getWarehouseDetailValues(): Observable<any> {
    return this.httpClient.getBase("mc/warehouses").map(this.httpClient.handleMap);
  }

  //get values of type/model dropdown
  getTypeValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=VEHmodel").map(this.httpClient.handleMap);
  }

  //get values of brand dropdown
  getBrandValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=VEHbrand").map(this.httpClient.handleMap);
  }

  //get values of external appraiser dropdown
  getExternalAppraiserValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=externalAppraiser").map(this.httpClient.handleMap);
  }

  //get values of internal appraiser dropdown
  getInternalAppraiserValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=internalAppraiser").map(this.httpClient.handleMap);
  }

  // Positive Factors for Basis of Value Tab
  getPositiveFactors(): Observable<any> {
    return this.httpClient.getBase("re/reports/positiveFactors").map((res: Response) => <Response[]>res.json());
  }

  // Negative Factors for Basis of Value Tab
  getNegativeFactors(): Observable<any> {
    return this.httpClient.getBase("re/reports/negativeFactors").map((res: Response) => <Response[]>res.json());
  }

  // Improvement Detail for Improvement Tab
  getImprovements(): Observable<any> {
    return this.httpClient.getBase("re/reports/improvements").map(this.httpClient.handleMap);
  }

  // Improvement Type for Improvement Tab
  getImprovementType(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=improvementType").map(this.httpClient.handleMap);
  }

  //MC Equipment Accessories
  getEquipmentAccessories(): Observable<any> {
    return this.httpClient.getBase("mc/maintenance/acc").map(this.httpClient.handleMap);
  }

  //MC Condition Of Vehicle
  getConditionOfVehicle(): Observable<any> {
    return this.httpClient.getBase("mc/maintenance/parts").map(this.httpClient.handleMap);
  }

  //MC Brand
  getMCBrand(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=VEHbrand").map(this.httpClient.handleMap);
  }

  //MC Model
  getMCModel(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=VEHmodel").map(this.httpClient.handleMap);
  }

  // Report Status
  getReportStatus(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=reportStatus").map(this.httpClient.handleMap);
  }

  //Appraisal Region
  getAppRegion(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=region").map(this.httpClient.handleMap);
  }

  //Asset Type
  getAssetTypeValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=assetType").map(this.httpClient.handleMap);

  }
  //TAT TYPE
  getTatTypeValues(): Observable<any> {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=tatType").map(this.httpClient.handleMap);
  }

  //TAT PRIORITY
  getTatPriority() {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=tatPriority").map(this.httpClient.handleMap);
  }

  //INTERNAL APPRAISERS
  getAllInternalAppraisers() {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=internalAppraiserAll").map(this.httpClient.handleMap);
  }

  //EXTERNAL APPRAISERS
  getAllExternalAppraisers() {
    return this.httpClient.getBase("app/maintenance/dropdowns?fields=externalAppraiserAll").map(this.httpClient.handleMap);
  }
  
  //APPROVER TVR 
  getApproverTvr(){
    return this.httpClient.getBase("app/maintenance/dropdown?fields=approverTvr").map(this.httpClient.handleMap);
  }
  
  //REQUESTING BRANCH
  getRequestingBranch(){
    return this.httpClient.getBase("app/maintenance/dropdown?fields=requestingBranch").map(this.httpClient.handleMap);
  }
  
  //ENCODER
  getEncoder(){
     return this.httpClient.getBase("app/maintenance/dropdown?fields=encoder").map(this.httpClient.handleMap);
  }



  //HardCoded Values
  getAppraisalTypesValues(): any[] {
    return [
      { value: "INT", label: "Internal" },
      { value: "EXT", label: "External" }
    ];
  }

  getYesNoValues(): any[] {
    return [
      { label: "Yes", value: "Y" },
      { label: "No", value: "N" }
    ];
  }

  // GENERIC USER LIST
  getTransactionList(): Observable<any> {
    let headers = new Headers();
    return this.httpClient.get("app/maintenance/trandetails", headers).map(this.httpClient.handleMap);
  }

  getReDocumentValues(){
    let headers = new Headers();
    return this.httpClient.getBase(`re/requests/0/documents`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }

  getMcDocumentValues(){
     let headers = new Headers();
     return this.httpClient.getBase(`mc/requests/0/documents`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
 }
}
