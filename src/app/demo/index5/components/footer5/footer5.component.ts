import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer5',
  imports: [RouterLink],
  templateUrl: './footer5.component.html',
  styles: ``
})
export class Footer5Component {
  year = new Date().getFullYear();

  
  brandLogos: string[] = [
    'assets/img/brand/brand-logo-4.1.png',
    'assets/img/brand/brand-logo-4.2.png',
    'assets/img/brand/brand-logo-4.3.png',
    'assets/img/brand/brand-logo-4.4.png',
    'assets/img/brand/brand-logo-4.5.png'
  ];

  socialLinks = [
    { icon: 'fa-brands fa-facebook-f', link: '#' },
    { icon: 'fa-brands fa-instagram', link: '#' },
    { icon: 'fa-brands fa-twitter', link: '#' },
    { icon: 'fa-brands fa-github', link: '#' }
  ];

  quickLinks = [
    { label: 'Accueil', url: '/accueil' },
    { label: 'A propos de nous', url: '/about' },
    { label: 'Evènement', url: '/event' },
    { label: 'Blog', url: '/blog-single' },
  ];

  // services = [
  //   { label: 'Donation Online', url: '#' },
  //   { label: 'Donor Centres', url: '#' },
  //   { label: 'Volunteering', url: '/team' },
  //   { label: 'Your Philanthropy', url: '#' },
  //   { label: 'Senior Care', url: '#' }
  // ];
   services = [
    // { label: 'Formations en ligne', url: '#' },
    // { label: 'Webinaires', url: '#' },
    { label: 'Communauté citoyenne', url: '#' },
    { label: 'Mentorat et experts', url: '#' },
    { label: 'Suivi et reporting', url: '#' }
  ];
  
  contactInfo = [
    { icon: 'assets/img/icons/vl-footer-ic-1.1.svg', text: 'kibaru@tuwindi.org', link: 'mailto:kibaru@tuwindi.org' },
    { icon: 'assets/img/icons/vl-footer-ic-1.2.svg', text: 'Hamdallaye ACI 2000, BP2690', link: '#' },
    { icon: 'assets/img/icons/vl-footer-2.1.svg', text: '+223 71 91 91 91', link: 'tel:+223 71 91 91 91' }
  ];

}
