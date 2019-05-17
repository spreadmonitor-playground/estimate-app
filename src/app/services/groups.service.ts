import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Group } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

    private url = 'http://192.168.100.106:8080';

    public groups: Observable<Group[]> = new Subject();

    public selectedGroup: Observable<Group> = new Subject();

    public enterGroup(id: string) {
        const socket = io(this.url);

        socket.on('connect', (e) => {
            console.log('sziomio', e);
            console.log(e);
        });

        socket.on('event', data => {
            console.log('jonevalami', data);
        });

        socket.on('hello', vmi => {
            console.log('jon', vmi);
            socket.emit('test', { jozsi: 'kecske' });
        });

        socket.on('disconnect', (a) => {
            console.log('ohshit', a);
        });
    }

    public leaveGroup(id: string) {

    }
}
