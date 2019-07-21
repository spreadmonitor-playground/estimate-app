import { EntityState, EntityStore, StoreConfig, QueryEntity } from '@datorama/akita';
import { Group } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GroupsState extends EntityState<Group> {}

@StoreConfig({ name: 'groups' })
export class GroupsStore extends EntityStore<GroupsState> {}

export class GroupsQuery extends QueryEntity<GroupsState> {
  public groups = this.selectAll();

  constructor(protected store: GroupsStore) {
    super(store);
  }

  public selectGroupsForUser(userId: string): Observable<Group> {
    return this.selectAll({
      filterBy: group => !!group.members && !!group.members.find(member => member && member.id === userId),
      limitTo: 1,
    }).pipe(map(groups => (groups.length ? groups[0] : null)));
  }
}
