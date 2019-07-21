import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Group } from '../interfaces';
import { SocketService } from './socket.service';
import { UserQuery } from '../state';

@Injectable({
  providedIn: 'root',
})
export class GroupsService implements OnDestroy {
  public allGroups: BehaviorSubject<Group[]> = this.socketService.subscribeToChannel('getGroups', []);
  public currentGroup: BehaviorSubject<Group> = new BehaviorSubject(undefined);

  public selectedGroupId: string;

  private onDestroy: Subject<boolean> = new Subject();

  constructor(private socketService: SocketService, private readonly userQuery: UserQuery) {
    this.allGroups
      .pipe(
        tap(groups => {
          const userId = this.userQuery.getValue().id;
          const group = groups.find(g => g.members.some(user => user.id === userId));

          if (group && JSON.stringify(group) !== JSON.stringify(this.currentGroup.getValue())) {
            this.currentGroup.next(group);
            this.selectedGroupId = group.id;
          }
        }),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  /**
   * Sends the "createGroup" command to the server which will create a group and
   * auto-join the current user and broadcast the change to all users.
   *
   * NOTE: The app parses all groups when a change is received and if it's finds
   * itself in a group then it handles it as the current group.
   */
  public createGroup(): void {
    console.log('[GroupsService] Creating group.');
    this.socketService.dispatchMessage('createGroup');
  }

  /**
   * Enters an already existing group.
   */
  public enterGroup(group: Group): void {
    console.log(`[GroupsService] Entering group (Group#${group.id}).`);
    this.socketService.dispatchMessage('enterGroup', { groupId: group.id });

    this.currentGroup.next(group);
  }

  /**
   * Leaves all group. The server doesn't do any check just force removes the
   * user from every group he/she is part of.
   */
  public leaveCurrentGroup(): void {
    console.log(`[GroupsService] Leaving current (and any other) groups.`);
    this.socketService.dispatchMessage('leaveGroups');

    this.currentGroup.next(null);
  }

  public ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
