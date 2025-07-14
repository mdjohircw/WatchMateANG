import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CustommerListComponent } from './custommer-list/custommer-list.component';
import { CustommerProfileComponent } from './custommer-profile/custommer-profile.component';

import { CustomerAddGuard, CustomerProfileMatch } from 'src/app/core/guards/router.guard';

const routes: Routes = [
  


  {
    path: 'list',
    component:CustommerListComponent ,
    data: {
      title: 'Wizard One',
    },
 
  },
  {
    path: 'profile',
    component:CustommerProfileComponent ,
    canMatch: [CustomerProfileMatch],
    data: {
      title: 'Wizard One',
    },
 
  },
  {
    path: 'profile/:id',
    component:CustommerProfileComponent,
    data: {
      title: 'Wizard One',
    },
 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustommerRoutingModule { }
