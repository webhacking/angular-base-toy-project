import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeveloperService } from '../developer.service';
import {filter, flatMap, map} from 'rxjs/operators';
import { Title }     from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

// interface developer {
//   id: string,
//   feed_endpoint: string,
//   profile_image: string
// }

export class PostsComponent implements OnInit {
  public developerId: number;
  public developer;
  public developersRss: object[];

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private titleService: Title,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.developerId = this.route.snapshot.params.id;
    this.developerService.get(String(this.developerId)).subscribe(developer => {
      this.developer = developer;
      this.developerService.parseRss(this.developer.feed_endpoint).subscribe(rss => {
        this.developersRss = rss;
      });
      this.titleService.setTitle('docs by' + this.developer.id);
    });
  }

  moveOn(rssLink: string): void {
    window.open(rssLink);
  }
}
