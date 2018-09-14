import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LastPositionServiceProvider } from '../../providers/last-position-service/last-position-service'


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
  public token_cliente: string;
  public token_veiculo: string
  public position: Array<string> = [];
  public latitude: Array<string> = [];
  public longitude: Array<string> = [];


  constructor(
    public navCtrl: NavController,
    public lastPositionService: LastPositionServiceProvider,
  ) {

  }

  ionViewDidLoad(){
    this.lastPosition()

  }

  lastPosition() {
    this.token_cliente = "bf9ccc1ad1ae3ff885a7d9452615743b"
    this.token_veiculo = "053dcf74c70df99ae23446a061ad038e"

    this.lastPositionService.getLastPosition(this.token_cliente, this.token_veiculo)
      .subscribe(posicao => {
        console.log(posicao)
        this.latitude = posicao.coordenadas_geograficas.split(',')[0];
        this.longitude = posicao.coordenadas_geograficas.split(',')[1];
        this.displayMap();
      }, err => {
        console.log(err);
      });
  }

  displayMap() {
    const location = new google.maps.LatLng(this.latitude, this.longitude)
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
