import { Estimation, Member, EstimationGroup } from './interfaces';

export class Group implements EstimationGroup {

  private _members: Member[] = [];
  private _estimations: Estimation[] = [];

  constructor(private readonly _id: string) {}

  public get id(): string {
    return this._id;
  }

  public get members(): Member[] {
    return this._members.slice();
  }

  public get estimations(): Estimation[] {
    return this._estimations.slice();
  }

  public addMember(member: Member): boolean {
    if (this.members.find(({ id }) => id === member.id)) {
      return false;
    }

    this._members = [...this.members, member];

    return true;
  }

  public removeMember(userId: string): boolean {
    const existed = !!this.members.find(({ id }) => id === userId);
    this._members = this.members.filter(({ id }) => id === userId);

    return existed;
  }

  public addEstimation(estimation: Estimation): boolean {
    const estimationIndex = this.estimations.findIndex(({ userId }) => estimation.userId === userId);
    if (estimationIndex !== -1) {
      this._estimations[estimationIndex] = estimation;

      return false;
    }

    this._estimations = [...this.estimations, estimation];

    return true;
  }

  public resetEstimation(): boolean {
    this._estimations = [];

    return true;
  }

}
