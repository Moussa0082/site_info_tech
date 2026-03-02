import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../../component/breadcrumb/breadcrumb.component";
import { EventAreaComponent } from "./components/event-area/event-area.component";
import { EventService } from '../../../service/events.service';
import { UtilsService } from '../../../service/utils.service';
import { HeadImageService } from '../../../service/headimage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [BreadcrumbComponent, EventAreaComponent, CommonModule],
  templateUrl: './events.component.html',
  styles: ``
})
export class EventsComponent implements OnInit{

     constructor(
    private headImageService:HeadImageService,
    private eventService: EventService,
    private utils: UtilsService
  ) {}

    backgroundUrl: string = '';

    getImageUrl(path: string) {
    return this.utils.getImageUrl(path);
  }

  handleImageError(event: any) {
    this.utils.handleImageError(event);
  }


 ngOnInit(): void {
    this.headImageService.getHeadImageByPage('Event').subscribe({
    next: (res: any) => {
      if (res && res.headImage && res.headImage.image) {
        this.backgroundUrl = this.getImageUrl(res.headImage.image);
      }
    },
    error: err => console.error(err)
  });
  }

}
