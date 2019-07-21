import { Component, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserQuery } from 'src/app/state';

/**
 * Responsible for handling initial splashscreen/logo animation and
 * redirecting the app to the main page or the first-run flow based on whether
 * the user name has been set or not.
 */
@Component({
  selector: 'app-splash-screen-view',
  template: '',
})
export class SplashScreenViewComponent implements AfterViewInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private readonly userQuery: UserQuery
  ) {}

  public ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.userQuery.getValue().name;
      this.router.navigate([this.userQuery.getValue().name ? '/room-selector' : '/first-run']);
    });
  }

  public onDestroy(): void {
    this.splashScreen.hide();
  }
}
