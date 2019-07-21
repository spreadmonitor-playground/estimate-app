import { Component } from '@angular/core';
import { tap, filter } from 'rxjs/operators';
import { SocketService } from './services/socket.service';
import { Member } from './interfaces';
import { UserStore } from './state';

@Component({
  selector: 'app-root',
  template: `
    <ion-app><ion-router-outlet></ion-router-outlet></ion-app>
  `,
})
export class AppComponent {
  constructor(private readonly socketService: SocketService, private readonly userStore: UserStore) {
    this.socketService
      .subscribeToChannel<Member>('getSelf', null)
      .pipe(
        filter(value => value !== null),
        tap(user => {
          console.log('[AppComponent] User profile received from server.', user);
          this.userStore.update({ ...user });
        })
      )
      .subscribe();
  }
}
