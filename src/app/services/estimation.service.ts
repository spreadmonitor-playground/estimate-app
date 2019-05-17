import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estimation } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  public estimations: Observable<Estimation[]>;

  public sendEstimation(estimations: Estimation) {

  }

  public startEstimation() {

  }
}
