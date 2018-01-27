import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionService {

  constructor() { }
  clearSessions() {
    //RE SESSIONS
    sessionStorage.removeItem('inquireTvrSearch');
    sessionStorage.removeItem('approveTvrSearch');
    sessionStorage.removeItem('tvrMaintenanceSearchRe');
    sessionStorage.removeItem('approveSearchRe');
    sessionStorage.removeItem('basicSearchRe');
    sessionStorage.removeItem('reviewExtSearchRe');
    sessionStorage.removeItem('externalAppraiserSearchRe');
    sessionStorage.removeItem('appraiserUseSearchRe');
    sessionStorage.removeItem('appraisalCompanyAssignmentSearchRe');
    sessionStorage.removeItem('assignmentSearchRe');
    sessionStorage.removeItem('documentChecklistSearchRe');
    sessionStorage.removeItem('maintenanceSearchRe');
    sessionStorage.removeItem('reAssignmentSearchRe');
    sessionStorage.removeItem('externalAssignmentSearchRe');
    sessionStorage.removeItem('externalReAssignmentSearchRe');
    // MC SESSIONS
    sessionStorage.removeItem('appraiserUseSearchMC');
    sessionStorage.removeItem('externalAppraiserSearchMc');
    sessionStorage.removeItem('reviewUseSearchMC');
    sessionStorage.removeItem('approveUseSearchMC');
    sessionStorage.removeItem('basicSearchMC');
    sessionStorage.removeItem('externalReAssignmentSearchMc');
    sessionStorage.removeItem('externalAssignmentSearchMc');
    sessionStorage.removeItem('reAssignmentSearchMc');
    sessionStorage.removeItem('maintenanceSearchMc');
    sessionStorage.removeItem('documentChecklistSearchMc');
    sessionStorage.removeItem('assignmentSearchMc');
    sessionStorage.removeItem('appraisalCompanyAssignmentSearchMc');





  }
}
