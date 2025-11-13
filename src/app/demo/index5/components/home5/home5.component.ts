import { Component, OnInit } from '@angular/core';
import { GsapRevealDirective } from '../../../../directives/gsap-reveal.directive';
import { RouterLink } from '@angular/router';
import { Work5Component } from "../work5/work5.component";
import { BlogNews5Component } from "../blog-news5/blog-news5.component";
import { HeadImageService } from '../../../../service/headimage.service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../../service/utils.service';

@Component({
  selector: 'app-home5',
  imports: [GsapRevealDirective, CommonModule,RouterLink, Work5Component, BlogNews5Component],
  templateUrl: './home5.component.html',
  styles: ``,
  styleUrl: './home5.component.scss',
})
export class Home5Component implements OnInit{


  backgroundUrl: string = '';

  constructor(private headImageService: HeadImageService,
 private utils:UtilsService
  ) {}

   getImageUrl(path: string) {
    return this.utils.getImageUrl(path);
  }

  handleImageError(event: any) {
    this.utils.handleImageError(event);
  }

ngOnInit() {
  this.headImageService.getHeadImageByPage('Home').subscribe({
    next: (res: any) => {
      if (res && res.headImage && res.headImage.image) {
        this.backgroundUrl = this.getImageUrl(res.headImage.image);
      }
    },
    error: err => console.error(err)
  });
}


}
