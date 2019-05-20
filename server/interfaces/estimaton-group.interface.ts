import { Member } from './member.interface';
import { Estimation } from './estimation.interface';

export interface EstimationGroup {
    id: string;
    members: Member[];
    estimations: Estimation[];
}