import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { Scooter, Variables } from '../models/data-models';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent implements OnInit {

  value: number = 100;
  options: Options = {
    floor: 50,
    ceil: 1000,
    step: 50
  };
  
  defaultLat = 63.424950;
  defaultLong = 10.394022;

  constructor(public dataService : DataApiService) { }

  ngOnInit(): void {
  }

  onValueChangeEnd(changeContext: ChangeContext){
    var filterVariables : Variables = this.dataService.filterValues.value;
    filterVariables.range = changeContext.value;
    this.dataService.filterValues.next(filterVariables);
    console.log(this.dataService.filterValues.value);
  }

  updateLocation(params : any[]){
    var dataService : DataApiService = params[2];
    var filterVariables : Variables = dataService.filterValues.value;
    filterVariables.lat = parseFloat(params[0])
    filterVariables.lon = parseFloat(params[1])
    dataService.filterValues.next(filterVariables);
    console.log(dataService.filterValues.value);
  }

}
