import { Component } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/map'

import { LocalStorage } from './localstorage'

// Models
import { LoginModel } from '../models/login.model';

// Variáveis de ambiente

declare var navigator: any;
declare var Connection: any;
export interface IStorageItem {
  key: string;
  value: any;
}

@Component({})

export class AccessProvider {
  public loading: any;
  public usuarios: Array<Array<string>>;
  public usuario_key: Array<string>;
  public token_notificacao: string;

  constructor(
    private http: Http,
    public platform: Platform,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private splashScreen: SplashScreen,
    protected localstorage: LocalStorage
  ) {
  }


  setToken(token_notificacao) {
    this.token_notificacao = token_notificacao;
  }


  login(login: LoginModel) {
    return Observable.create(observer => {
      this.http.post('http://track-j.herokuapp.com/http_authenticate?token_notificacao=' + this.token_notificacao, login)
      // this.http.post('http://192.168.0.107:3000/http_authenticate?token_notificacao=' + this.token_notificacao, login)
      // this.http.post('http://192.168.10.235:3000/http_authenticate?token_notificacao=' + this.token_notificacao, login)
        .subscribe(data => {
          this.localstorage.saveSessao(data);
          observer.next(data);
        }, function (error) {
          observer.error(error['_body']);
        });
    });
  }

}
