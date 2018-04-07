import { GenerateCounterReceiptsComponent } from './../views/entries/generate-counter-receipts/generate-counter-receipts.component';
import { ViewEditInvDamageComponent } from './../views/tools/view-edit-inv-damage/view-edit-inv-damage.component';
import { ViewEditCounterReceiptsComponent } from './../views/tools/view-edit-counter-receipts/view-edit-counter-receipts.component';
import { InvDamageEntriesComponent } from './../views/entries/inv-damage-entries/inv-damage-entries.component';
import { LoginPageComponent } from './../views/login-page/login-page.component';
import { ProductsListComponent } from './../views/reports/products-list/products-list.component';
import { AgentListComponent } from './../views/reports/agent-list/agent-list.component';
import { CustomersListComponent } from './../views/reports/customers-list/customers-list.component';
import { SuppliersListComponent } from './../views/reports/suppliers-list/suppliers-list.component';
import { PurchaseReturnReportsComponent } from './../views/reports/purchase-return-reports/purchase-return-reports.component';
import { PurchaseReportsComponent } from './../views/reports/purchase-reports/purchase-reports.component';
import { SalesReturnReportsComponent } from './../views/reports/sales-return-reports/sales-return-reports.component';
import { SalesReportsComponent } from './../views/reports/sales-reports/sales-reports.component';
import { ChangePasswordComponent } from './../views/change-password/change-password.component';
import { ItemInOutComponent } from './../views/reports/item-in-out/item-in-out.component';
import { SupplierTransactionsComponent } from './../views/tools/supplier-transactions/supplier-transactions.component';
import { CustomerTransactionsComponent } from './../views/tools/customer-transactions/customer-transactions.component';
import { ViewEditPurchasesReturnComponent } from './../views/tools/view-edit-purchases-return/view-edit-purchases-return.component';
import { ViewEditPurchasesComponent } from './../views/tools/view-edit-purchases/view-edit-purchases.component';
import { ViewEditSalesReturnComponent } from './../views/tools/view-edit-sales-return/view-edit-sales-return.component';
import { ViewEditSalesComponent } from './../views/tools/view-edit-sales/view-edit-sales.component';
import { PurchaseReturnEntriesComponent } from './../views/entries/purchase-return-entries/purchase-return-entries.component';
import { PurchaseEntriesComponent } from './../views/entries/purchase-entries/purchase-entries.component';
import { SalesReturnEntriesComponent } from './../views/entries/sales-return-entries/sales-return-entries.component';
import { SalesEntriesComponent } from './../views/entries/sales-entries/sales-entries.component';

import { MenuResolver } from './../generic/menu.resolver';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//UNDER CONSTRUCTION PAGE
import { UnderConstructionComponent } from './../views/error-pages/under-construction/under-construction.component';

//COMPONENTS
import { HomeComponent } from '../home/home.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ErrorPageComponent} from '../generic/error-pages/generic-error-page/error-page.component'
import { PageNotFoundComponent} from '../generic/error-pages/page-not-found/page-not-found.component';
import { XfsPageComponent } from '../generic/xfs-page/xfs-page.component';

//RESOLVERS

import { DropdownResolver } from '../generic/resolver/dropdown.resolver';
import { ConditionOfVehicleResolver } from '../generic/resolver/condVech.resolver';
import { EquipmentAccesoriesResolver } from '../generic/resolver/equipAcc.resolver';
import { ImprovementResolver } from '../generic/resolver/improvement.resolver';
import { NegativeFactorsResolver } from '../generic/resolver/negFactors.resolver';
import { PositiveFactorsResolver } from '../generic/resolver/posFactors.resolver';
import { WarehouseResolver } from '../generic/resolver/warehouse.resolver';
import { DocumentREResolver } from '../generic/resolver/documentRE.resolver';
import { DocumentMCResolver } from '../generic/resolver/documentMC.resolver';
//GUARDS
import { AuthGuard } from '../generic/guards/auth.guard';
import { InventoryFileComponent} from '../views/files/inventory-file/inventory-file.component';
import { CustomerFileComponent } from './../views/files/customer-file/customer-file.component';
import { SupplierFileComponent } from './../views/files/supplier-file/supplier-file.component';
import { AgentFileComponent } from './../views/files/agent-file/agent-file.component';
import { CustomerBankFileComponent } from './../views/files/customer-bank-file/customer-bank-file.component';


export const routes: Routes = [

      //{ path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: '', component: LoginPageComponent},
      { path: 'xfs', component: XfsPageComponent },

      {
            path: 'home', component: HomeComponent,
            resolve:
                 { 
                       menu: MenuResolver
                 },
            children: [
                  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                  //TRANSACTION LIST
                  { path: 'welcome', component: WelcomeComponent },
                  { path: 'inventoryFile', component: InventoryFileComponent},
                  { path: 'customerFile', component: CustomerFileComponent},
                  { path: 'agentFile', component: AgentFileComponent},
                  { path: 'supplierFile', component: SupplierFileComponent},
                  { path: 'customerBankFile', component: CustomerBankFileComponent},

                  { path: 'salesEntries', component: SalesEntriesComponent},
                  { path: 'salesReturnEntries', component: SalesReturnEntriesComponent},
                  { path: 'purchaseEntries', component: PurchaseEntriesComponent},
                  { path: 'purchaseReturnEntries', component: PurchaseReturnEntriesComponent },
                  { path: 'invQuantityAdjEntries', component: UnderConstructionComponent},
                  { path: 'transferringStockEntries', component: UnderConstructionComponent},
                  { path: 'invDamageEntries', component: InvDamageEntriesComponent},
                  { path: 'generateSalesCounterReceipts', component: GenerateCounterReceiptsComponent},
                  { path: 'collectionFromCustomersEntries', component: UnderConstructionComponent},
                  { path: 'paymentToSuppliersEntries', component: UnderConstructionComponent},
                  

                  { path: 'viewEditSales', component: ViewEditSalesComponent},
                  { path: 'viewEditSalesReturns', component: ViewEditSalesReturnComponent},
                  { path: 'viewEditPurchases', component: ViewEditPurchasesComponent},
                  { path: 'viewEditPurchasesReturns', component: ViewEditPurchasesReturnComponent},
                  { path: 'customerTransactions', component: CustomerTransactionsComponent},
                  { path: 'supplierTransactions', component : SupplierTransactionsComponent},
                  { path: 'viewEditCounterReceipts', component: ViewEditCounterReceiptsComponent},
                  { path: 'viewEditQuantityStockAdjustments', component: UnderConstructionComponent},
                  { path: 'viewEditInventoryDamages', component: ViewEditInvDamageComponent},
                  { path: 'administratorControl', component: UnderConstructionComponent},
                  

                  { path: 'itemInOutTransactions', component : ItemInOutComponent},
                  { path: 'changePassword', component: ChangePasswordComponent},
                  { path: 'salesReports', component: SalesReportsComponent},
                  { path: 'salesReturnReports', component: SalesReturnReportsComponent},
                  { path: 'purchaseReports', component:PurchaseReportsComponent},
                  { path: 'purchaseReturnReports', component: PurchaseReturnReportsComponent},
                  { path: 'suppliersList', component: SuppliersListComponent},
                  { path: 'customersList', component: CustomersListComponent},
                  { path: 'agentList', component: AgentListComponent},
                  { path: 'productsList', component: ProductsListComponent},

                  { path: 'about', component: UnderConstructionComponent},
                  { path: 'contactUs', component: UnderConstructionComponent},

            ]
      },


];

export const ROUTER_PROVIDER: ModuleWithProviders = RouterModule.forRoot(routes);