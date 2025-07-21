import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { PackageService } from 'src/app/core/services/package.service';
import { Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-package',
  standalone: false,
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent implements OnInit{
 isLoading = true;
  showContent = false;
  pricing: any[] = []; // Store the cards data

  constructor(private fb: UntypedFormBuilder,private http: HttpClient, private Package: PackageService ,private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    setTimeout(() => {
    this.getPackageRequests();
      this.showContent = true;
    }, 500);
  }


getPackageRequests(): void {
  this.Package.getPackageList().subscribe({
    next: (response) => {
      if (response.statusCode === 200) {
        this.pricing = response.data.map((item: any) => ({
          packageId: item.packageId,
          planName: item.packageName,
          price: item.price,
          billingType: `Valid ${item.validityDays} Days`,
          userCount: `Daily ${item.maxDailyViews} Views`,
          features: [
            `Per Ad Reward: $${item.perAdReward}`,
            `Validity: ${item.validityDays} Days`,
            `Max Daily Views: ${item.maxDailyViews}`,
            `Status: ${item.status === 1 ? 'Active' : 'Inactive'}`
          ],
          buttonText: 'Buy Now'
        }));
        this.isLoading = false;
        this.showContent = true;
      }
    },
    error: (err) => {
      console.error('Failed to load package data:', err);
      this.pricing = [];
      this.isLoading = false;
      this.showContent = true;
    }
  });
}

  

  BuyNowPackage(planId: any) {
    console.log("Edit Customer clicked", planId);
    this.router.navigate([`/plans/update`, planId]);  // Adjusted to match lazy-loaded route
  }
isVisible = false;
transactionId = '';
selectedPackageId: number | null = null;
selectedPackageprice: number | null = null;
selectedPackageName: string = '';
selectedTabIndex: number = 0;

/* openModal(): void {
  this.isVisible = true;
}
 */
isSubmitting: boolean = false;

submit(): void {
  if (!this.selectedPackageId) {
    Swal.fire({
      icon: 'warning',
      title: 'No Package Selected',
      text: 'Please select a package before submitting.'
    });
    return;
  }

if (this.selectedTabIndex === null) {
  Swal.fire({
    icon: 'warning',
    title: 'No Payment Method Selected',
    text: 'Please select a payment method.'
  });
  return;
}
  const customerId = Number(sessionStorage.getItem('__customerID__'));
  const userId = Number(sessionStorage.getItem('__useId__'));

  const postData = {
    customerId: customerId,
    userId: userId,
    packageId: this.selectedPackageId,
    status: 1, // Assuming you want to set it active
    payMethodID: this.selectedTabIndex === 0 ? 1 : 2,
    transctionCode: this.transactionId || '' // You can set this value from your form input
  };

  this.isSubmitting = true;
  this.Package.savePackageRequest(postData).subscribe({
    next: (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Package request submitted successfully!'
      });
      this.isSubmitting = false;
      this.isVisible = false; // Close modal after success
    },
    error: () => {
      this.isSubmitting = false;
    }
  });
}


openModal(packages: any): void {
  this.selectedPackageId = packages.packageId;
  this.selectedPackageName = packages.planName;
  this.selectedPackageprice = packages.price;
  this.isVisible = true;

  console.log('Selected Package Id ', this.selectedPackageId)
}

handlesCancel(): void {
  this.isVisible = false;
}

/* handleConfirm(): void {
  if (this.selectedTabIndex === 0) {
    if (!this.transactionIdNagad) {
      alert('Please enter Nogod Transaction ID');
      return;
    }
    console.log('Nogod Transaction ID:', this.transactionIdNagad);
  } else if (this.selectedTabIndex === 1) {
    if (!this.transactionIdBkash) {
      alert('Please enter Bkash Transaction ID');
      return;
    }
    console.log('Bkash Transaction ID:', this.transactionIdBkash);
  }
  this.isVisible = false;
} */


copyNumber(number: string): void {
  navigator.clipboard.writeText(number).then(() => {
    alert('Number copied to clipboard!');
  });
}

}
