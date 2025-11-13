import { Component } from '@angular/core';
import { GsapRevealDirective } from '../../../../directives/gsap-reveal.directive';
import { RouterLink } from '@angular/router';
import { Work5Component } from "../work5/work5.component";
import { BlogNews5Component } from "../blog-news5/blog-news5.component";

@Component({
  selector: 'app-about5',
  imports: [GsapRevealDirective, RouterLink, Work5Component, BlogNews5Component],
  templateUrl: './about5.component.html',
  styles: ``
})
export class About5Component {

}
