import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-room-selector-view',
  templateUrl: 'room-selector.view.html',
  styleUrls: ['room-selector.view.scss'],
})
export class RoomSelectorViewComponent {

  constructor(
    private router: Router,
    public groupService: GroupsService,
  ) { }

  public startSession() {
    // this.groupService
  }
}
