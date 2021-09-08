import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import * as queries from 'src/app/graphql/graphql-queries';
import { Scooter, Variables } from '../models/data-models';
import { map } from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private querySubscription$! : any;
  private queryNewScooters$! : Subscription;
  private changeFilter$! : Subscription;
  scootersData = new BehaviorSubject<Scooter[]>([]);
  filterValues = new BehaviorSubject<Variables>({
    lat:63.424950,
    lon:10.394022,
    range: 100,
    count: 1000
  });
  constructor(private apollo : Apollo) {
    this.init();
   }

  init() {
    //Apollo QuerRef extended subscription
    //Fetch data from server
    this.querySubscription$ = this.apollo.watchQuery<any>({
      query: queries.getScooterQuery,
      variables: this.filterValues.value,
    });
    
    //On new data from server, update behaviour subject containing scooterData
    this.queryNewScooters$ = this.querySubscription$
      .valueChanges
      .subscribe(((data : any) => {
        this.scootersData.next(
          data.data.vehicles.map((vehicle: any) => {
            return {
                      lat: vehicle.lat,
                      long: vehicle.lon,
                      company: vehicle.system.name.translation[0].value,
                      currentRangeMeters:vehicle.currentRangeMeters,
                      isReserved: vehicle.isReserved,
                      isDisabled: vehicle.isDisabled
            }
          })
        );
        console.log("new data fetched check", this.scootersData.value);

      }));
    
    //On filters change, refetch data from server
    this.changeFilter$ = this.filterValues.subscribe(data => {
      this.querySubscription$.setVariables(data);
      console.log("filter changed");
      this.querySubscription$.refetch();
    });
  }
  
  ngOnDestroy(){
    this.changeFilter$.unsubscribe();
    this.queryNewScooters$.unsubscribe();
  }
}
