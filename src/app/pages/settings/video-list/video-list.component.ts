import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/core/services/package.service';
import { SettingsService } from 'src/app/core/services/settingsService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-list',
  standalone: false,
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent {
isLoading = true;
  showContent = true;
  value = '';
  statusFilter = 'All'; 
  searchAny = '';
  dataType: string = 'allDatas';
 
  allDatas: any[] = []; 
  datas: any[] = []; 
  constructor(private fb: UntypedFormBuilder,private http: HttpClient, private Package: PackageService ,private router: Router,private settingsService : SettingsService) {}

  ngOnInit(): void {
    this.getPackageRequests();
  }

    loadData() {
      setTimeout(() => {
        this.isLoading = false;
        this.showContent = true;
      }, 500);
    }

    getPackageRequests(): void {
      this.settingsService.getVideoList().subscribe({
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
    }
  

    editcustommer(planId: any) {
      console.log("Edit Customer clicked", planId);
      this.router.navigate([`/plans/update`, planId]);  // Adjusted to match lazy-loaded route
    }
  
  
      edit(ApplicationID: any) {
        console.log("Edit Leave clicked", ApplicationID);
        // Open a modal or navigate to the edit leave page with leave details
    
        this.router.navigate([`/loan/approve`, ApplicationID]); 
      }
    
        OnEditClick(withdrawId: any) {
       
        this.router.navigate([`/wallet/withdraw-update`, withdrawId]); 
      }

  onPackageApproveClick(ID: number, status: number): void {
    const actionMessage =
      status === 1
        ? 'Are you sure! you want to approve this request?'
        : 'Are you sure! you want to Reject this request?';

    Swal.fire({
      title: actionMessage,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
          CustomerPackageId: ID,
          Status: status,
        };

        console.log('Submitting form data:', formData);

        this.Package.approvePackageApplication(formData).subscribe({
          next: (response) => {
            console.log('Request processed successfully:', response);
            this.getPackageRequests(); // Refresh table
          },
          error: (error) => {
            console.error('Error processing request:', error);
          },
        });
      }
    });
  }


  deletecustommer(customerId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.DeleteVideo(customerId).subscribe({
          next: (response: any) => {
            if (response?.statusCode === 200) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Video deleted successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then(() => {
                this.ngOnInit(); // Refresh your customer list or data view
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: response?.message || 'Unexpected response while deleting Paln.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          },
          error: (error) => {
            if (error.status === 400) {
              Swal.fire({
                title: 'Error!',
                text: error.error?.message || 'Bad request while deleting the Paln.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred while deleting the Paln.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          },
        });
      }
    });
  }
}
