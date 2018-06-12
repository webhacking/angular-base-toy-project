import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import {filter, flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {from} from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})

export class DeveloperService {
  private developersEndPoint = './assets/developers.json';
  constructor(private http: HttpClient) { }

  public get(id: string): Observable<any> {
    return this.http
      .get(this.developersEndPoint)
      .pipe(
        flatMap((developer: any[]) => from(developer)),
        filter((developer: any) => developer.id === id)
      )
  }

  public list(): Observable<any> {
    return this.http
      .get(this.developersEndPoint)
  }

  public parseRss(endPoint: string): Observable<any> {
    const rssToJsonAccountApiKey = '0kydokthtzxj5jhaoaoxtooer7wxzlhvsdc20pmf';
    return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=' + endPoint + '&api_key=' + rssToJsonAccountApiKey,  {responseType: 'json'});
  }
}
