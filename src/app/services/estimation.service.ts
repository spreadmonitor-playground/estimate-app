import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Estimation } from '../interfaces';
import { GroupsService } from './groups.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class EstimationService {
  private internalEstimationStrem: Subscription;

  public estimations: BehaviorSubject<Estimation[]> = new BehaviorSubject([]);

  constructor(private socketService: SocketService, private groupsService: GroupsService) {
    this.groupsService.currentGroup
      .pipe(
        tap(currengGroup => {
          if (!currengGroup) {
            this.estimations.next([]);
            if (this.internalEstimationStrem) {
              this.internalEstimationStrem.unsubscribe();
            }
          } else {
            this.internalEstimationStrem = this.socketService
              .subscribeToChannel(`getEstimations`, [])
              .pipe(tap(value => this.estimations.next(value)))
              .subscribe();
          }
        })
      )
      .subscribe();
  }

  public sendEstimation(estimation: Estimation): void {
    this.socketService.dispatchMessage<Estimation>('sendEstimation', estimation);
  }
}
