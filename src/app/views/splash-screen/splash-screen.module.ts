import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SplashScreenViewComponent } from './splash-screen.view';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SplashScreenViewComponent,
      },
    ]),
  ],
  declarations: [SplashScreenViewComponent],
})
export class SplashScreenViewModule {}
