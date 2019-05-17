import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: './views/splash-screen/splash-screen.module#SplashScreenViewModule' },
  { path: 'first-run', loadChildren: './views/first-run/first-run.module#FirstRunViewModule' },
  { path: 'room-selector', loadChildren: './views/room-selector/room-selector.module#RoomSelectorViewModule' },
  { path: 'estimations/selector', loadChildren: './views/estimation-selector/estimation-selector.module#EstimationSelectorViewModule' },
  { path: 'estimations/summary', loadChildren: './views/estimation-summary/estimation-summary.module#EstimationSummaryViewModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
