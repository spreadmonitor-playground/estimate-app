import { Component } from '@angular/core';
import { EstimationService } from '../../services/estimation.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-estimation-selector-view',
  templateUrl: 'estimation-selector.view.html',
  styleUrls: ['estimation-selector.view.scss'],
})
export class EstimationSelectorViewComponent {

  constructor(
    private estimationService: EstimationService,
    private profileService: ProfileService,
  ) {
  }

  public hasSentEstimation: boolean = false;

  public selectedComplexity: number = undefined;
  public selectedEffort: number = undefined;


  public complexities: number[] = [ 1, 2, 3, 5, 8, 13];

  public efforts: string[] = [
    'effort0: 20 minutes',
    'effort1: 1 hour',
    'effort2: 2 hours',
    'effort3: 4 hours',
    'effort4: 1 day',
    'effort5: 2 days',
    'effort6: 3 days',
    'effort7: 4 days',
    'effort8: 1 week',
  ];

  get canSelectReady(): boolean {
    return !this.hasSentEstimation && !(Number.isInteger(this.selectedComplexity) && Number.isInteger(this.selectedEffort));
  }

  ngOninit() {
    this.estimationService.estimations.subscribe(console.warn);
  }

  ready() {
    this.hasSentEstimation = true;

    this.estimationService.sendEstimation({
      complexity: this.selectedComplexity,
      effort: this.selectedEffort,
      userId: this.profileService.user.id,
    });
  }
}
