import { Component, OnInit } from '@angular/core';
import { Estimation, Member } from 'src/app/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-estimation-summary-view',
  templateUrl: 'estimation-summary.view.html',
  styleUrls: ['estimation-summary.view.scss'],
})
export class EstimationSummaryViewComponent implements OnInit {
  public complexityAvg: number;
  public effortAvg: number;

  public estimations: Estimation[] = [];

  /**
   * The currently selected group. It's guaranteed that we have
   * an active group at this point because we come from one.
   */
  public members: Member[];

  constructor(private navCtrl: NavController) {}

  public ngOnInit(): void {
    this.estimations = history.state.estimations || [];
    this.members = history.state.members || [];

    this.calculateEstimationAvarage();
  }

  /**
   * Calculates the effort/complexity avarages.
   */
  public calculateEstimationAvarage(): void {
    this.complexityAvg =
      this.estimations.reduce((sum, estimation) => sum + estimation.complexity, 0) / this.estimations.length;
    this.effortAvg = this.estimations.reduce((sum, estimation) => sum + estimation.effort, 0) / this.estimations.length;
  }

  public getName(userId: string): string {
    const user = this.members.find(member => member.id === userId);

    return user.name || '? ?';
  }

  public newTurn(): void {
    this.navCtrl.navigateBack('/estimations/selector');
  }
}
