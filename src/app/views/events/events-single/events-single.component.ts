import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../component/breadcrumb/breadcrumb.component';
import { EventContentComponent } from './components/event-content/event-content.component';
import { EventSidebarAreaComponent } from './components/event-sidebar-area/event-sidebar-area.component';
import { HeadImageService } from '../../../service/headimage.service';
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-events-single',
  imports: [
    BreadcrumbComponent,
    // EventContentComponent,
    EventSidebarAreaComponent,
  ],
  templateUrl: './events-single.component.html',
  styles: ``,
})
export class EventsSingleComponent {
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
