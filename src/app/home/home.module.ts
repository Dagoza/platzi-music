import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ItemsSlidesComponent } from './components/items-slides/items-slides.component';
import { SongsModalPageModule } from '../songs-modal/songs-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SongsModalPageModule
  ],
  declarations: [HomePage, ItemsSlidesComponent]
})
export class HomePageModule {}
