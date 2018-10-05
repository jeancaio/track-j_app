import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class VeiculosServiceProvider {
  public api_url: string;

  constructor(public http: Http) {
    // this.api_url = 'http://192.168.0.107:3000/api/v1/posicoes/get_last_position';
    // this.api_url = 'http://192.168.10.235:3000/api/v1/posicoes/get_last_position';
    this.api_url = 'http://track-j.herokuapp.com/api/v1/veiculos/get_veiculos';
  }

  getVeiculos(token_cliente) {
    let header = new Headers();
    header.append("Content-Type", 'application/json');
    header.append("Authorization", "Basic " + btoa(token_cliente + ":"));

    let options = new RequestOptions({ headers: header })

    return Observable.create(observer => {
        this.http.get(this.api_url, options)
            .map(res => res.json())
            .subscribe((veiculos) => {
                observer.next(veiculos);
            }, err => observer.error(err));
    });

  }

  postCoordinates(){
    let header = new Headers(coordinates);
    header.append("Content-Type", 'application/json');

    let params = new URLSearchParams();
    params.append("token", "fb24239cefa19d5f025cceae7b63cb54");
    params.append("coordenadas_geograficas", coordinates);

    let options = new RequestOptions({ headers: header, params: params })

    return Observable.create(observer => {
        this.http.post('http://track-j.herokuapp.com/api/v1/posicoes/post_posicoes', options)
            .map(res => res.json())
            .subscribe((position) => {
                observer.next(position);
            }, err => observer.error(err));
    });
  }

}
