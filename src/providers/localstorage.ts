import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Component({})
export class LocalStorage {
  public loading: any;
  public emails: Array<string> = [];
  public tokens: Array<string> = [];;

  constructor(
    private storage: Storage) {
  }

  saveSessao(data: any) {
    const params = data.json();

    this.storage.set(params.token, params.usuario);
  }

  existSessao() {
    return Observable.create(observer => {
      this.storage.length().then((data) => {
        observer.next(data);
      });
    });
  }

  getEmails() {
    this.emails = [];
    return Observable.create(observer => {
      this.storage.forEach((value) => {
        this.emails.push(value);
      }).then(() => {
        observer.next(this.emails);
      });
    });
  }

  getTokens() {
    this.tokens = [];
    return Observable.create(observer => {
      this.storage.forEach((value, key) => {
        this.tokens.push(key);
      }).then(() => {
        observer.next(this.tokens);
      });
    });
  }

  removeUsuario(email) {
    return Observable.create(observer => {
      this.storage.forEach((value, key) => {
        if (value == email) {
          this.storage.remove(key).then((data) => {
            observer.next(data);
          }, function(error) {
            observer.error(error);
          });
        }
      });
    });
  }
}
