import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from 'src/app/core/services/leave.service';
import { ILoanApplication } from 'src/app/core/models/interfaces/ILoanApplication';
import { IApiResponse } from 'src/app/core/models/interfaces/IApiResponse';
import Swal from 'sweetalert2';
import { ILeaveData } from 'src/app/core/models/interfaces/ILeave-data';
import { Router } from '@angular/router';
import { ILoanInstalmentDetails } from 'src/app/core/models/interfaces/ILoanInstalmentDetails';
import { PackageService } from 'src/app/core/services/package.service';
import { DateTimeFormat } from 'intl';
@Component({
  selector: 'upcoming-loan-instalment',
  standalone: false,
  templateUrl: './upcoming-instalment.component.html',
  styleUrl: './upcoming-instalment.component.css'
})
export class UpcomingInstalmentComponent implements OnInit{
isLoading = true;
  showContent = false;
  value = '';
  statusFilter = 'All'; 
  searchAny = '';
  dataType: string = 'allDatas';
 
  allDatas: ILoanInstalmentDetails[] = []; // Store original data
  datas: ILoanInstalmentDetails[] = []; // Store filtered data

   listOfCurrentPageData: readonly ILoanInstalmentDetails[] = [];
  filterDate: string = '';
  constructor(private router: Router , private PackageService: PackageService,) {}

  ngOnInit(): void {
    // this.loadData();

        const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(today.getDate()).padStart(2, '0');

    this.filterDate = `${year}-${month}-${day}`;
    this.getLoanInstalments(this.filterDate);

  }

/*   loadData() {
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
 */
getLoanInstalments(date: any): void {
  this.isLoading = true;
  this.showContent = false; // Hide content during loading

  setTimeout(() => {
    this.PackageService.getCustomerPackageByCustomerID().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.allDatas = response.data;
          this.isLoading = false;
          this.showContent = true;
        }
      },
      error: (err) => {
        console.error('Failed to load recharge data:', err);
        this.allDatas = [];
        this.datas = [];
        this.isLoading = false;
        this.showContent = true;
      }
    });
  }, 500); // Optional: small delay to simulate loading
}

// ✅ Now separate methods properly outside of getLoanInstalments
onCurrentPageDataChange(listOfCurrentPageData: readonly ILoanInstalmentDetails[]): void {
  this.listOfCurrentPageData = listOfCurrentPageData;
}

filterByAnyMetchingData(): void {
  const searchTerm = this.searchAny.toLowerCase().trim();

  if (!searchTerm) {
    this.datas = [...this.allDatas]; // Reset if search is empty
    return;
  }

  this.datas = this.allDatas.filter(leave =>
    Object.values(leave).some(value =>
      value?.toString().toLowerCase().includes(searchTerm)
    )
  );
}

/*   filterByStatus() {
    if (this.statusFilter === 'All') {
      this.leaves = [...this.allLeaves]; // Reset to original list
      return;
    }

    this.leaves = this.allLeaves.filter(leave => {
      const statusLabel = leave.approvalStatus === null ? 'Pending' :
                          leave.approvalStatus === 0 ? 'Processing' :
                          leave.approvalStatus === 1 ? 'Approve' : // Assuming 'Approve' is 'Active'
                          leave.approvalStatus === 2 ? 'Reject' : 'NA';

      this.dataType = 'leaves'
      return statusLabel === this.statusFilter;
    });
  } */

}
