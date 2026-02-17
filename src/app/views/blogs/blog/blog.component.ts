import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../component/breadcrumb/breadcrumb.component';
import { BlogContentComponent } from './components/blog-content/blog-content.component';
import { HeadImageService } from '../../../service/headimage.service';
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-blog',
  imports: [BreadcrumbComponent, BlogContentComponent],
  templateUrl: './blog.component.html',
  styles: ``,
})
export class BlogComponent {
  backgroundUrl: string = '';

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
    this.headImageService.getHeadImageByPage('Blog').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.backgroundUrl = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
}
