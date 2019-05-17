import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EstimationSelectorViewComponent } from './estimation-selector.view';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EstimationSelectorViewComponent
      }
    ])
  ],
  declarations: [EstimationSelectorViewComponent]
})
export class EstimationSelectorViewModule {}
