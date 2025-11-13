import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CResponse } from '../models/CResponse';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MyEvent } from '../models/Events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private serviceUrl: string;
  private baseUrl: string = "event";
    constructor(private http: HttpClient) { 
      this.serviceUrl = environment.apiUrl;
    }
   

  /**
   * Récupère tous les événements.
   */
  getAllEvents(): Observable<MyEvent[]> {
    return this.http.get<MyEvent[]>(`${this.serviceUrl}/${this.baseUrl}/getAllEvent`);
  }

  /**
   * Récupère un événement par son ID.
   */
  getEventById(idEvent: string): Observable<MyEvent> {
    return this.http.get<MyEvent>(`${this.serviceUrl}/${this.baseUrl}/getById/${idEvent}`);
  }

  /**
   * Récupère les événements par ID de catégorie.
   */
  getEventsByCategory(idCategorie: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.serviceUrl}/${this.baseUrl}/getEventByCategory/${idCategorie}`);
  }
 
}
