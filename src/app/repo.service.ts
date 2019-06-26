import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient } from '@angular/common/http';
import * as moment from 'moment'



@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) { }

  getRepos(page?): Observable<any[]> {
    return this.http.get<any[]>(`https://api.github.com/search/repositories?q=created:%3E${moment().subtract(30, 'day').format('YYYY-MM-DD')}&sort=stars&order=desc${page?"&page="+page:""}`);
  }
}
