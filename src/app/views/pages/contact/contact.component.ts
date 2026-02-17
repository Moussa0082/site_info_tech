import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../component/breadcrumb/breadcrumb.component';
import { HeadImageService } from '../../../service/headimage.service';
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-contact',
  imports: [BreadcrumbComponent],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent {
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
    this.headImageService.getHeadImageByPage('Contact').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.backgroundUrl = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
}
