import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-selector-view',
  templateUrl: 'room-selector.view.html',
  styleUrls: ['room-selector.view.scss'],
})
export class RoomSelectorViewComponent {

  constructor(
    private router: Router,
  ) { }
}
