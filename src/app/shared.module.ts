import { NgModule } from '@angular/core';
import { AvatarComponent } from './components';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
  AvatarComponent
];

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SharedModule {}