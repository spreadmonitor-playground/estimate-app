import { NgModule } from '@angular/core';
import { AvatarComponent } from './components';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [
  AvatarComponent
];

@NgModule({
  imports: [IonicModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SharedModule {}