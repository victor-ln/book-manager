import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent], // Componentes compartilhados
  imports: [
    CommonModule, // Funcionalidades básicas do Angular
    IonicModule, // Componentes do Ionic
  ],
  exports: [HeaderComponent], // Exporta para uso em outros módulos
})
export class SharedModule {}
