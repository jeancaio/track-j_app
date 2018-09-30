import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculosPage } from './veiculos';

@NgModule({
  declarations: [
    VeiculosPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculosPage),
  ],
})
export class VeiculosPageModule {}
