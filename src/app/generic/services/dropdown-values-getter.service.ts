import { Injectable } from '@angular/core';


@Injectable()
export class DropdownValuesGetterService {
  cities : any[];
  citiesArray: any;
  provinces: any[];
  purposes: any[];
  rePurposesArray: any[];
  autoPurposesArray: any[];
  //Variable for removing loading
  removeLoad: boolean = false;
  /*value for regions*/
  regions: any[];
  branches: any[];
  appraisalCompanies: any[];
  //get the active page number
  activePage: string;
  tableResultMessage: string;
  /*Variable for appraiser*/
  appraisers = [];
  approvers;
  requestingGroups;
  requestors;
  assetTypes;
  /*Vaiable for type */
  brands: any[];
  types: any[];
  typesArray: any[];
  appraiserByRegionArray: any;
  appraiserByAppraisalCompanyArray: any;
  /*Variable for reviewer dropdown field*/
  reviewers: any[];
  propertyTypes: any[];
  reqStatus: any[];
  rptStatus: any[];
  appraisalTypes: any[];
  verified: any[];
  tvrStatuses: any[];  
  encoders: any[];
  approversTVR: any[];
  
  constructor() {
    /*Variable for city*/
  this.cities = [];
  this.citiesArray = JSON.parse(sessionStorage.getItem('cities'));
  /*Variable  for province */
  this.provinces = JSON.parse(sessionStorage.getItem('provinces'));
  /*Variable  for purpose*/
  this.purposes = [];
  this.rePurposesArray = JSON.parse(sessionStorage.getItem('rePurposes'));
  this.autoPurposesArray  = JSON.parse(sessionStorage.getItem('autoPurposes'));
  this.tvrStatuses = JSON.parse(sessionStorage.getItem('tvrStatuses'));
  
  this.regions = JSON.parse(sessionStorage.getItem('regions'));
  this.branches = JSON.parse(sessionStorage.getItem('branches'));
  this.appraisalCompanies = JSON.parse(sessionStorage.getItem("appraisalCompanies"));

  this.appraisers  = JSON.parse(sessionStorage.getItem("appraisers"));
  this.approvers  = JSON.parse(sessionStorage.getItem("approvers"));
  this.requestingGroups = JSON.parse(sessionStorage.getItem("requestingGroups"));
  this.requestors  = JSON.parse(sessionStorage.getItem("requestors"));
  this.assetTypes  = JSON.parse(sessionStorage.getItem("assetTypes"));
  /*Vaiable for type */
  this.brands = JSON.parse(sessionStorage.getItem('brands'));
  this.types = [];
  this.typesArray = JSON.parse(sessionStorage.getItem('types'));
  this.appraiserByRegionArray= JSON.parse(sessionStorage.getItem('appraiserValuesByAppraisalRegion'));
  this.appraiserByAppraisalCompanyArray= JSON.parse(sessionStorage.getItem('appraiserValuesByAppraisalCompany'));
  /*Variable for reviewer dropdown field*/
  this.reviewers= JSON.parse(sessionStorage.getItem('reviewers'));
  this.propertyTypes = JSON.parse(sessionStorage.getItem('propertyTypes'));
  this.reqStatus = JSON.parse(sessionStorage.getItem('requestStatuses'));
  this.rptStatus = JSON.parse(sessionStorage.getItem('reportStatus'));
  this.appraisalTypes = JSON.parse(sessionStorage.getItem('appraisalTypes'));
  this.verified= JSON.parse(sessionStorage.getItem('verified'));
  this.encoders = JSON.parse(sessionStorage.getItem('encoders'));
  this.approversTVR = JSON.parse(sessionStorage.getItem('approversTVR'));

  }

  //retrieve value of province using code
  getProvinceValues(province: string): string {
    this.provinces = JSON.parse(sessionStorage.getItem('provinces'));
    if (province && this.provinces) {
      let retrievedProvince = this.provinces.find((data) => data.value.trim() === province.trim());
      if (retrievedProvince !== undefined) {
        return retrievedProvince.label;
      }
    }
    return "";
  }

