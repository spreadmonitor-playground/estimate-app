import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FirstRunViewComponent } from './first-run.view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FirstRunViewComponent
      }
    ])
  ],
  declarations: [FirstRunViewComponent]
})
export class FirstRunViewModule {}
