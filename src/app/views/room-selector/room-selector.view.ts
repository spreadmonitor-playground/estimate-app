import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { GroupsService } from '../../services/groups.service';
import { tap, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room-selector-view',
  templateUrl: 'room-selector.view.html',
  styleUrls: ['room-selector.view.scss'],
})
export class RoomSelectorViewComponent implements OnInit, OnDestroy {
  private readonly destroy = new Subject();

  constructor(private router: Router, public groupService: GroupsService) {}

  public ngOnInit(): void {
    this.groupService.currentGroup
      .pipe(
        filter(group => !!group),
        tap(() => this.router.navigate(['/estimations/selector'])),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  public startSession(): void {
    this.groupService.createGroup();
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
