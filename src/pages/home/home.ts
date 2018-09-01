import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.displayMap();
  }

  displayMap() {
    const location = new google.maps.LatLng('-27.6305', '-52.2364')
    const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    const options = {
      center: location,
      zoom: 15,
      streetViewControl: false,
      mapTypeId: 'roadmap'
    }

    const map = new google.maps.Map(this.mapElement.nativeElement, options)

    this.addMarker(location, map)
  }

  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map,
      // icon: "http://investconconsorcios.com.br/images/icones-consoricos/icone-carro.png"
    })
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
