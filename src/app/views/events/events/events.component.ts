import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../component/breadcrumb/breadcrumb.component';
import { EventAreaComponent } from './components/event-area/event-area.component';
import { HeadImageService } from '../../../service/headimage.service';
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-events',
  imports: [BreadcrumbComponent, EventAreaComponent],
  templateUrl: './events.component.html',
  styles: ``,
})
export class EventsComponent {
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
    this.headImageService.getHeadImageByPage('Event').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.backgroundUrl = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }
}
