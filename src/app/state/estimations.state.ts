import { EntityState, EntityStore, StoreConfig, QueryEntity } from '@datorama/akita';
import { Estimation } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EstimationsState extends EntityState<Estimation> {}

@StoreConfig({ name: 'estimations' })
export class EstimationsStore extends EntityStore<EstimationsState> {}

export class EstimationsQuery extends QueryEntity<EstimationsState> {
  public estimations = this.selectAll();

  constructor(protected store: EstimationsStore) {
    super(store);
  }
}
