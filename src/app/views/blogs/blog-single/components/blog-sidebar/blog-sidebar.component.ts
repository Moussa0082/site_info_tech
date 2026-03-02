import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../../../../service/blogs.service';
import { Blog } from '../../../../../models/Blog';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../../../service/utils.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-sidebar.component.html',
  styles: ``
})
export class BlogSidebarComponent implements OnInit{

  htmlContent!: SafeHtml;
  blogs!: Blog;
  loading = false;
    id!: string;

  constructor(
    private sanitizer: DomSanitizer,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
   private utils:UtilsService
    ) {}
  
     getImageUrl(path: string) {
      return this.utils.getImageUrl(path);
    }
  
    handleImageError(event: any) {
      this.utils.handleImageError(event);
    }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getBlogById(this.id);
  }

  getBlogById(idBlog:string) {
    this.loading = true;
    this.blogService.getBlogById(idBlog).subscribe(
       (res) => {
        this.blogs = res;
        // res.description contient du HTML produit par CKEditor
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(res.description);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
    });
  }
 

}
