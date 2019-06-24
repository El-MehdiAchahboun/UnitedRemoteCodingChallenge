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

  constructor(private repos: RepoService) {
  }

  ngOnInit() {
    this.repos.getRepos().pipe(map((item: any) => item.items)).subscribe(data => {
      this.cardData = data;
      console.log(this.cardData);
    });
    // forkJoin(
    //   this.repos.getRepos().pipe(map((item:any) => item.items)),
    //   this.repos.getRepos(2).pipe(map((item:any)=> item.items))
    // ).subscribe( ([d1,d2]) => {
    //   this.cardData = [...d1,...d2];
    //   console.log(this.cardData)
    // })
  }

  getName(str) {
    let i = str.indexOf('/');
    if (i > 0) {
      let name = str.slice(0, i)
      // console.log(name);
      return name;

    } else {
      return '';
    }
  }

  isVisible = false;
  isOkLoading = false;
  forks = null;
  watchers = null;

  showModal(forks, watchers): void {
    this.forks = forks;
    this.watchers = watchers;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }



}
