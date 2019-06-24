import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) { }

  getRepos(page?): Observable<any[]> {
    return this.http.get<any[]>(`https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc${page?"&page="+page:""}`);
  }
}
