import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyEvent } from '../../../../../models/Events';
import { EventService } from '../../../../../service/events.service';
import { UtilsService } from '../../../../../service/utils.service';

@Component({
  selector: 'app-event-sidebar-area',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-sidebar-area.component.html',
  styles: `.vl-event-content-area {
  .title {
    color: #2d3436;
    font-weight: 700;
  }

  .event-meta-info {
    font-size: 0.95rem;
    color: #636e72;

    i {
      width: 20px;
    }
  }

  .badge {
    padding: 8px 15px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .para {
    line-height: 1.8;
    color: #2d3436;
    font-size: 1.1rem;
  }
}

.vl-large-thumb img {
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
}`,
})
export class EventSidebarAreaComponent implements OnInit {
  ev!: MyEvent;
  loading = false;
  id!: string;
  constructor(
    private eventsService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService
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

  getEventById(idEvent: string) {
    this.loading = true;
    this.eventsService.getEventById(idEvent).subscribe(
      (res) => {
        this.ev = res;
        console.log('events ', this.ev);
      },
      (error) => {
        console.log('erreur de chagement des events ', error);
      }
    );
  }
}
