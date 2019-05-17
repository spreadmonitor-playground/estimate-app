import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Group } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

    public groups: Observable<Group[]> = new Subject();

    public selectedGroup: Observable<Group> = new Subject();

    public enterGroup(id: string) {

    }

    public leaveGroup(id: string) {

    }
}
