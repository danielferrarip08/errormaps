import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaPaginaPage } from './nova-pagina';

@NgModule({
  declarations: [
    NovaPaginaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaPaginaPage),
  ],
})
export class NovaPaginaPageModule {}
