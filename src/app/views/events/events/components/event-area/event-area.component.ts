// import { Component, OnInit } from '@angular/core';
// import { eventArea } from '../../../data';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import type { CalendarOptions } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import frLocale from '@fullcalendar/core/locales/fr';
// import { EventService } from '../../../../../service/events.service';
// import { MyEvent } from '../../../../../models/Events';
// import { environment } from '../../../../../../environments/environment';
// import { UtilsService } from '../../../../../service/utils.service';



// const MONTH_MAP: any = {
//   JAN: '01',
//   FEB: '02',
//   MAR: '03',
//   APR: '04',
//   MAY: '05',
//   JUN: '06',
//   JUL: '07',
//   AUG: '08',
//   SEP: '09',
//   OCT: '10',
//   NOV: '11',
//   DEC: '12',
// };

// @Component({
//   selector: 'app-event-area',
//   imports: [RouterLink,CommonModule,FullCalendarModule,],
//   templateUrl: './event-area.component.html',
//   styleUrl: './event-area.component.scss'
// })
// export class EventAreaComponent implements OnInit{
// //   eventAreaData = eventArea;
// //   hoverIndex: number = 0
// // }
//   events:MyEvent [] = [];
//   apiUrl: any = environment.apiUrl;

//   constructor(private router: Router,private eventService:EventService,
//    private utils:UtilsService
//     ) {}
  
//      getImageUrl(path: string) {
//       return this.utils.getImageUrl(path);
//     }
  
//     handleImageError(event: any) {
//       this.utils.handleImageError(event);
//     }

//   ngOnInit(): void {
//     // throw new Error('Method not implemented.');
//   this.getAllevents();
//   }

//   getAllevents() {
//     this.eventService.getAllEvents().subscribe(
//        (res) => {
//         console.log("liste events", res)
//         this.events = res;
//       },
//       (error) => {
//        console.log("erreur ", error)

//     });
//   }


//   // On transforme tes événements JSON en format FullCalendar
//   // events = eventArea.map(e => ({
//   //   title: e.eventTitle,
//   //   start: `2025-01-${e.date.padStart(2, '0')}`, // format ISO yyyy-mm-dd
//   //   extendedProps: {
//   //     location: e.location,
//   //     image: e.image,
//   //     detailsUrl: e.detailsUrl,
//   //     time: e.eventTime
//   //   }
//   // }));

// //   events = eventArea.map(e => ({
// //   title: e.eventTitle,
// //   start: `${e.year}-${MONTH_MAP[e.month]}-${e.date.padStart(2, '0')}`,
// //   extendedProps: {
// //     location: e.location,
// //     image: e.image,
// //     detailsUrl: e.detailsUrl,
// //     time: e.eventTime
// //   }
// // }));


//   calendarOptions: CalendarOptions = {
//     initialView: 'dayGridMonth',
//     plugins: [dayGridPlugin, interactionPlugin],
//     events: this.events,
//     locales: [frLocale],
// locale: 'fr',
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: ''
//     },
//     eventClick: (info:any) => this.onEventClick(info),
//     eventDidMount: (info:any) => this.addTooltip(info),
//   };

//   onEventClick(info: any) {
//     const url = info.event.extendedProps.detailsUrl;
//     this.router.navigateByUrl(url);
//   }

//   addTooltip(info: any) {
//     const tooltip = document.createElement('div');
//     tooltip.className = 'calendar-tooltip';
//     tooltip.innerHTML = `
//       <div class="tooltip-content">
//       </div>`;
//     info.el.appendChild(tooltip);
//   }
//   // addTooltip(info: any) {
//   //   const tooltip = document.createElement('div');
//   //   tooltip.className = 'calendar-tooltip';
//   //   tooltip.innerHTML = `
//   //     <div class="tooltip-content">
//   //       <img src="${info.event.extendedProps.image}" alt="event" class="thumb" />
//   //       <strong>${info.event.title}</strong><br>
//   //       <small>${info.event.extendedProps.time}</small><br>
//   //       <span>${info.event.extendedProps.location}</span>
//   //     </div>`;
//   //   info.el.appendChild(tooltip);
//   // }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { EventService } from '../../../../../service/events.service';
import { MyEvent } from '../../../../../models/Events';
import { environment } from '../../../../../../environments/environment';
import { UtilsService } from '../../../../../service/utils.service';
import { HeadImageService } from '../../../../../service/headimage.service';
import { BreadcrumbComponent } from "../../../../../component/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-event-area',
  imports: [CommonModule, FullCalendarModule, BreadcrumbComponent],
  templateUrl: './event-area.component.html',
  styleUrl: './event-area.component.scss'
})
export class EventAreaComponent implements OnInit {
  events: any[] = [];
  apiUrl: any = environment.apiUrl;
   backgroundUrl: string = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locales: [frLocale],
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: [], // <-- vide au départ
    eventClick: (info) => this.onEventClick(info),
    eventDidMount: (info) => this.addTooltip(info),
  };

  constructor(
    private router: Router,
    private eventService: EventService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
 
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (res: MyEvent[]) => {
        // 🔹 Transformer les données pour FullCalendar
        const events = res.map((e: MyEvent) => ({
          id: e.idEvent,
          title: e.titre,               // 🔹 Affiche seulement le titre
          start: e.dateDebutEvent,
          // end: e.dateFinEvent,
        }));
        // 🔹 Configuration du calendrier
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          plugins: [dayGridPlugin, interactionPlugin],
          locales: [frLocale],
          locale: 'fr',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: '',
          },
          events: events,
          eventClick: (info) => this.onEventClick(info),
        };
      },
      error: (err) => console.error('Erreur chargement événements :', err)
    });
  }

  onEventClick(info: any) {
    const id = info.event.id;
    console.log("Event cliqué", info.event)
    if (id) {
      this.router.navigate(['/event-single', id]); // 🔹 Redirection vers la page détail
    }
  }

  getImageUrl(path: string) {
    return this.utils.getImageUrl(path);
  }

  handleImageError(event: any) {
    this.utils.handleImageError(event);
  }

  // onEventClick(info: any) {
  //   console.log('Événement cliqué :', info.event);
  //   // exemple : redirige vers page de détails
  //   this.router.navigate(['/event-single', info.event.idEvent]);
  // }

  addTooltip(info: any) {
    const tooltip = document.createElement('div');
    tooltip.className = 'calendar-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
      </div>`;
    info.el.appendChild(tooltip);
  }
}