  //retrieve value of city using code
  getCityValues(city: string, province: string): string {
    this.cities = [];
    this.citiesArray = JSON.parse(sessionStorage.getItem('cities'));
    if(province){
      province = province.trim();
    }
    if(city){
      city = city.trim();
    }
    if (city && province && this.citiesArray[province]) {
      this.cities = this.citiesArray[province];
      if (this.cities !== undefined && this.cities !== null) {
        let retrievedCity = this.cities.find((data) => data.value.trim() === city.trim());
        if (retrievedCity !== undefined) {
          return retrievedCity.label;
        }
      }
    }
    return "";
  }


  //retrieve value of purpose using code
  getRePurposeValues(purpose: string, assetType: string): string {
    this.purposes = [];
    this.rePurposesArray = JSON.parse(sessionStorage.getItem('rePurposes'));
    if (assetType && purpose && this.rePurposesArray[assetType.trim()]) {
      this.purposes = this.rePurposesArray[assetType.trim()];
      if (this.purposes !== undefined && this.purposes !== null) {
        let retrievedPurpose = this.purposes.find((data) => data.value.trim() === purpose.trim());
        if (retrievedPurpose !== undefined) {
          return retrievedPurpose.label;
        }
      }
      return purpose;
    }
    return "";
  }

  //retrieve value of purpose using code
  getAutoPurposeValues(purpose: string, assetType: string): string {
    this.purposes = [];
    this.autoPurposesArray  = JSON.parse(sessionStorage.getItem('autoPurposes'));
    if (assetType && purpose && this.autoPurposesArray[assetType.trim()]) {
      this.purposes = this.autoPurposesArray[assetType.trim()];
      if (this.purposes !== undefined && this.purposes !== null) {
        let retrievedPurpose = this.purposes.find((data) => data.value.trim() === purpose.trim());
        if (retrievedPurpose !== undefined) {
          return retrievedPurpose.label;
        }
      }
      return purpose;
    }
    return "";
  }

  getAppraisalRegionValues(region: string): string {
    this.regions = JSON.parse(sessionStorage.getItem('regions'));
    if (region && this.regions) {
      let retrievedRegion = this.regions.find((data) => data.value.trim() === region.trim());
      if (retrievedRegion !== undefined && retrievedRegion !== null) {
        return retrievedRegion.label;
      }
      return region;
    }
    return "";
  }

  getAppraisalBranchValues(branch: string): string {
    this.branches = JSON.parse(sessionStorage.getItem('branches'));
    if (branch && this.branches) {
      let retrieved = this.branches.find((data) => data.value.trim() === branch.trim());
      if (retrieved !== undefined && retrieved !== null) {
        return retrieved.label;
      }
      return branch;
    }
    return "";
  }

  //retrieve value of appraiser using code
  getAppraiserValues(appraiser: string): string {
    this.appraisers  = JSON.parse(sessionStorage.getItem("appraisers"));
    if (appraiser && this.appraisers) {
      //DESC: OLD VALUE COMES FROM CDE_APPRAISER CHANGING TO TBL_SEC_USERS_BACK
      let retrievedappraiser = this.appraisers.find((data) => data.value.trim() === appraiser.trim());
      if (retrievedappraiser !== undefined) {
        return retrievedappraiser.label;
      }
      return appraiser;
    }
    return "";
  }

  getAppraiserByRegionValues(user: string, branch: string) {
    this.appraisers  = JSON.parse(sessionStorage.getItem("appraisers"));
    this.appraiserByRegionArray= JSON.parse(sessionStorage.getItem('appraiserValuesByAppraisalRegion'));
    if (branch && user && this.appraiserByRegionArray[branch.trim()]) {
      let result = this.appraiserByRegionArray[branch.trim()].find((data) => data.value.trim() === user.trim());
      if (result !== undefined && result !== null) {
        return result.label;
      }
    } else if (user && this.appraisers) {
      let result = this.appraisers.find((data) => data.value.trim() === user.trim());
      if (result !== undefined && result !== null) {
        return result.label;
      }
    }
    return "";
  }

