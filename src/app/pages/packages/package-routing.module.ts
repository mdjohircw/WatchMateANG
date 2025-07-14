import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { PackageListComponent } from './package-list/package-list.component';
import { AddPackageComponent } from './add-package/add-package.component';
const routes: Routes = [
  {
    path: 'package-list',
    component: PackageListComponent,
    data: {
      title: 'Package-List',
    }
  },
    {
    path: 'add-package',
    component: AddPackageComponent,
    data: {
      title: 'Add-package',
    }
  },


  /*
  {
    path: 'approve/:id',  // Route for editing an existing customer
    component: ApproveLoanComponent,
    data: { title: 'Approve Loan' },
  },
    {
    path: 'condition',
    component: LoanTramsAndConditionComponent,
    data: {
      title: 'Add-loan',
    }
  },
  
  {
    path: 'add',
    component: AddLoansComponent,
    data: {
      title: 'Add-loan',
    }
  },
  {
    path: 'instalment',
    component: LoanInstalmentComponent,
    data: {
      title: 'Add-loan',
    }
  },
  {
    path: 'instalment/:id',
    component: LoanInstalmentComponent,
    data: {
      title: 'Add-loan',
    }
  },
  {
    path: 'all-instalmets',
    component: AllLoanInstalmentComponent,
    data: {
      title: 'All-recharge',
    }
  },
  {
    path: 'loan-list',
    component: LoanListComponent,
    data: {
      title: 'All-recharge',
    }
  },
    {
    path: 'customer-loan-list',
    component: LoanListCustomerComponent,
    data: {
      title: 'Loan-List',
    }
  },
     {
    path: 'customer-loan-request',
    component: LoanRequestListCustomerComponent,
    data: {
      title: 'Loan-requset-List',
    }
  },
    {
    path: 'loan-Application',
    component: LoanApplicationComponent,
    data: {
      title: 'All-recharge',
    }
  },
   */
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
