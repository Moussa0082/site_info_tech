import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyEvent } from '../../../../../models/Events';
import { EventService } from '../../../../../service/events.service';
import { UtilsService } from '../../../../../service/utils.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-event-sidebar-area',
  imports: [CommonModule,RouterLink],
  templateUrl: './event-sidebar-area.component.html',
  styles: ``,
   styleUrl: './event-sidebar-area.component.scss',
})
export class EventSidebarAreaComponent implements OnInit{
  
  ev!: MyEvent;
   loading = false;
     id!: string;
     htmlContent!: SafeHtml;
     constructor(
       private sanitizer: DomSanitizer,
    private eventsService: EventService,
    private router: Router,
    private route: ActivatedRoute,
   private utils:UtilsService
    ) {}

        getImageUrl(path: string) {
      return this.utils.getImageUrl(path);
    }
  
    handleImageError(event: any) {
      this.utils.handleImageError(event);
    }

ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getEventById(this.id);
  }

  getEventById(idEvent:string) {
    this.loading = true;
    this.eventsService.getEventById(idEvent).subscribe(
       (res) => {
        this.ev = res;
        console.log("events ", this.ev);
      },
      (error) => {
        console.log("erreur de chagement des events ", error);
    });
  }
 
}
