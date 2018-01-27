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
import { MenuResolver } from '../generic/menu.resolver';
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


export const routes: Routes = [

      { path: 'login', component: LoginComponent },
      { path: 'Appraisal', component: LoginComponent },
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'xfs', component: XfsPageComponent },
      {
            path: 'home', component: HomeComponent,
            resolve: {
                  menu: MenuResolver,
                  dropdowns: DropdownResolver,
                  negFactors: NegativeFactorsResolver,
                  posFactors: PositiveFactorsResolver,
                  MCEquipAcc: EquipmentAccesoriesResolver,
                  MCCondVech: ConditionOfVehicleResolver,
                  WareHouseDet: WarehouseResolver,
                  Improvements: ImprovementResolver,
                  REDocuments: DocumentREResolver,
                  MCDocuments: DocumentMCResolver
            },
            canActivateChild: [AuthGuard],
            children: [
                  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                  { path: 'error', component: ErrorPageComponent },
                  //TRANSACTION LIST
                  { path: 'createRequestRE', component: WelcomeComponent },

            ]
      },
      //WHEN ROUTE IS NOT FOUND
      { path: 'error', component: ErrorPageComponent },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', redirectTo: "/404" }

];

export const ROUTER_PROVIDER: ModuleWithProviders = RouterModule.forRoot(routes);