  getAppraiserByAppraisalCompanyValues(user: string, appCompany: string) {
    this.appraiserByAppraisalCompanyArray= JSON.parse(sessionStorage.getItem('appraiserValuesByAppraisalCompany'));
    this.appraisers  = JSON.parse(sessionStorage.getItem("appraisers"));
    if (appCompany && user && this.appraiserByAppraisalCompanyArray[appCompany.trim()]) {
      let result = this.appraiserByAppraisalCompanyArray[appCompany.trim()].find((data) => data.value.trim() === user.trim());
      if (result !== undefined && result !== null) {
        return result.label;
      }
    } else if (user && this.appraisers) {
      let result = this.appraisers.find((data) => data.value.trim() === user.trim());
      if (result !== undefined && result !== null) {
        return result.label;
      }
    }
    return "";
  }

  getAppraisalCompanyValue(appCom: string): string {
    this.appraisalCompanies = JSON.parse(sessionStorage.getItem("appraisalCompanies"));
    if (this.appraisalCompanies && appCom) {
      let option = this.appraisalCompanies.find((data) => data.value.trim() === appCom.trim());
      if (option !== undefined) {
        return option.label;
      } else
        return appCom;
    }
    return "";
  }

  getRequestedByValues(requestor: string): string {
    this.requestors  = JSON.parse(sessionStorage.getItem("requestors"));
    if (requestor && this.requestors) {
      let option = this.requestors.find((data) => data.value.trim() === requestor.trim());
      if (option !== undefined) {
        return option.label;
      } else
        return requestor;
    }
    return "";
  }

  getRequestingGroupValues(requestingGroup: string): string {
    this.requestingGroups = JSON.parse(sessionStorage.getItem("requestingGroups"));
    if (requestingGroup && this.requestingGroups) {
      let option = this.requestingGroups.find((data) => data.value.trim() === requestingGroup.trim());
      if (option !== undefined) {
        return option.label;
      }
      return requestingGroup;
    }
    return "";
  }

  getBrandValues(brand: string): string {
    this.brands = JSON.parse(sessionStorage.getItem('brands'));
    if (brand && this.brands) {
      let retrievedTypes = this.brands.find((data) => data.value.trim() === brand);
      if (retrievedTypes !== undefined) {
        return retrievedTypes.label;
      }
      return brand;
    }
    return "";
  }

  //retrieve value of purpose using code
  getTypesValues(type: string, brand: string): string {
    this.types = [];
    this.typesArray = JSON.parse(sessionStorage.getItem('types'));
    if (brand) {
      this.types = this.typesArray[brand.trim()];
      if (this.types !== undefined && this.types !== null) {
        let retrievedTypes = this.types.find((data) => data.value.trim() === type);
        if (retrievedTypes !== undefined) {
          return retrievedTypes.label;
        }
        return type;
      }
    }
    return "";
  }

  //retrieve value of reviewer using code
  getReviewerValues(reviewer: string): string {
    this.reviewers= JSON.parse(sessionStorage.getItem('reviewers'));
    if (reviewer && this.reviewers) {
      let retrievedReviewer = this.reviewers.find((data) => data.value.trim() === reviewer.trim());
      if (retrievedReviewer !== undefined) {
        return retrievedReviewer.label;
      } return reviewer;
    }
    return "";
  }

  //retrieve value of assetType using code
  getAssetTypes(assetType: string): string {
    this.assetTypes  = JSON.parse(sessionStorage.getItem("assetTypes"));
    if (assetType && this.assetTypes) {
      let retrieved = this.assetTypes.find((data) => data.value.trim() === assetType.trim());
      if (retrieved !== undefined)
        return retrieved.label;
    }
    return "";
  }

