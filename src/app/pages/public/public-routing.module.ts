import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    data: {
      title: 'Home-Page',
    }
  },
 


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
