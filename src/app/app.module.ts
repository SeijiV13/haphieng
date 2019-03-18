

//ANGULAR MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions, RequestOptions, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import {DropdownModule} from "ngx-dropdown";

//COMPONENTS
import { AppComponent } from './app.component';
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
import { TransactionTitlesService } from './generic/services/transaction-titles.service';
import { RecordLockerUrlService } from './generic/services/record-locker-url.service';
import { SessionService } from './generic/services/session.service';
import { ChangePasswordService } from './generic/services/change-password.service';
import { PasswordMeterService } from './generic/services/password-meter.service';
import { TableFunctionsService} from './generic/services/table-functions.service';
import { AuthenticationService } from './generic/services/http-services/authentication.service';

//DIRECTIVES
import { TooltipDirective } from 'ng2-tooltip-directive/components'
import { FormatterDirective } from './generic/directives/formatter.directive';
import { CharacterLimiterDirective } from './generic/directives/character-limiter.directive';
import { TrimmerDirective } from './generic/directives/trimmer.directive';
import { WidgetsComponent } from './generic/widgets/widgets.component';
import { InventoryFileComponent } from './views/files/inventory-file/inventory-file.component';
import { CustomerFileComponent } from './views/files/customer-file/customer-file.component';
import { AgentFileComponent } from './views/files/agent-file/agent-file.component';
import { SupplierFileComponent } from './views/files/supplier-file/supplier-file.component';
import { CustomerBankFileComponent } from './views/files/customer-bank-file/customer-bank-file.component';
import { AddProductComponent } from './views/transaction-modals/add-product/add-product.component';
import { AddCustomerComponent } from './views/transaction-modals/add-customer/add-customer.component';
import { AddSupplierComponent } from './views/transaction-modals/add-supplier/add-supplier.component';
import { AddAgentComponent } from './views/transaction-modals/add-agent/add-agent.component';
import { SalesEntriesComponent } from './views/entries/sales-entries/sales-entries.component';
import { AddSalesEntryComponent } from './views/transaction-modals/add-sales-entry/add-sales-entry.component';
import { SuspendedSalesComponent } from './views/transaction-modals/suspended-sales/suspended-sales.component';
import { SalesReturnEntriesComponent } from './views/entries/sales-return-entries/sales-return-entries.component';
import { PurchaseEntriesComponent } from './views/entries/purchase-entries/purchase-entries.component';
import { PurchaseReturnEntriesComponent } from './views/entries/purchase-return-entries/purchase-return-entries.component';
import { ViewEditSalesComponent } from './views/tools/view-edit-sales/view-edit-sales.component';
import { ViewEditSalesReturnComponent } from './views/tools/view-edit-sales-return/view-edit-sales-return.component';
import { ViewEditPurchasesComponent } from './views/tools/view-edit-purchases/view-edit-purchases.component';
import { ViewEditPurchasesReturnComponent } from './views/tools/view-edit-purchases-return/view-edit-purchases-return.component';
import { CustomerTransactionsComponent } from './views/tools/customer-transactions/customer-transactions.component';
import { SupplierTransactionsComponent } from './views/tools/supplier-transactions/supplier-transactions.component';
import { ItemInOutComponent } from './views/reports/item-in-out/item-in-out.component';
import { ItemInOutModalComponent } from './views/transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { SalesReportsComponent } from './views/reports/sales-reports/sales-reports.component';
import { SalesReturnReportsComponent } from './views/reports/sales-return-reports/sales-return-reports.component';
import { PurchaseReportsComponent } from './views/reports/purchase-reports/purchase-reports.component';
import { PurchaseReturnReportsComponent } from './views/reports/purchase-return-reports/purchase-return-reports.component';
import { FieldGeneratorComponent } from './views/reports/report-fields/field-generator/field-generator.component';
import { CustomersListComponent } from './views/reports/customers-list/customers-list.component';
import { SuppliersListComponent } from './views/reports/suppliers-list/suppliers-list.component';
import { AgentListComponent } from './views/reports/agent-list/agent-list.component';
import { ProductsListComponent } from './views/reports/products-list/products-list.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LineChartComponent } from './welcome/charts/line-chart/line-chart.component';
import { BarChartComponent } from './welcome/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './welcome/charts/pie-chart/pie-chart.component';
import { UnderConstructionComponent } from './views/error-pages/under-construction/under-construction.component';
import { InvDamageEntriesComponent } from './views/entries/inv-damage-entries/inv-damage-entries.component';
import { ViewEditCounterReceiptsComponent } from './views/tools/view-edit-counter-receipts/view-edit-counter-receipts.component';
import { ViewEditInvDamageComponent } from './views/tools/view-edit-inv-damage/view-edit-inv-damage.component';
import { GenerateCounterReceiptsComponent } from './views/entries/generate-counter-receipts/generate-counter-receipts.component';
import { ViewCounterReceiptsModalComponent } from './views/entries/generate-counter-receipts/view-counter-receipts-modal/view-counter-receipts-modal.component';
import { ViewReceiptItemsModalComponent } from './views/tools/view-edit-counter-receipts/view-receipt-items-modal/view-receipt-items-modal.component';
import { SupplierService } from './web-services/supplier.service';
import { ProductsService } from './web-services/products.service';
import { AgentService } from './web-services/agent.service';
import { CustomerService } from './web-services/customer.service';
import { InvQuantityAdjustmentsEntriesComponent } from './views/entries/inv-quantity-adjustments-entries/inv-quantity-adjustments-entries.component';
import { SalesService } from './web-services/sales.service';
import { PurchaseService } from './web-services/purchase.service';
import { DamageService } from './web-services/damage.service';
import { ViewEditInvAdjComponent } from './views/tools/view-edit-inv-adj/view-edit-inv-adj.component';
import { ViewItemsComponent } from './views/transaction-modals/view-items/view-items.component';
import { TransferringStockComponent } from './views/entries/transferring-stock/transferring-stock.component';
import { CollectionFromCustomersEntriesComponent } from './views/entries/collection-from-customers-entries/collection-from-customers-entries.component';
import { PaymentToSuppliersEntriesComponent } from './views/entries/payment-to-suppliers-entries/payment-to-suppliers-entries.component';
import { AddPaymentComponent } from './views/transaction-modals/add-payment/add-payment.component';
import { AddCheckComponent } from './views/transaction-modals/add-check/add-check.component';
import { AddDiscountComponent } from './views/transaction-modals/add-discount/add-discount.component';
import { PaymentSuppliersEntriesComponent } from './views/entries/payment-suppliers-entries/payment-suppliers-entries.component';
import { AdministratorControlComponent } from './views/tools/administrator-control/administrator-control.component';
import { GeneratedReceiptsService } from './web-services/generated-receipts.service';



@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
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
        InventoryFileComponent,
        CustomerFileComponent,
        AgentFileComponent,
        SupplierFileComponent,
        CustomerBankFileComponent,
        AddProductComponent,
        AddCustomerComponent,
        AddSupplierComponent,
        AddAgentComponent,
        SalesEntriesComponent,
        AddSalesEntryComponent,
        SuspendedSalesComponent,
        SalesReturnEntriesComponent,
        PurchaseEntriesComponent,
        PurchaseReturnEntriesComponent,
        ViewEditSalesComponent,
        ViewEditSalesReturnComponent,
        ViewEditPurchasesComponent,
        ViewEditPurchasesReturnComponent,
        CustomerTransactionsComponent,
        SupplierTransactionsComponent,
        ItemInOutComponent,
        ItemInOutModalComponent,
        ChangePasswordComponent,
        SalesReportsComponent,
        SalesReturnReportsComponent,
        PurchaseReportsComponent,
        PurchaseReturnReportsComponent,
        FieldGeneratorComponent,
        CustomersListComponent,
        SuppliersListComponent,
        AgentListComponent,
        ProductsListComponent,
        LoginPageComponent,
        LineChartComponent,
        BarChartComponent,
        PieChartComponent,
        UnderConstructionComponent,
        InvDamageEntriesComponent,
        ViewEditCounterReceiptsComponent,
        ViewEditInvDamageComponent,
        GenerateCounterReceiptsComponent,
        ViewCounterReceiptsModalComponent,
        ViewReceiptItemsModalComponent,
        InvQuantityAdjustmentsEntriesComponent,
        ViewEditInvAdjComponent,
        ViewItemsComponent,
        TransferringStockComponent,
        CollectionFromCustomersEntriesComponent,
        PaymentToSuppliersEntriesComponent,
        AddPaymentComponent,
        AddCheckComponent,
        AddDiscountComponent,
        PaymentSuppliersEntriesComponent,
        AdministratorControlComponent,
      
       


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
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        CookieModule.forRoot(),
        BrowserAnimationsModule,
        CommonModule,
        DropdownModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCG_DEfvNeplEfJBT62WR1a4YwlmipYbUY'
          }),
        QuillEditorModule,
        ChartsModule,
        NgDashboardModule,
     
        
      

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
        TransactionTitlesService,
        RecordLockerUrlService,
        SessionService,
        ChangePasswordService,
        PasswordMeterService,
        TableFunctionsService,
        AuthenticationService,
        ProductsService,
        AgentService,
        SupplierService,
        CustomerService,
        SalesService,
        PurchaseService,
        DamageService,
        GeneratedReceiptsService,
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
    return  "/";
}


