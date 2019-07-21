import { Store, StoreConfig, Query } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
}

const INITIAL_STATE: UserState = {
  id: null,
  firstName: '',
  lastName: '',
  name: '',
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(INITIAL_STATE);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store);
  }

  public name = this.select(({ name }) => name);
}
