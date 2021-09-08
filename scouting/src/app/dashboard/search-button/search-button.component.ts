import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DataApiService } from '../services/data-api.service';

const getScooterQuery = gql`
query vehicles($lat: Float!, $lon:Float!, $range: Int!, $count: Int) {
  vehicles(lat :$lat, lon : $lon, range: $range,count: $count){
    lat
    lon
    isReserved
    isDisabled
    currentRangeMeters
    system {
      name {
        translation {
          language value 
        }
      }
    }
  }
}
`;

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})


export class SearchButtonComponent implements OnInit {
  private querySubscription!: Subscription;
  constructor( private apollo : Apollo, private api: DataApiService) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery({
      query: getScooterQuery,
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
  
  onClick(){
    console.log("hello");
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
