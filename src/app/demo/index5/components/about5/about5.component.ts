import { Component } from '@angular/core';
import { GsapRevealDirective } from '../../../../directives/gsap-reveal.directive';
import { RouterLink } from '@angular/router';
import { Work5Component } from '../work5/work5.component';
import { BlogNews5Component } from '../blog-news5/blog-news5.component';
import { HeadImageService } from '../../../../service/headimage.service';
import { UtilsService } from '../../../../service/utils.service';

@Component({
  selector: 'app-about5',
  imports: [
    GsapRevealDirective,
    RouterLink,
    Work5Component,
    BlogNews5Component,
  ],
  templateUrl: './about5.component.html',
  styles: ``,
})
export class About5Component {
  about1: string = '';
  about2: string = '';
  about3: string = '';

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
    this.loadImageUn();
    this.loadImageDeux();
    this.loadImageTrois();
  }

  loadImageUn() {
    this.headImageService.getHeadImageByPage('About1').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.about1 = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
  loadImageDeux() {
    this.headImageService.getHeadImageByPage('About2').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.about2 = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
  loadImageTrois() {
    this.headImageService.getHeadImageByPage('About3').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.about3 = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
}
