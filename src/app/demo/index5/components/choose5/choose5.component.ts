import { Component, OnInit } from '@angular/core';
import { GsapRevealDirective } from '../../../../directives/gsap-reveal.directive';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { HeadImageService } from '../../../../service/headimage.service';
import { UtilsService } from '../../../../service/utils.service';

@Component({
  selector: 'app-choose5',
  imports: [GsapRevealDirective, CarouselModule, RouterLink],
  templateUrl: './choose5.component.html',
  styles: ``,
})
export class Choose5Component implements OnInit {
  chooseSlider: OwlOptions = {
    loop: true,
    margin: 30,
    nav: false,
    autoplay: true,
    slideTransition: 'linear',
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  choix1: string = '';
  choix2: string = '';

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
    this.loadImageDeux();
  }

  loadImage() {
    this.headImageService.getHeadImageByPage('choix1').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.choix1 = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
  loadImageDeux() {
    this.headImageService.getHeadImageByPage('choix2').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.choix2 = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
}
