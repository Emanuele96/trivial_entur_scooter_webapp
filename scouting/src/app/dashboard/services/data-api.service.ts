import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as queries from 'src/app/graphql/graphql-queries';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private querySubscription!: Subscription;
  constructor(private apollo : Apollo) { }

  getScooters(){
    this.querySubscription = this.apollo.watchQuery({
      query: queries.getScooterQuery,
      variables: {
        lat:59.911491,
        lon:10.757933,
        range: 5000,
        count: 25
      }
    })
    .valueChanges.subscribe(({data})=> {
      console.log(data);
    })
  }
}
