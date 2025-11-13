import { Component, ElementRef, HostListener } from '@angular/core';
import { AlertComponent } from "../alert/alert.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { SubscribeComponent } from "../../component/subscribe/subscribe.component";
import { MobileSidebarComponent } from "../../component/mobile-sidebar/mobile-sidebar.component";
import { PageScrollComponent } from "../page-scroll/page-scroll.component";

@Component({
  selector: 'app-layout',
  imports: [AlertComponent,RouterLink, NavbarComponent, RouterOutlet, FooterComponent, SubscribeComponent, MobileSidebarComponent, PageScrollComponent],
  templateUrl: './layout.component.html',
  styles: ``,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isMenuOpen = false;
  constructor(private el: ElementRef) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY;
    const header = this.el.nativeElement.querySelector('.header-area');
    if (!header) return; // ✅ Empêche l'erreur si .header-area n'existe pas

    if (scrollPosition < 1) {
      header.classList.remove('sticky');
    } else {
      header.classList.add('sticky');
    }
  }
}
