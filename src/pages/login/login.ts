import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Util } from '../../utility/util'
import { HomePage } from '../home/home';
import { AccessProvider } from '../../providers/access'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  public msg: string;
  private loginData: FormGroup;
  public header: Boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected util: Util,
    public formBuilder: FormBuilder,
    protected menu: MenuController,
    protected access: AccessProvider
  ) {

      this.loginData = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
      this.header = this.navParams.get('header');
  }

  ngOnInit() {
    if (!this.header)
      this.menu.enable(false);
    this.visibleHeader();
  }

  login() {
    this.util.showLoader('Logando');
    this.access.login(this.loginData.value).subscribe(data => {
      this.util.loading.dismiss();
      this.util.presentToast('Bem-vindo(a)!');
      this.navCtrl.setRoot('HomePage');
    }, err => {
      this.util.loading.dismiss();
      this.msg = JSON.parse(err);
      this.util.presentToast(this.msg['msg']);
    });
  }


  visibleHeader() {
    var loginHeader = document.querySelectorAll("#login-header");
    if (!this.header) {
      loginHeader[0]['style'].display = 'none';
    }
  }

}
