import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { PackageService } from 'src/app/core/services/package.service';
import { Router, Routes } from '@angular/router';
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
selectedTabIndex = 0; // 0 = Nogod, 1 = Bkash
transactionIdNagad = '';
transactionIdBkash = '';

openModal(): void {
  this.isVisible = true;
}

handlesCancel(): void {
  this.isVisible = false;
}

handleConfirm(): void {
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
}
}
