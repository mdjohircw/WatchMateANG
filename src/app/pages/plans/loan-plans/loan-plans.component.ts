import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { LoanPlanService } from 'src/app/core/services/loanPlanService';
import Swal from 'sweetalert2';
interface Person {
  id: string;
  name: string;
  shipment: string;
  department: string;
  employeeCode: string;
  joinDate: string;
  status: string;
}
@Component({
  selector: 'app-loan-plans',
  standalone: false,
  templateUrl: './loan-plans.component.html',
  styleUrl: './loan-plans.component.css'
})
export class LoanPlansComponent {
isLoading = true;
  showContent = false;
  constructor(private fb: UntypedFormBuilder,private http: HttpClient , private LoanPlan : LoanPlanService) {}

ngOnInit(): void {
  this.isLoading = false;
  this.showContent = true;

  this.validateForm = this.fb.group({
    txtPlanName: [null, [Validators.required]],          // Plan Name → packageName
    txtPriceAmount: [null, [Validators.required]],       // Price → price
    txtValidatyDay: [null, [Validators.required]],       // Validity Days → validityDays
    txtmaxDailyViews: [null, [Validators.required]],     // Max Daily Views → maxDailyViews
    txtperAdReward: [null, [Validators.required]],       // Per Ad Reward → perAdReward
    rdlIsActive: new FormControl(1, [Validators.required]) // isActive (radio)
  });
}

  



  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }




  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon= {
    type: 'info-circle',
    theme: 'twotone'
  };
submitForm(): void {
  if (this.validateForm.invalid) {
    Object.values(this.validateForm.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    return;
  }

  const formData = {
    packageName: this.validateForm.value.txtPlanName,
    price: +this.validateForm.value.txtPriceAmount,
    validityDays: +this.validateForm.value.txtValidatyDay,
    maxDailyViews: +this.validateForm.value.txtmaxDailyViews,
    perAdReward: +this.validateForm.value.txtperAdReward,
    isActive: this.validateForm.value.rdlIsActive === 1 ? 1 : 0,
    userId: 1 // You can replace this with the current user ID dynamically if needed
  };

  this.isLoading = true;

  this.LoanPlan.saveLoanPlan(formData).subscribe({
    next: () => {
      this.isLoading = false;
      Swal.fire('Success', 'Package submitted successfully!', 'success');
      this.validateForm.reset();
    },
    error: (err) => {
      this.isLoading = false;
      Swal.fire('Error', 'Failed to submit package', 'error');
      console.error(err);
    }
  });
}

  

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }




  //Company List Start 

  
    value = '';
      statusFilter = '';
      contactSearchValue = '';
      people: Person[] = [];
      filteredPeople: Person[] = [];

    
      searchById(): void {
        if (this.value) {
          this.filteredPeople = this.people.filter(
            (person) => person.id === this.value
          );
        } else {
          this.filteredPeople = this.people;
        }
      }
    
      filterByContact(): void {
        this.filteredPeople = this.applyFilters();
      }
    
      filterByStatus(): void {
        this.filteredPeople = this.applyFilters();
      }
    
      private applyFilters(): Person[] {
        return this.people.filter((person) =>
          person.name.toLowerCase().includes(this.contactSearchValue.toLowerCase())
          && (this.statusFilter === 'all' || person.status.toLowerCase() === this.statusFilter.toLowerCase())
        );
      }



}
