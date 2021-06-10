import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/core';
import { Coords } from '../shared/interfaces/coords';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage {
  public currentCenter: Coords;
  public coordinates: Coords[] = [];
  public defaultZoom = 14;
  constructor() { }

  ionViewDidEnter(){
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition(){
    const currentPosition = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude
    };
    this.coordinates.push(this.currentCenter);
  }

  public watchPosition(){
    Geolocation.watchPosition({}, position => {
      this.currentCenter = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.coordinates.push(this.currentCenter);
    });
  }

}
