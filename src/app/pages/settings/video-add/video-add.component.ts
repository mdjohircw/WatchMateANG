import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IApiResponse } from 'src/app/core/models/interfaces/IApiResponse';
import { PackageService } from 'src/app/core/services/package.service';
import { SettingsService } from 'src/app/core/services/settingsService';

@Component({
  selector: 'app-video-add',
  standalone: false,
  templateUrl: './video-add.component.html',
  styleUrl: './video-add.component.css'
})
export class VideoAddComponent implements OnDestroy {
 isLoading = true;
  showContent = false;
  allDatas: any[] = []; 
  datas: any[] = [];
  form: any;

  constructor(private fb: UntypedFormBuilder,private http: HttpClient, private settingsService : SettingsService ,private message: NzMessageService,private packages :PackageService) {}

  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon= {
    type: 'info-circle',
    theme: 'twotone'
  };
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
  ngOnInit(): void {
/*     this.getPaymentMethod(); */

    this.validateForm = this.fb.group({
      txtTitle: [null, [Validators.required]],
      txtStartDate: [null, [Validators.required]],
      txtEndDate: [null, [Validators.required]],
      txtperAdReward: [null, [Validators.required]],
      rdlIsActive: [1, [Validators.required]],
      ddlPackages: [[], [Validators.required]] // Important: array for multi-select

    });
    this.loadData();
    this.getPackages();

  } 


  
  videoFile: File | null = null;
  videoPreviewUrl: string = '';
  videoReloadKey = 0; // Used to force re-render
  videoRequiredError = false;

  beforeUpload = (file: File): boolean => {
    const isVideo = file.type.startsWith('video/');
    const isLt100M = file.size / 1024 / 1024 < 100;

    if (!isVideo) {
      this.message.error('You can only upload video files!');
      return false;
    }

    if (!isLt100M) {
      this.message.error('Video must be smaller than 100MB!');
      return false;
    }

    this.setVideoPreview(file);
    return false; // prevent auto-upload
  };


  setVideoPreview(file: File): void {
  if (this.videoPreviewUrl) {
    URL.revokeObjectURL(this.videoPreviewUrl); // Cleanup old preview
  }

  this.videoFile = file;
  this.videoPreviewUrl = ''; // Clear it first to force rebind
  this.videoRequiredError = false;

  // Use setTimeout to let Angular detect the change
  setTimeout(() => {
    this.videoPreviewUrl = URL.createObjectURL(file);
    this.videoReloadKey++; // To force <video> to re-render
  }, 0);
}


  ngOnDestroy(): void {
    if (this.videoPreviewUrl) {
      URL.revokeObjectURL(this.videoPreviewUrl);
    }
  }

  // Optional: Call this on form submit

submitForm(): void {
  if (!this.validateForm.valid || !this.videoFile) {
    this.message.error('Please fill all required fields and upload a video.');
    return;
  }

  const formData = new FormData();
  formData.append('Title', this.validateForm.value.txtTitle);
  formData.append('StartDate', this.validateForm.value.txtStartDate.toISOString());
  formData.append('EndDate', this.validateForm.value.txtEndDate.toISOString());
  formData.append('RewardPerView', this.validateForm.value.txtperAdReward);
  formData.append('IsActive', this.validateForm.value.rdlIsActive.toString());
  formData.append('videoFile', this.videoFile);

  // ✅ Fix is here: using validateForm instead of this.form
  const selectedPackages: number[] = this.validateForm.value.ddlPackages;
  const packageIdString = selectedPackages.map(id => `'${id}'`).join(',');
  formData.append('PackageIds', packageIdString);

  this.packages.saveVideoRequest(formData).subscribe(
    (res) => {
      if (res.statusCode === 200) {
        this.message.success('Video and package data submitted successfully.');
      } else {
        this.message.error('Something went wrong: ' + res.message);
      }
    },
    (err) => {
      this.message.error('API Error: Failed to submit.');
    }
  );
}


 
packageOptions: { value: number, label: string }[] = [];
selectedPackage: number | null = null;

getPackages() {
  this.packages.getPackageList().subscribe(
    (response: IApiResponse<any[]>) => {
      if (response.statusCode === 200) {
        this.packageOptions = [
          { value: null, label: '-----Select----' },
          ...response.data.map(pkg => ({
            value: pkg.packageId,
            label: pkg.packageName
          }))
        ];
        this.selectedPackage = null;
      } else {
        console.error('Error fetching packages:', response.message);
      }
    },
    error => {
      console.error('API Error:', error);
    }
  );
}
  
}
