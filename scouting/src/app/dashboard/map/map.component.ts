import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
import { Scooter, Variables } from '../models/data-models';
import { DataApiService } from '../services/data-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  
  private map : any;
  private icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  };
  private markers : any[] = [];
  private circle : any;

  private initializeMap() : void {
    this.map = L.map('map', {
      center: [63.424950, 10.394022],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.circle = L.circle([63.424950, 10.394022], {
      color: "blue",
      fillOpacity: 0.2,
      radius: 100.0
  }).addTo(this.map);
  }

  
  constructor(private dataService : DataApiService) {
   }

  ngAfterViewInit(): void {
    this.initializeMap();

    this.dataService.scootersData.subscribe((scooters => {
      this.markers.forEach(marker => {this.map.removeLayer(marker)});
      this.markers = [];
      scooters.forEach((scooter => {
        var marker = L.marker([scooter.lat, scooter.long], this.icon).addTo(this.map);
        
        marker.bindPopup(
          "This " + scooter.company +
           (scooter.isReserved ? " is reserved" : (" \nis available with a range of " + scooter.currentRangeMeters + " meters."))
           );
        this.markers.push(marker); 
      }))
    }
    ));

    this.dataService.filterValues.subscribe((filters => {
      this.map.setView([filters.lat, filters.lon]);  
      this.circle.setRadius(filters.range);
      this.circle.setLatLng([filters.lat, filters.lon]);
    }));
  
    this.map.on('click', ((event : any) => {
      var filterVariables : Variables = this.dataService.filterValues.value;
      filterVariables.lat = event.latlng.lat;
      filterVariables.lon = event.latlng.lng;
      this.dataService.filterValues.next(filterVariables);
      console.log(this.dataService.filterValues.value);
    }))
  }

}
