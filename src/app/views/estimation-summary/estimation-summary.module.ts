import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EstimationSummaryViewComponent } from './estimation-summary.view';
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
        component: EstimationSummaryViewComponent,
      },
    ]),
  ],
  declarations: [EstimationSummaryViewComponent],
})
export class EstimationSummaryViewModule {}
