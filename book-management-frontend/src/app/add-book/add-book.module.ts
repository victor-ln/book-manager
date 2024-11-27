import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBookPageRoutingModule } from './add-book-routing.module';

import { AddBookPage } from './add-book.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBookPageRoutingModule,
    SharedModule
  ],
  declarations: [AddBookPage]
})
export class AddBookPageModule {}
