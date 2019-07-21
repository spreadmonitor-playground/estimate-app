import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserQuery } from '../state';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly serverUrl = environment.url;

  private socket: SocketIOClient.Socket;

  constructor(private readonly userQuery: UserQuery, private readonly router: Router) {
    this.socket = io(this.serverUrl, {
      reconnectionDelay: 3000,
      reconnectionDelayMax: 15000,
      reconnectionAttempts: 100,
    });

    this.socket.on('error', console.error);
    this.socket.on('connect_error', console.error);
    this.socket.on('connect_timeout', console.error);

    /**
     * On disconnect we redirect the user to the main screen
     * because on reconnect a new ID is assigned and current groups would
     * not work anymore.
     */
    this.socket.on('disconnect', () => {
      console.warn('[SocketService] Connection closed, redirecting user to room selector view.');
      this.router.navigate(['/room-selector']);
    });

    this.socket.on('connect', () => {
      console.log('[SocketService] Connection created.');
      /**
       * We need to update the profile on connect, because by default
       * the Serve assigns the name "Anonymous" to every new user.
       */
      console.log('[SocketService] Initially setting profile from local state.');
      this.socket.emit('setProfile', {
        ...this.userQuery.getValue(),
      });
    });
  }

  /**
   * Dispatches the given message to the specified channel.
   *
   * @param channel the name of the channel to send the message to
   * @param payload a JSON serializable payload
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dispatchMessage<T = any>(channel: string, payload?: T): void {
    this.socket.emit(channel, payload);
  }

  /**
   * Subscribes to the given channel.
   *
   * @param channel the name of the channel
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public subscribeToChannel<T = any>(channel: string, initialValue: any): BehaviorSubject<T> {
    const subject = new BehaviorSubject<T>(initialValue);

    fromEvent(this.socket, channel)
      .pipe(
        tap(value => console.log(`[SocketService] Message received in ${channel}, dispatching to subscriber.`, value)),
        tap(value => subject.next(value as T))
        // takeUntil(fromEvent(this.socket, 'disconnect').pipe(take(1)))
      )
      .subscribe();

    return subject;
  }
}
