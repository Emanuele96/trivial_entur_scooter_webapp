import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent implements OnInit {

  value: number = 100;
  options: Options = {
    floor: 50,
    ceil: 500,
    step: 50
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
