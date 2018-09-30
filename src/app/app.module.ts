import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LastPositionServiceProvider } from '../providers/last-position-service/last-position-service';
import { VeiculosServiceProvider } from '../providers/veiculos-service';
import { Util } from '../utility/util'
import { AccessProvider } from '../providers/access'
import { LocalStorage } from '../providers/localstorage'
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ name: 'wonder', driverOrder: ['indexeddb', 'sqlite', 'websql'] }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Util,
    AccessProvider,
    LocalStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LastPositionServiceProvider,
    VeiculosServiceProvider
  ]
})
export class AppModule {}
