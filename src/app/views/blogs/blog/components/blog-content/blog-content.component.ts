import { Component, OnInit } from '@angular/core';
import {  blogs } from '../../../data';
import { Router, RouterLink } from '@angular/router';
import { Blog } from '../../../../../models/Blog';
import { BlogService } from '../../../../../service/blogs.service';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../../../service/utils.service';

@Component({
  selector: 'app-blog-content',
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-content.component.html',
  styles: ``,
  styleUrl: './blog-content.component.scss'
})
export class BlogContentComponent implements OnInit{
  // blogs = blogs

   blogs: Blog[] = [];
  loading = false;

  constructor(
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
        this.blogs = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
    });
  }

}