  //retrieve value of requestStatus using code
  getRequestStatusValues(value: string): string {
    this.reqStatus = JSON.parse(sessionStorage.getItem('requestStatuses'));
    if (value && this.reqStatus) {
      let retrieved = this.reqStatus.find((data) => data.value.trim() === value.trim());
      if (retrieved) {
        return retrieved.label;
      } else return value;
    }
    return "";
  }

  //retrieve value of reportStatus using code
  getReportStatusValues(value: string): string {
    this.rptStatus = JSON.parse(sessionStorage.getItem('reportStatus'));
    if (value && this.rptStatus) {
      let retrieved = this.rptStatus.find((data) => data.value.trim() === value.trim());
      if (retrieved) {
        return retrieved.label;
      } else return value;
    }
    return "";
  }

  getTrim(value: string): string {
    if (value) {
      return value.trim();
    }
    return "";
  }

  getYesNo(value: string): string {
    if (value) {
      if (value.toLocaleLowerCase() == "y") return "Yes";
      else if (value.toLocaleLowerCase() == "n") return "No";
    }
    return "";
  }

  getPropertyTypeValues(value: string): string {
    this.propertyTypes = JSON.parse(sessionStorage.getItem('propertyTypes'));
    if (value && this.propertyTypes) {
      let retrieved = this.propertyTypes.find((data) => data.value.trim() === value.trim());
      if (retrieved) {
        return retrieved.label;
      } else return value;
    }
    return "";
  }

  getAppraisalTypesValues(value: string): string {
    this.appraisalTypes = JSON.parse(sessionStorage.getItem('appraisalTypes'));
    if (value && this.appraisalTypes) {
      let retrieved = this.appraisalTypes.find((data) => data.value.trim() === value.trim());
      if (retrieved) {
        return retrieved.label;
      } else return value;
    }
    return "";
  }

   getVerifiedValues(value: string): string {
    this.verified= JSON.parse(sessionStorage.getItem('verified'));
    if (value && this.verified) {
      let retrieved = this.verified.find((data) => data.value.trim() === value.trim());
      if (retrieved) {
        return retrieved.label;
      } else return value;
    }
    return "";
  }

   getAppraisalApproverValues(value: string): string {
    this.approvers  = JSON.parse(sessionStorage.getItem("approvers"));
    if (value && this.approvers) {
      let retrieved = this.approvers.find((data) => data.value.trim() === value.trim());
      if (retrieved !== undefined && retrieved !== null) {
        return retrieved.label;
      }
      return value;
    }
    return "";
  }

  getTvrStatusValues(value: string): string {
    this.tvrStatuses = JSON.parse(sessionStorage.getItem("tvrStatuses"));
    if (value && this.tvrStatuses) {
      let retrieved = this.tvrStatuses.find((data) => data.value.trim() === value.trim());
      if (retrieved !== undefined && retrieved !== null) {
        return retrieved.label;
      }
      return value;
    }
    return "";
  }
  
  getEncodersValues(value: string): string {
    this.encoders= JSON.parse(sessionStorage.getItem("encoders"));
    if (value && this.encoders) {
      let retrieved = this.encoders.find((data) => data.value.trim() === value.trim());
      if (retrieved !== undefined && retrieved !== null) {
        return retrieved.label;
      }
      return value;
    }
    return "";
  }
  getapproversTvrValues(value: string): string {
    this.approversTVR= JSON.parse(sessionStorage.getItem("approversTVR"));
    if (value && this.approversTVR) {
      let retrieved = this.approversTVR.find((data) => data.value.trim() === value.trim());
      if (retrieved !== undefined && retrieved !== null) {
        return retrieved.label;
      }
      return value;
    }
    return "";
  }
}
