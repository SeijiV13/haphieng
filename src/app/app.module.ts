//ANGULAR MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, RequestOptions, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { ErrorHandlerModule } from './generic/error-handler/error-handler.module';
import {DropdownModule} from "ngx-dropdown";

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './generic/search.component';
import { HeaderComponent } from './header/header.component';
import { MenuViewComponent } from './generic/menu-view/menu-view.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './generic/error-pages/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './generic/error-pages/generic-error-page/error-page.component';
import { CharactersRemainingComponent } from './generic/characters-remaining/characters-remaining.component';
import { AlertModalComponent } from './generic/alert-modal/alert-modal.component';
import { ErrorHeaderComponent } from './generic/error-header/error-header.component';
import { PaginationComponent } from './generic/pagination/pagination.component';
import { UploadLightboxComponent } from './generic/upload-lightbox/upload-lightbox.component';
import { DashboardButtonComponent } from './generic/dashboard-button/dashboard-button.component';
import { SessionTimeoutModalComponent } from './generic/session-timeout-modal/session-timeout-modal.component';
import { XfsPageComponent } from './generic/xfs-page/xfs-page.component';
import { PrintModalComponent } from './generic/print-modal/print-modal.component';
import { GenericModalComponent } from './generic/generic-modal/generic-modal.component';
import { GenericTableComponent } from './generic/generic-table/generic-table.component';

//APIS
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';
import { FileUploadComponent } from './generic/fileupload.component';
import { DataTableModule } from "angular2-datatable";
import { LoadingAnimationComponent } from './generic/loading-animation/loading-animation.component';
import { DatepickerComponent } from './generic/datepicker/datepicker.component';
import { ProgressHttpModule } from "angular-progress-http";
import { CookieModule} from 'ngx-cookie';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuillEditorModule } from 'ngx-quill-editor';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import {NgDashboardModule} from 'ngx-dashboard';

//RESOLVERS
import { MenuResolver } from './generic/menu.resolver';
import { DropdownResolver } from './generic/resolver/dropdown.resolver';
import { ConditionOfVehicleResolver } from './generic/resolver/condVech.resolver';
import { EquipmentAccesoriesResolver } from './generic/resolver/equipAcc.resolver';
import { ImprovementResolver } from './generic/resolver/improvement.resolver';
import { NegativeFactorsResolver } from './generic/resolver/negFactors.resolver';
import { PositiveFactorsResolver } from './generic/resolver/posFactors.resolver';
import { WarehouseResolver } from './generic/resolver/warehouse.resolver';
import { DocumentREResolver} from './generic/resolver/documentRE.resolver';
import { DocumentMCResolver} from './generic/resolver/documentMC.resolver';
//ROUTER
import { ROUTER_PROVIDER } from './routes/main.routes';

//GUARDS
import { AuthGuard } from './generic/guards/auth.guard';

//SERVICE
import { InitService } from './generic/init.config';
import { MessageConfig } from './generic/message.config';
import { DashboardService } from './generic/services/dashboard.service';
import { ControlMessages } from './generic/services/control-messages.component';
import { ValidationService } from './generic/services/validation.service';
import { DataPasserService } from './generic/services/data-passer.service';
import { DropdownService } from './generic/services/dropdown.service';
import { HttpClient } from './generic/httpClient.config';

import { FormatterService } from './generic/services/formatter.service';
import { FormErrorHandlerService } from './generic/services/form-error-handler.service';
import { DropdownValuesGetterService } from './generic/services/dropdown-values-getter.service';
import { FloatingButtonService } from './generic/services/floating-button.service';
import { UserDetailsService } from './generic/services/user-details.service'
import { DateFormatterService } from './generic/services/date-formatter.service';
import { ClearSessionService } from './generic/services/clear-session.service';
import { DeadlineColorService } from './generic/services/deadline-color.service';
import { AuthenticateService } from './login/loginService/authenticate.service';
import { TransactionTitlesService } from './generic/services/transaction-titles.service';
import { RecordLockerUrlService } from './generic/services/record-locker-url.service';
import { SessionService } from './generic/services/session.service';
import { ChangePasswordService } from './generic/services/change-password.service';
import { PasswordMeterService } from './generic/services/password-meter.service';
import { TableFunctionsService} from './generic/services/table-functions.service';

//DIRECTIVES
import { TooltipDirective } from 'ng2-tooltip-directive/components'
import { FormatterDirective } from './generic/directives/formatter.directive';
import { CharacterLimiterDirective } from './generic/directives/character-limiter.directive';
import { TrimmerDirective } from './generic/directives/trimmer.directive';
import { WidgetsComponent } from './generic/widgets/widgets.component';





@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        FileUploadComponent,
        SearchComponent,
        ControlMessages,
        HeaderComponent,
        MenuViewComponent,
        WelcomeComponent,
        FormatterDirective,
        PageNotFoundComponent,
        ErrorPageComponent,
        CharacterLimiterDirective,
        CharactersRemainingComponent,
        LoadingAnimationComponent,
        DatepickerComponent,
        TrimmerDirective,
        AlertModalComponent,
        ErrorHeaderComponent,
        PaginationComponent,
        TooltipDirective,
        UploadLightboxComponent,
        DashboardButtonComponent,
        SessionTimeoutModalComponent,
        XfsPageComponent,
        PrintModalComponent,
        GenericModalComponent,
        GenericTableComponent,
        WidgetsComponent,
       


    ],
    entryComponents: [
        WidgetsComponent
    ],
    imports: [
        ProgressHttpModule,
        TypeaheadModule,
        ModalModule,
        TabsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        DataTableModule,
        ROUTER_PROVIDER,
        ErrorHandlerModule,
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        CookieModule.forRoot(),
        BrowserAnimationsModule,
        CommonModule,
        DropdownModule,
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCG_DEfvNeplEfJBT62WR1a4YwlmipYbUY'
          }),
        QuillEditorModule,
        ChartsModule,
        NgDashboardModule
        
      

    ],
    providers: [
        { provide: APP_BASE_HREF, useFactory: baseUrl  },
        MenuResolver,
        DropdownResolver,
        DocumentREResolver,
        DocumentMCResolver,
        ConditionOfVehicleResolver,
        EquipmentAccesoriesResolver,
        ImprovementResolver,
        NegativeFactorsResolver,
        PositiveFactorsResolver,
        WarehouseResolver,
        InitService,
        MessageConfig,
        DashboardService,
        ValidationService,
        DataPasserService,
        FormatterService,
        DropdownService,
        HttpClient,
        AuthGuard,
        FormErrorHandlerService,
        DropdownValuesGetterService,
        FloatingButtonService,
        DateFormatterService,
        UserDetailsService,
        ClearSessionService,
        DeadlineColorService,
        HttpClient,
        AuthenticateService,
        TransactionTitlesService,
        RecordLockerUrlService,
        SessionService,
        ChangePasswordService,
        PasswordMeterService,
        TableFunctionsService,
        { provide: APP_INITIALIZER, useFactory: initFactory, deps: [InitService], multi: true,},
     
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }

export function initFactory(config: InitService) {
    return initLoad(config);
}

export function initLoad(mainConfigService) {
    return function () {
        return mainConfigService.load();
    };
};

export function theFactory(init: InitService){
    return () => init.load();
}

export function baseUrl(){   
    return  "/Appraisal/";
}


