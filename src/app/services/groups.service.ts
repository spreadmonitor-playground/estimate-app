import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Group } from '../interfaces';
import { SocketService } from './socket.service';
import { ProfileService } from './profile.service';
import { uuid } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class GroupsService implements OnDestroy {
  public groups: Subject<Group[]> = new Subject();
  public selectedGroup: Subject<Group> = new Subject();

  private selectedGroupId: string;

  private onDestroy: Subject<boolean> = new Subject();

  constructor(
    private socketService: SocketService,
    private profileService: ProfileService
  ) {
    this.socketService.groupsChanges
      .pipe(
        tap(groups => this.groups.next(groups)),
        tap(groups => {
          const group = this.getGroupForUser(groups, this.profileService.user.id);

          if (group && group.id !== this.selectedGroupId) {
            this.selectedGroup.next(group);
            this.selectedGroupId = group.id;

            this.subscribeToEstimations(group.id);
          }
        }),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  public createGroup() {
    this.socketService.createGroup(this.profileService.user);
  }

  public enterGroup(group: Group) {
    this.socketService.enterGroup(group.id, this.profileService.user);
    this.selectedGroup.next(group);
  }

  public leaveGroup(id: string) {
    console.warn(`[GroupsService] I won't care about your id`);
    this.socketService.leaveGroup(this.profileService.user, this.selectedGroupId);
    this.socketService.unsubscribeFromEstimations(this.selectedGroupId);
  }

  private subscribeToEstimations(groupId: string) {
    this.socketService.subscribeToEstimations(groupId);
  }

  private getGroupForUser(groups: Group[], userId: string): Group {
    return groups.find(g => g.members.find(m => m.id === userId) !== undefined);
  }

  public ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
