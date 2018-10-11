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
  public token_veiculo: string;
  public position: string;
  public latitude: string;
  public longitude: string;
  public horario: string;
  public tempo: any;
  public velocidade: any;

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
        this.toSpeed()
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
      icon: "https://uploaddeimagens.com.br/images/001/665/191/original/icone_car.png"
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
        map.setCenter(new google.maps.LatLng(this.latitude, this.longitude))
        this.toSpeed()
      }, err => {
        console.log(err);
      });
  }

  calculatedistance(origem, destino) {
    this.directionsService.route({
      origin: origem,
      destination: destino,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        let distancia = response.routes[0].legs[0].distance.text
        this.calculateSpeed(distancia, this.tempo)
      } else {
        window.alert('Ocorreu um erro ao calcular a velocidade ' + status);
      }
    });
  }

  calculateSpeed(distancia, tempo) {
    if (distancia.split(" ")[1] === 'm') {
      distancia = distancia.split(" ")[0] / 1000
    } else {
      distancia = distancia.split(" ")[0].split(',').join('.')
    }
    this.velocidade = (distancia / (tempo / 3600)).toFixed(1)
    console.log("VELOCIDADE")
  }

  toSpeed() {
    this.lastPositionService.toSpeed(this.token_veiculo)
    .subscribe(to_speed => {
      console.log(to_speed)
      this.calculatedistance(to_speed.inicio, to_speed.final)
      this.tempo = to_speed.tempo
    }, err => {
      console.log(err);
    });
  }

}
