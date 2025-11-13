import { environment } from "../../environments/environment";

export class Function{

     apiUrl: any = environment.apiUrl;
    getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // console.log('Image path from DB:', imagePath);
  
  // Nettoyer le chemin
  const cleanPath = imagePath.replace(/^\/+/, '');
  const fullUrl = `${this.apiUrl}/${cleanPath}`;
  
  // console.log('Full image URL:', fullUrl);
  return fullUrl;
}
  
  // Gestion des erreurs de chargement d'image
 handleImageError(event: any) {
  event.target.style.display = 'none';
 }

}