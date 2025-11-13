import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../models/Categorie';
import { Observable } from 'rxjs';
import { CResponse } from '../models/CResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private serviceUrl: string;
  private baseUrl: string = "categorie";
    constructor(private http: HttpClient) { 
      this.serviceUrl = environment.apiUrl;
    }

  
  
    /** 🔍 Récupérer toutes les catégories */
    getAll(): Observable<Categorie[]> {
      return this.http.get<Categorie[]>(`${this.serviceUrl}/${this.baseUrl}/getAllCategorie`);
    }
  
    /** 🔍 Récupérer une catégorie par ID */
    getById(idCategorie: string): Observable<Categorie> {
      return this.http.get<Categorie>(`${this.serviceUrl}/${this.baseUrl}/getById/${idCategorie}`);
    }
  
    /** 🔎 Trouver les catégories par type (TypeCategorie enum côté backend) */
    findByType(typeCategorie: string): Observable<Categorie[]> {
      return this.http.get<Categorie[]>(`${this.serviceUrl}/${this.baseUrl}/findByTypeCategrie/${typeCategorie}`);
    }
}
