import { Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

import { LoadingComponent } from '../../../shared/skeleton-loader/widgets/loading/loading.component';
import { DownloadComponent } from '../../widgets/download/download.component';
import { FooterComponent } from '../../widgets/footer/footer.component';
import { HeaderComponent } from '../../widgets/header/header.component';
import { TitleSectionComponent } from '../../widgets/title-section/title-section.component';

import { Router } from '@angular/router';
import { blogTitle } from '../../../shared/interface/common';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [HeaderComponent, TitleSectionComponent, LoadingComponent,
    DownloadComponent,FooterComponent,GoogleMapsModule,LeafletModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})

export class MapsComponent {

  public currentUrl: string;

  public title: blogTitle = {
    title: 'Event Calendar',
    pages: 'event calendar'
  }

  public openInfo: any;
  public markers: any[];
  public markers1: any[];
  public zoom: number;

  public india = { lat: 12.97, lng: 77.69 };
 
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.markers = [];
    this.zoom = 2;
  }

  ngOnInit() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 12,
        center: this.india,
      }
    );
  }

  @ViewChild(GoogleMap) map!: GoogleMap;

  ngAfterViewInit() {
    const streetView = this.map.getStreetView();

    streetView.setOptions({
      position: { lat: 38.9938386, lng: -77.2515373 },
      pov: { heading: 70, pitch: -10 },
    });

    streetView.setVisible(true);
    const bounds = this.getBounds(this.markers);
  }

  getBounds(markers: any[]) {
    let north;
    let south;
    let east;
    let west;

    for (const marker of markers) {
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }

  options1 = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909),
  };

}
