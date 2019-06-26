import {Component, OnInit} from '@angular/core';
import {RepoService} from '../repo.service';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cardData: any = [];
  // isVisible = false;
  // isOkLoading = false;
  // forks = null;
  // watchers = null;
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


    // forkJoin(
    //   ..._.map(_.range(34), i => this.repos.getRepos(i+1).pipe(map((item:any) => item.items)))
    // ).subscribe( (d) => {
    //   console.log(d)
    //   _.forEach(d, arr => {
    //     this.cardData= _.concat(this.cardData, arr)
    //   })
    //   console.log(this.cardData)
    // })
  }

  getName(str) {
    let i = str.indexOf('/');
    if (i > 0) {
      return str.slice(0, i);

    } else {
      return '';
    }
  }

  // showModal(forks, watchers): void {
  //   this.forks = forks;
  //   this.watchers = watchers;
  //   this.isVisible = true;
  // }

  // handleOk(): void {
  //   this.isOkLoading = true;
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isOkLoading = false;
  //   }, 1500);
  // }
  //
  // handleCancel(): void {
  //   this.isVisible = false;
  // }

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
