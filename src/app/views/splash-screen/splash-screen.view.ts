import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

/**
 * Responsible for handling initial splashscreen/logo animation and
 * redirecting the app to the main page or the first-run flow based on whether
 * the user name has been set or not.
 */
@Component({
  selector: 'app-splash-screen-view',
  templateUrl: 'splash-screen.view.html',
  styleUrls: ['splash-screen.view.scss'],
})
export class SplashScreenViewComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.router.navigate([this.profileService.userNameSet ? '/room-selector' : '/first-run']);

    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

}
