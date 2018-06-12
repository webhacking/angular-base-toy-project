import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../developer.service';
import {Subject} from 'rxjs/internal/Subject';
import {concatAll, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, toArray} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {from} from 'rxjs/internal/observable/from';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})

export class DevelopersComponent implements OnInit {
  public developers = [];
  private searchTerms = new Subject<string>();

  constructor(
    private developerService: DeveloperService
  ) { }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public ngOnInit(): void {

    this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe(term => {
      this.developerService.list()
        .pipe(
          flatMap((developer: any[]) => from(developer)),
          filter(developer => developer.id.toLowerCase().indexOf(term.toLowerCase()) > -1),
          toArray()
        )
        .subscribe(developers => this.developers = developers);
    });

    this.developerService.list()
      .subscribe(developers => this.developers = developers);
  }
}
