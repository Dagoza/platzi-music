import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CustomInputsComponent } from './components/custom-inputs/custom-inputs.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [CustomInputsComponent, LogoComponent],
  exports: [CustomInputsComponent, LogoComponent]
})
export class SharedModule {}
