import { Component } from '@angular/core';

@Component({
  selector: 'app-estimation-selector-view',
  templateUrl: 'estimation-selector.view.html',
  styleUrls: ['estimation-selector.view.scss'],
})
export class EstimationSelectorViewComponent {
  
  public complexities: string[] = [
    'complexity: 1',
    'complexity: 2',
    'complexity: 3',
    'complexity: 4'
  ];

  public efforts: string[] = [
    'effort0: 20 minutes',
    'effort1: 1 hour'
  ];

}
