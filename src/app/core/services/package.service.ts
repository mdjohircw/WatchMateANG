
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { IPaginatedResponse } from '../models/interfaces/Ipaginated-response';
import { response } from 'express';
import { GenericHttpService } from './generic-http.service';
import { IApiResponse } from '../models/interfaces/IApiResponse';

import Swal from 'sweetalert2';
import { id } from 'date-fns/locale';
import { url } from 'inspector';
@Injectable({
    providedIn: 'root'
  })
export class PackageService {

    private userId: string | null;
    private customerId: string | null;
    private dataAccessLevel: string | null;
    private GET_PACKAGE_REQUEST = `api/Package/packages`;
    private GET_REQUEST_BYE_CUSTOMER = `api/Recharge/requerts-ByeCustomerId`;
    private POST_PACKAGE_REQUEST  = `api/CustomerPackage/create`;
    private PUR_RECHARGE_REQUEST = `api/Recharge/update`;
    private PUT_RECHARGE_APPROVE = `api/Recharge/approve`;
    private GET_RECHARGE_BYE_ID = `api/Recharge/recharge`;
    private GET_PACKGE_BYE_CUSTOMERID = `api/CustomerPackage/get-customer-package`;
    private GET_VIDEO_BYE_CUSTOMERID = `api/Video/videos`;
    private POST_VIDEO_REWARD = `api/Video/videos/reward?`;

    constructor(private genericHttpService: GenericHttpService<any>) { 
      this.userId = sessionStorage.getItem('__useId__');
      this.customerId = sessionStorage.getItem('__customerID__');
      this.dataAccessLevel = sessionStorage.getItem('__DataAccessLevel__');

    }
    getRechargeListById(id:any): Observable<any> {
      return this.genericHttpService.getById<any>(this.GET_RECHARGE_BYE_ID, id).pipe(
          map((response: any) => {
              if (response) {
                  return response;
              } else {
                  return { statusCode: 500, message: 'Invalid response', data: [] };
              }
          })
      );
  }
    getPackageList(): Observable<any> {
      return this.genericHttpService.getAll<any>(`${this.GET_PACKAGE_REQUEST}`).pipe(
        map((response: any) => {
          if (response && response.statusCode === 200 && Array.isArray(response.data)) {
            return response;
          } else {
            return { statusCode: 500, message: 'Invalid response', data: [] };
          }
        })
      );
    }
    getCustomerVideos(): Observable<any> {
      return this.genericHttpService.getById<any>(`${this.GET_VIDEO_BYE_CUSTOMERID}`,this.customerId).pipe(
        map((response: any) => {
          if (response && response.statusCode === 200 && Array.isArray(response.data)) {
            return response;
          } else {
            return { statusCode: 500, message: 'Invalid response', data: [] };
          }
        })
      );
    }
    
    getCustomerPackageByCustomerID(): Observable<any> {
      let url: string;
      if (this.dataAccessLevel === '1') {
        url = `${this.GET_PACKGE_BYE_CUSTOMERID}?customerId=${this.customerId}`;
      } else {
        url = `${this.GET_PACKGE_BYE_CUSTOMERID}`; // For full data when customerId not required
      }
      return this.genericHttpService.getAll<any>(url).pipe(
        map((response: any) => {
          if (response && response.statusCode === 200 && Array.isArray(response.data)) {
            return response;
          } else {
            return { statusCode: 500, message: 'Invalid response', data: [] };
          }
        })
      );
    }

    savePackageRequest(postData: any): Observable<any> {
      const url = `${this.POST_PACKAGE_REQUEST}`; // Use template literal for better readability
      return this.genericHttpService.create(url, postData).pipe(
        catchError((error) => {
          console.error('Error occurred while saving Loan application:', error);
          const errorMessage = error?.error?.message || 'Failed to submit loan. Please try again.';
             console.log(errorMessage);
             Swal.fire({
               icon: 'error',
               title: 'Submission Failed',
               text: errorMessage
             });
          return throwError(() => new Error('Failed to save Loan application'));
        })
      );
    }

    saveVideoReward(postData: any): Observable<any> {
      const url = `${this.POST_VIDEO_REWARD}`; // Use template literal for better readability
      return this.genericHttpService.create(url, postData).pipe(
        catchError((error) => {
          console.error('Error occurred while saving Loan application:', error);
          const errorMessage = error?.error?.message || 'Failed to submit loan. Please try again.';
             console.log(errorMessage);
             Swal.fire({
               icon: 'warning',
               title: 'Submission Failed',
               text: errorMessage
             });
          return throwError(() => new Error('Failed to save Loan application'));
        })
      );
    }

}