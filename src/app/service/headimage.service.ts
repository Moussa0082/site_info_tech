import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CResponse } from '../models/CResponse';
import { HeadImage } from '../models/HeadImage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadImageService {

 private serviceUrl: string;
  private baseUrl: string = "headImage";

  constructor(private http: HttpClient) {
    this.serviceUrl = environment.apiUrl;
  }

  /**
   * Créer une nouvelle image d'en-tête
   */
  createHeadImage(
    pageName: string,
    description: string,
    ajouterPar?: string,
    imageFile?: File
  ): Observable<CResponse> {
    const formData = new FormData();
    formData.append('pageName', pageName);
    formData.append('description', description);
    if (ajouterPar) formData.append('ajouterPar', ajouterPar);
    if (imageFile) formData.append('image', imageFile, imageFile.name);

    return this.http.post<CResponse>(
      `${this.serviceUrl}/${this.baseUrl}/create`,
      formData
    );
  }

getAllHeadImages(): Observable<HeadImage[]> {
  return this.http.get<HeadImage[]>(`${this.serviceUrl}/${this.baseUrl}/getAll`);
}


  /**
   * Récupérer l'image d'en-tête d'une page donnée
   */
  getHeadImageByPage(pageName: string): Observable<CResponse> {
    return this.http.get<CResponse>(
      `${this.serviceUrl}/${this.baseUrl}/page/${pageName}`
    );
  }

  /**
   * Mettre à jour une image d'en-tête existante
   */
  updateHeadImage(
    idHeadImage: string,
    pageName?: string,
    description?: string,
    modifierPar?: string,
    imageFile?: File
  ): Observable<CResponse> {
    const formData = new FormData();
    if (pageName) formData.append('pageName', pageName);
    if (description) formData.append('description', description);
    if (modifierPar) formData.append('modifierPar', modifierPar);
    if (imageFile) formData.append('image', imageFile, imageFile.name);

    return this.http.put<CResponse>(
      `${this.serviceUrl}/${this.baseUrl}/update/${idHeadImage}`,
      formData
    );
  }

  /**
   * Supprimer une image d'en-tête
   */
  deleteHeadImage(idHeadImage: string): Observable<CResponse> {
    return this.http.delete<CResponse>(
      `${this.serviceUrl}/${this.baseUrl}/delete/${idHeadImage}`
    );
  }
}