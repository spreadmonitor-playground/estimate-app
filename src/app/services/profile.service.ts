import { Injectable } from '@angular/core';
import { Member } from '../interfaces';
import { uuid } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly USER_NAME_KEY = 'sm.config.username';
  private readonly USER_ID_KEY = 'sm.config.id';

  get userNameSet(): boolean {
    const name = localStorage.getItem(this.USER_NAME_KEY);

    return typeof name === 'string' && name.length > 0;
  }

  set userName(value: string) {
    localStorage.setItem(this.USER_NAME_KEY, value);
    localStorage.setItem(this.USER_ID_KEY, uuid());
  }

  get user(): Member {
    if (this.userNameSet) {
      return {
        id: localStorage.getItem(this.USER_ID_KEY),
        name: localStorage.getItem(this.USER_NAME_KEY)
      };
    }

    return undefined;
  }
}
