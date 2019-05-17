import { Component } from '@angular/core';

@Component({
  selector: 'app-estimation-summary-view',
  templateUrl: 'estimation-summary.view.html',
  styleUrls: ['estimation-summary.view.scss'],
})
export class EstimationSummaryViewComponent {

  public estimations = [
    {
      complexity: 5,
      effort: 5,
      member: {
        name: '2 T'
      }
    },
    {
      complexity: 5,
      effort: 5,
      member: {
        name: 'T T'
      },
      own: true
    }
  ]
}
