import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { RechargePaymentMethsComponent } from './settings/rechargePaymentMeths/rechargePaymentMeths.component';
import { RechargeAccountsComponent } from './settings/rechargeAccounts/rechargeAccounts.component';
import { CompanyComponent } from './settings/company/company.component';
import { VideoAddComponent } from './settings/video-add/video-add.component';
import { VideoListComponent } from './settings/video-list/video-list.component';

const routes: Routes = [

 
  {
    path:'company',
    component: CompanyComponent,
    data:{
      title:'company-settings'
    }
  },
  {
    path:'paymentMethod',
    component:RechargePaymentMethsComponent
  },
  {
    path:'recharge-accounts',
    component:RechargeAccountsComponent

  },
    {
    path:'add-video',
    component:VideoAddComponent,

  },
   {
    path:'video-list',
    component:VideoListComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
