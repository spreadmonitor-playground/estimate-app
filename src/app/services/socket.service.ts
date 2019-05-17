import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Group, Estimation, Member } from '../interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

    private url = 'http://192.168.100.106:8080';

    private socket: SocketIOClient.Socket;

    public groupsChanges: Subject<Group[]> = new Subject();
    public estimationsChanges: Subject<Estimation[]> = new Subject();

    constructor() {
        this.connect();
    }

    private connect() {
        if (this.socket) {
            this.socket.removeAllListeners();
        }

        this.socket = io(this.url);

        this.socket.on('connect', (e) => {
            console.log('[SocketService] Connection created.');
        });

        this.socket.on('groups', (groups: Group[]) => {
            console.log('[SocketService] Groups has been updated.', groups);
            this.groupsChanges.next(groups);
        });

        // this.socket.on('estimations', (estimations: Estimation[]) => {
        //     this.estimationsChanges.next(estimations);
        // });

        this.socket.on('disconnect', () => {
            this.connect();
        });
    }

    public enterGroup(groupId: string, member: Member) {
        console.log('entering group', groupId, member);
        this.socket.emit('enterGroup', {
            groupId,
            member
        });
    }

    public createGroup(member: Member) {
        console.log('creating group', member);

        this.socket.emit('createGroup', member);
    }

    public leaveGroup(member: Member, groupId) {
        console.log('leaving group with user', member, 'group:', groupId);

        this.socket.emit('leaveGroup', {
            groupId,
            member
        });
    }

    public subscribeToEstimations(groupId: string) {
        this.socket.on(`${groupId}:estimations`, (estimations: Estimation[]) => {
            this.estimationsChanges.next(estimations);
        });
    }

    public unsubscribeFromEstimations(groupId: string) {
        this.socket.removeListener(`${groupId}:estimations`);
    }
}
