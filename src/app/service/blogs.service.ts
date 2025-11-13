import { Injectable } from '@angular/core';
import { CResponse } from '../models/CResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/Blog';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private serviceUrl: string;
  private baseUrl: string = "blog";
      constructor(private http: HttpClient) { 
        this.serviceUrl = environment.apiUrl;
      }


  /**
   * 3. LECTURE - Tous les Blogs
   */
  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.serviceUrl}/${this.baseUrl}/getAllBlog`);
  }


  getSimilarBlogs(idBlog:string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.serviceUrl}/${this.baseUrl}/getSimilarBlog/${idBlog}`);
  }

  /**
   * 4. LECTURE - Blog par ID
   */
  getBlogById(idBlog: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.serviceUrl}/${this.baseUrl}/getById/${idBlog}`);
  }

  /**
   * 5. LECTURE - Blogs par Catégorie
   */
  getBlogByCategory(idCategorie: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.serviceUrl}/${this.baseUrl}/getBlogByCategory/${idCategorie}`);
  }

  
}
