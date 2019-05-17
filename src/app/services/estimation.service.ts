import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Estimation } from '../interfaces';
import { SocketService } from './socket.service';
import { takeUntil, tap } from 'rxjs/operators';
import { GroupsService } from './groups.service';

@Injectable({
  providedIn: 'root'
})
export class EstimationService implements OnInit {

  public estimations: Subject<Estimation[]> = new Subject();

  private onDestroy: Subject<boolean> = new Subject();

  constructor(private socketService: SocketService, private groupsService: GroupsService) {}

  public ngOnInit() {
    this.socketService.estimationsChanges.pipe(
      tap(estimations => {
        this.estimations.next(estimations);
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  public sendEstimation(estimation: Estimation) {
    this.socketService.sendEstimation(this.groupsService.selectedGroupId, estimation);
  }

  public startEstimation() {
    this.socketService.startEstimation(this.groupsService.selectedGroupId);
  }
}
