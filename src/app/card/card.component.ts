import {Component, OnInit} from '@angular/core';
import {RepoService} from '../repo.service';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cardData: any = [];
  indexOfPage: number;
  isLoading: boolean;

  constructor(private repos: RepoService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.repos.getRepos().pipe(map((item: any) => item.items)).subscribe(data => {
      this.cardData = data;
      console.log(this.cardData);

      this.isLoading = false;
    });
  }

  getName(str) {
    let i = str.indexOf('/');
    if (i > 0) {
      return str.slice(0, i);

    } else {
      return '';
    }
  }

  onChangePage(paginationIndex: number){
    this.isLoading = true;
    console.log('isLoading before : ',this.isLoading)

    this.indexOfPage = paginationIndex;
    console.log('Index Of Page : ',this.indexOfPage);

    let fetchRepos= this.repos.getRepos(this.indexOfPage).pipe(map((item: any) => item.items)).subscribe(data => {
      this.cardData = data;
      this.isLoading = false;
      console.log('isLoading after : ',this.isLoading)
      fetchRepos.unsubscribe();
    });
  }

  skeletonRepetition(n: number): any[] {
    return Array(n);
  }





}
