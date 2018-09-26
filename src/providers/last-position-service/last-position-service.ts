import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class LastPositionServiceProvider {
  public api_url: string;

  constructor(public http: Http) {
    // this.api_url = 'http://192.168.0.107:3000/api/v1/posicoes/get_last_position';
    // this.api_url = 'http://192.168.10.235:3000/api/v1/posicoes/get_last_position';
    this.api_url = 'http://track-j.herokuapp.com/api/v1/posicoes/get_last_position';
  }

  getLastPosition(token_cliente, token_veiculo) {
    let header = new Headers();
    header.append("Content-Type", 'application/json');
    header.append("Authorization", "Basic " + btoa(token_cliente + ":"));

    let params = new URLSearchParams();
    params.append("token_veiculo", token_veiculo);

    let options = new RequestOptions({ headers: header, params: params })

    return Observable.create(observer => {
        this.http.get(this.api_url, options)
            .map(res => res.json())
            .subscribe((position) => {
                observer.next(position);
            }, err => observer.error(err));
    });

  }

}
