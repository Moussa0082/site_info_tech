import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../component/breadcrumb/breadcrumb.component';
import { HeadImageService } from '../../../service/headimage.service';
import { UtilsService } from '../../../service/utils.service';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../../models/Contact';
import { ContactService } from '../../../service/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [BreadcrumbComponent, FormsModule],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent {
  backgroundUrl: string = '';

  constructor(
    private headImageService: HeadImageService,
    private contactService: ContactService,
    private toastr: ToastrService,
    private utils: UtilsService
  ) {}

  getImageUrl(path: string) {
    return this.utils.getImageUrl(path);
  }

  handleImageError(event: any) {
    this.utils.handleImageError(event);
  }

  ngOnInit() {
    this.headImageService.getHeadImageByPage('Contact').subscribe({
      next: (res: any) => {
        if (res && res.headImage && res.headImage.image) {
          this.backgroundUrl = this.getImageUrl(res.headImage.image);
        }
      },

      error: (err) => console.error(err),
    });
  }

  isSending: boolean = false;

  // Initialisation de l'objet contact
  contact: Contact = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  onSubmit() {
    // Vérification basique avant envoi
    if (!this.contact.email || !this.contact.message) {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.isSending = true;

    this.contactService.bookContact(this.contact).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success('Votre message a été envoyé avec succès !');
          this.resetForm();
          // // Optionnel : rediriger vers l'accueil après 2 secondes
          // setTimeout(() => this.router.navigate(['/home']), 2000);
        } else {
          this.toastr.error("Une erreur est survenue lors de l'envoi.");
        }
        this.isSending = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Impossible de contacter le serveur.');
        this.isSending = false;
      },
    });
  }

  resetForm() {
    this.contact = { firstName: '', lastName: '', email: '', message: '' };
  }
}
