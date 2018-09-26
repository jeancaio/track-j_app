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
  public position: string;
  public latitude: string;
  public longitude: string;
  public horario: string;


  constructor(
    public navCtrl: NavController,
    public lastPositionService: LastPositionServiceProvider,
  ) {

  }

  ionViewDidLoad(){
    this.lastPosition()

  }

  lastPosition() {
    this.token_cliente = "0f7afadfbaae30c60ea5af4e4144be2b"
    this.token_veiculo = "fb24239cefa19d5f025cceae7b63cb54"

    this.lastPositionService.getLastPosition(this.token_cliente, this.token_veiculo)
      .subscribe(posicao => {
        console.log(posicao)
        this.latitude = posicao.coordenadas_geograficas.split(',')[0];
        this.longitude = posicao.coordenadas_geograficas.split(',')[1];
        this.horario = new Date(posicao.captured_at).toISOString()
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

    setInterval(() => {
      this.atualizarLocalizacao(map)
    }, 5000);
  }

  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map,
      // icon: "http://investconconsorcios.com.br/images/icones-consoricos/icone-carro.png"
    })
  }

  atualizarLocalizacao(map) {
    this.lastPositionService.getLastPosition(this.token_cliente, this.token_veiculo)
      .subscribe(posicao => {
        console.log(posicao)
        this.latitude = posicao.coordenadas_geograficas.split(',')[0];
        this.longitude = posicao.coordenadas_geograficas.split(',')[1];
        this.horario = new Date(posicao.captured_at).toISOString();
        this.addMarker(new google.maps.LatLng(this.latitude, this.longitude), map)
      }, err => {
        console.log(err);
      });
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
