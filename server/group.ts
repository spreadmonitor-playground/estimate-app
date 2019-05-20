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

  public addEstimation(estimation: Estimation): boolean {
    this._estimations = [...this.estimations, estimation];

    return true;
  }

}
