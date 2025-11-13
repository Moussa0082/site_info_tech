import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { blogs } from '../../../data';
import { CommonModule } from '@angular/common';
import { Blog } from '../../../../../models/Blog';
import { BlogService } from '../../../../../service/blogs.service';
import { environment } from '../../../../../../environments/environment';
import { UtilsService } from '../../../../../service/utils.service';

@Component({
  selector: 'app-blog-content',
  imports: [RouterLink,CommonModule],
  templateUrl: './blog-content.component.html',
  styles: ``,
   styleUrl: './blog-content.component.scss'
})
export class BlogContentComponent implements OnInit {
  // blogs = blogs
  blogs: Blog[] = [];
  loading = false;
  //  id!: string;
     currentBlogId!: string;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route:ActivatedRoute,
  private utils:UtilsService
   ) {}
 
    getImageUrl(path: string) {
     return this.utils.getImageUrl(path);
   }
 
   handleImageError(event: any) {
     this.utils.handleImageError(event);
   }


  ngOnInit(): void {
    //  this.id = this.route.snapshot.paramMap.get('id')!;
      // On écoute les changements de l'ID dans l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentBlogId = id;
        this.getSimilarBlogs(id);
      }
    });
  }

  getSimilarBlogs(idBlog:string) {
    this.loading = true;
    this.blogService.getSimilarBlogs(idBlog).subscribe(
       (res) => {
        this.blogs = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
    });
  }
 
}
