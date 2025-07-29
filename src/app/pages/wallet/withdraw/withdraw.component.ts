import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { IApiResponse } from 'src/app/core/models/interfaces/IApiResponse';
import { LoanService } from 'src/app/core/services/LoanService';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { RechargeService } from 'src/app/core/services/recharge.service';
import { ICustomerIDName } from 'src/app/core/models/interfaces/ICustomerIDName';
import Swal from 'sweetalert2';
import { WithdrawService } from 'src/app/core/services/withdraw.service';
import { commonTaskService } from 'src/app/core/services/commonTaskService';

@Component({
  selector: 'app-reachrage',
  standalone: false,

  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent implements OnInit {


selectedTabIndex = 0;
withdrawAmount: number = 0;
txtAccountNo: string = '';
isSubmitting = false;
dataAccessLevel: number = 0;
  form: any;

  constructor(private fb: FormBuilder, private withdrawService: WithdrawService, private message: NzMessageService, private comonService : commonTaskService) {}

  ngOnInit(): void {
      this.getCustommer();
  this.dataAccessLevel = Number(sessionStorage.getItem('__DataAccessLevel__'));


  }
copyNumber(number: string): void {
  navigator.clipboard.writeText(number);
  // Optionally: show toast
}

clearForm(): void {
  this.withdrawAmount = 0;
  this.txtAccountNo = '';
}

submit(): void {
  if (!this.withdrawAmount || !this.txtAccountNo) {
    return;
  }
  const dataAccessLevel = Number(sessionStorage.getItem('__DataAccessLevel__'));
  let customerId: number;

  if (dataAccessLevel === 1) {
    customerId = Number(sessionStorage.getItem('__customerID__'));
  } else {
    customerId = this.form.get('ddlCustommer')?.value; // Assuming you're using Reactive Forms
  }
  
  const userId = Number(sessionStorage.getItem('__useId__'));
    const postData = {
    custommerID: customerId,
    userId: userId,
    paymentMethodID: this.selectedTabIndex === 0 ? 1 : 2,
    amount: this.withdrawAmount,
    accountNumber: this.txtAccountNo,
  };
  this.isSubmitting = true;
  this.withdrawService.saveWithdrawRequest(postData).subscribe({
    next: (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'withdraw request submitted successfully!'
      });
      this.isSubmitting = false;
    },
    error: () => {
      this.isSubmitting = false;
    }
  });
}





 
 CustomerIdName: { customerID: number, fullName: string }[] = [];

  selectCustomer: number = 0;
  getCustommer() {
    this.comonService.getCustommerIdName().subscribe(
      (response: IApiResponse<ICustomerIDName[]>) => {
        if (response.statusCode === 200) {

          this.CustomerIdName = [{ customerID: null, fullName: '-----Select----' }, ...response.data];
          this.selectCustomer = null;
        } else {
          console.error('Error fetching employees:', response.message);
        }
      },
      error => {
        console.error('API Error:', error);
      }
    );
  }
  


}