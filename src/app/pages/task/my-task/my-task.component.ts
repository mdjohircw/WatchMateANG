import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/core/services/package.service';

@Component({
  selector: 'app-my-task',
  standalone: false,
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.css'
})
export class MyTaskComponent {

allDatas: any[] = [];
isLoading = true;
currentIndex = 0;
  constructor(private fb: UntypedFormBuilder, private Package: PackageService ,private router: Router) {}

ngOnInit(): void {
  this.getRechargeRequests();
}

getRechargeRequests(): void {
  this.Package.getCustomerVideos().subscribe({
    next: (response) => {
      if (response.statusCode === 200) {
        this.allDatas = response.data;
      }
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Failed to load data:', err);
      this.allDatas = [];
      this.isLoading = false;
    }
  });
}
isRewardModalVisible = false;

nextVideo(): void {
  if (this.currentIndex < this.allDatas.length - 1) {
    this.currentIndex++;
  } else if (this.currentIndex === this.allDatas.length - 1) {
    // Last video reached
    this.isRewardModalVisible = true;
  }
}
rewardCoins = 50;
getReward(): void {
  console.log('Reward Claimed:', this.rewardCoins);
  this.isRewardModalVisible = false;
  // ✅ You can add your reward API logic here
}
prevVideo(): void {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
}
toggleMute(video: HTMLVideoElement) {
  video.muted = !video.muted;
}

changeVolume(video: HTMLVideoElement, event: Event) {
  const target = event.target as HTMLInputElement;
  video.volume = parseFloat(target.value);
  video.muted = video.volume === 0; // auto mute if volume is 0
}
likeVideo(): void {
  console.log('Liked video:', this.allDatas[this.currentIndex]?.title);
}

shareVideo(): void {
  console.log('Shared video:', this.allDatas[this.currentIndex]?.title);
}

}
