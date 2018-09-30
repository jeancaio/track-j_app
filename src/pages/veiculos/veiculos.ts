import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VeiculosServiceProvider } from '../../providers/veiculos-service'

/**
 * Generated class for the VeiculosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-veiculos',
  templateUrl: 'veiculos.html',
})
export class VeiculosPage {
  public veiculos: Array<string>;
  public token_cliente: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veiculosService: VeiculosServiceProvider,
  ) {
  }

  ionViewDidLoad() {
    this.getVeiculos()
  }

  getVeiculos() {
    this.token_cliente = "0f7afadfbaae30c60ea5af4e4144be2b"

    this.veiculosService.getVeiculos(this.token_cliente)
      .subscribe(veiculos => {
        console.log(veiculos)
        this.veiculos = veiculos
      }, err => {
        console.log(err);
      });
  }

  mapa() {
    this.navCtrl.push('HomePage')
  }

}
