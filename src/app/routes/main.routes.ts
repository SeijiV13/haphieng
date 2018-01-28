
import { MenuResolver } from './../generic/menu.resolver';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


//COMPONENTS
import { LoginComponent } from '../login/login.component';
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

      { path: '', redirectTo: 'home', pathMatch: 'full' },
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
                  { path: 'customerBankFile', component: CustomerBankFileComponent}

            ]
      },


];

export const ROUTER_PROVIDER: ModuleWithProviders = RouterModule.forRoot(routes);