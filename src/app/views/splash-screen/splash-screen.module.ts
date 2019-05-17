import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SplashScreenViewComponent } from './splash-screen.view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SplashScreenViewComponent
      }
    ])
  ],
  declarations: [SplashScreenViewComponent]
})
export class SplashScreenViewModule {}
