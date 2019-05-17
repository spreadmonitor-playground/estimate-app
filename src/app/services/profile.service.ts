import { Injectable } from '@angular/core';
import { Member } from '../interfaces';
import { uuid } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly memeberId: string = uuid();
  private readonly USER_NAME_KEY = 'sm.config.username';

  get userNameSet(): boolean {
    const name = localStorage.getItem(this.USER_NAME_KEY);

    return typeof name === 'string' && name.length > 0;
  }

  set userName(value: string) {
    localStorage.setItem(this.USER_NAME_KEY, value);
  }

  get user(): Member {
    if (this.userNameSet) {
      return {
        id: this.memeberId,
        name: localStorage.getItem(this.USER_NAME_KEY)
      };
    }

    return undefined;
  }
}
