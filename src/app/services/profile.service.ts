import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly USER_NAME_KEY = 'sm.config.username';

  get userName(): string {
    return localStorage.getItem(this.USER_NAME_KEY);
  }

  set userName(value: string) {
    localStorage.setItem(this.USER_NAME_KEY, value);
  }
}
