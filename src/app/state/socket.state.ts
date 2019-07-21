import { Store, StoreConfig, Query } from '@datorama/akita';

export interface SocketState {
  url: string;
  connected: boolean;
}

const INITIAL_STATE: SocketState = {
  url: null,
  connected: false,
};

@StoreConfig({ name: 'socket' })
export class SocketStore extends Store<SocketState> {
  constructor() {
    super(INITIAL_STATE);
  }
}

export class SocketQuery extends Query<SocketState> {
  public url = this.select(state => state.url);
  public connected = this.select(state => state.connected);

  constructor(protected store: SocketStore) {
    super(store);
  }
}
