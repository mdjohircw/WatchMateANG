import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  constructor(private fb: UntypedFormBuilder, private Package: PackageService ,private router: Router,private sanitizer: DomSanitizer) {}

ngOnInit(): void {
  this.getRechargeRequests();
}
 getYouTubeEmbedUrl(url: string): SafeResourceUrl {
    if (!url) return '';

    let videoId = '';

    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('embed/')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
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
 const currentVideo = this.allDatas[this.currentIndex];
    const postData = {
      customerId: currentVideo.customerId,
      accountNo: currentVideo.id,
      perAdReward: currentVideo.perDayReward
    };

    this.Package.saveVideoReward(postData).subscribe({
      next: (response) => {
        this.isRewardModalVisible = true;
      },
      error: (err) => {
        console.error('Error saving reward:', err);
      }
    });
  }
}

rewardCoins = 50;
getReward(): void {
  console.log('Reward Claimed:', this.rewardCoins);
  this.currentIndex;
  this.isRewardModalVisible = false;
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
  video.muted = video.volume === 0; 
}
likeVideo(): void {
  console.log('Liked video:', this.allDatas[this.currentIndex]?.title);
}

shareVideo(): void {
  console.log('Shared video:', this.allDatas[this.currentIndex]?.title);
}

}
