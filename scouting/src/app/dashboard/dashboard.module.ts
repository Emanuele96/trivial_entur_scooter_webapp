import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ButtonComponent } from './button/button.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [
    MapComponent,
    ButtonComponent,
    FilterSelectorComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule
  ],
  exports: [
    MapComponent,
    ButtonComponent,
    FilterSelectorComponent
  ]
})
export class DashboardModule { }
