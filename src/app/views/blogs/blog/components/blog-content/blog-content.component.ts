import { Component, OnInit } from '@angular/core';
import {  blogs } from '../../../data';
import { Router, RouterLink } from '@angular/router';
import { Blog } from '../../../../../models/Blog';
import { BlogService } from '../../../../../service/blogs.service';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../../../service/utils.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-content',
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-content.component.html',
  styles: ``,
  styleUrl: './blog-content.component.scss'
})
export class BlogContentComponent implements OnInit{
  
   blogs: Blog[] = [];
  loading = false;
  htmlContent!: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private blogService: BlogService,
    private router: Router,
    private utils:UtilsService
  ) {}

   getImageUrl(path: string) {
    return this.utils.getImageUrl(path);
  }

  handleImageError(event: any) {
    this.utils.handleImageError(event);
  }


  ngOnInit(): void {
    this.getAllBlogs();
  }

 getAllBlogs() {
  this.loading = true;
  this.blogService.getAllBlogs().subscribe(
    (res) => {
      this.blogs = res.map((blog: any) => {
        const plainText = blog.description
          ? blog.description.replace(/<[^>]*>/g, '') // retire HTML
          : '';

        const truncatedText = plainText.length > 100
          ? plainText.substring(0, 100) + '...'
          : plainText;

        return {
          ...blog,
          htmlContent: this.sanitizer.bypassSecurityTrustHtml(truncatedText)
        };
      });

      this.loading = false;
    },
    () => (this.loading = false)
  );
}





}
