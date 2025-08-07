import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { LoanPlanService } from 'src/app/core/services/loanPlanService';
import Swal from 'sweetalert2';
import { ActivatedRoute ,Router} from '@angular/router';

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
  selector: 'update-app-loan-plans',
  standalone: false,
  templateUrl: './update-loan-plans.component.html',
  styleUrl: './update-loan-plans.component.css'
})
export class UpdateLoanPlansComponent {
isLoading = true;
  showContent = false;
  constructor(private fb: UntypedFormBuilder,private http: HttpClient , private LoanpPlan : LoanPlanService, private router: ActivatedRoute,  private route: Router
  ) {}
  

  ngOnInit(): void {


  this.router.paramMap.subscribe(params => {
    const planIdParam = params.get('id'); // assuming route is like /loan-plan/:id
    const planID = planIdParam ? +planIdParam : null;

    if (planID) {
      this.getLoanPlanByeId(planID);
    } else {
      console.warn('Invalid or missing plan ID in route.');
    }
  });


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
  


  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon= {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }
    const planData = {
    packageName: this.validateForm.value.txtPlanName,
    price: +this.validateForm.value.txtPriceAmount,
    validityDays: +this.validateForm.value.txtValidatyDay,
    maxDailyViews: +this.validateForm.value.txtmaxDailyViews,
    perAdReward: +this.validateForm.value.txtperAdReward,
    status: this.validateForm.value.rdlIsActive === 1 ? 1 : 0,
    userId: 1 // You can replace this with the current user ID dynamically if needed
  };
    this.isLoading = true;
    this.router.paramMap.subscribe(params => {
      const planIdParam = params.get('id'); // assuming route is like /loan-plan/:id
      const planID = planIdParam ? +planIdParam : null;
  
      if (planID) {
        this.LoanpPlan.UpdatePlan(planData,planID).subscribe({
          next: (response) => {
            this.isLoading = false;
            Swal.fire('Success', 'plan Update successfully!', 'success');
            this.validateForm.reset();
            this.route.navigate(['/plans/loan-plan-list']);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error submitting loan plan:', error);
          }
        });
      } else {
        console.warn('Invalid or missing plan ID in route.');
      }
    });
  



  }
  
  getLoanPlanByeId(planID: number): void {
    console.log("Fetching Loan Plan ID:", planID);
  
    this.LoanpPlan.getLoanPlanById(planID).subscribe(
      (response) => {
        if (response && response.statusCode === 200 && response.data) {
          const loanPlan = response.data;
          this.populateLoanPlanForm(loanPlan);
        } else {
          console.warn('No loan plan data found for the provided ID.');
        }
      },
      (error) => {
        console.error('Error fetching loan plan:', error);
      }
    );
  }
  
    populateLoanPlanForm(data: any): void {
      this.validateForm.patchValue({
        txtPlanName: data.packageName,          // packageName → txtPlanName
        txtPriceAmount: data.price,             // price → txtPriceAmount
        txtValidatyDay: data.validityDays,      // validityDays → txtValidatyDay
        txtmaxDailyViews: data.maxDailyViews,   // maxDailyViews → txtmaxDailyViews
        txtperAdReward: data.perAdReward,       // perAdReward → txtperAdReward
        rdlIsActive: data.status                // status → rdlIsActive (1 = active)
      });
    }

  
  


}
