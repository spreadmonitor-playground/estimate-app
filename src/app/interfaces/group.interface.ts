import { Member } from './member.interface';
import { Estimation } from './estimation.interface';

export interface Group {
  id: string;
  members: Member[];

  estimations: Estimation[];
}
