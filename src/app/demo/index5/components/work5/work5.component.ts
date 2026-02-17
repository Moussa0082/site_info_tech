import { Component, OnInit } from '@angular/core';
import { GsapRevealDirective } from '../../../../directives/gsap-reveal.directive';
import { HeadImageService } from '../../../../service/headimage.service';
import { UtilsService } from '../../../../service/utils.service';

@Component({
  selector: 'app-work5',
  imports: [GsapRevealDirective],
  templateUrl: './work5.component.html',
  styles: ``,
})
export class Work5Component implements OnInit {
  background: string = '';

  constructor(
    private headImageService: HeadImageService,
    private utils: UtilsService
  ) {}

  getImageUrl(path: string) {
    return this.utils.getImageUrl(path);
  }

  handleImageError(event: any) {
    this.utils.handleImageError(event);
  }

  ngOnInit() {
    this.loadImage();
  }

  loadImage() {
    this.headImageService.getHeadImageByPage('Work').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.background = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
}
