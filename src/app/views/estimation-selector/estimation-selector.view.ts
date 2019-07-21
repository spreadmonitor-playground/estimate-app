import { Component } from '@angular/core';
import { EstimationService } from '../../services/estimation.service';
import { GroupsService } from '../../services/groups.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, tap, map, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { Member } from 'src/app/interfaces';
import { UserQuery } from 'src/app/state';

@Component({
  selector: 'app-estimation-selector-view',
  templateUrl: 'estimation-selector.view.html',
  styleUrls: ['estimation-selector.view.scss'],
})
export class EstimationSelectorViewComponent {
  private onDestroy = new Subject<void>();

  public members: Member[] = [];
  public hasSentEstimation: boolean = false;

  public selectedComplexity: number = undefined;
  public selectedEffort: number = undefined;

  public readonly complexities: number[] = [1, 2, 3, 5, 8, 13];

  public readonly efforts: string[] = [
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

  constructor(
    private readonly estimationService: EstimationService,
    private readonly groupService: GroupsService,
    private readonly userQuery: UserQuery,
    private readonly router: Router,
    private navCtrl: NavController
  ) {}

  /**
   * This view is cached by default so instead of the regular ngOnInit we use
   * the ionViewWillEnter life-cycle hook.
   */
  public ionViewWillEnter(): void {
    this.onDestroy = new Subject<void>();

    const combinedStream = combineLatest([
      this.estimationService.estimations,
      this.groupService.currentGroup.pipe(
        filter(group => !!group),
        map(({ members }) => members)
      ),
    ]);

    combinedStream
      .pipe(
        tap(([estimations, members]) => {
          this.members = members.map(member => ({
            ...member,
            status: estimations.some(estimation => estimation.userId === member.id) ? 'checkmark' : null,
          }));
        }),
        filter(([estimations, members]) => estimations.length === members.length),
        tap(([estimations, members]) => {
          this.router.navigate(['/estimations/summary'], { state: { estimations, members } });
          this.selectedComplexity = undefined;
          this.selectedEffort = undefined;
        }),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  public ready(): void {
    this.hasSentEstimation = true;

    this.estimationService.sendEstimation({
      complexity: this.selectedComplexity,
      effort: this.selectedEffort,
      userId: this.userQuery.getValue().id,
    });
  }

  public get canSelectReady(): boolean {
    return (
      !this.hasSentEstimation && !(Number.isInteger(this.selectedComplexity) && Number.isInteger(this.selectedEffort))
    );
  }

  public leave(): void {
    this.groupService.leaveCurrentGroup();
    this.navCtrl.navigateBack('/room-selector');
  }

  /**
   * This view is cached by default so instead of the regular ngOnDestroy we use
   * the ionViewDidLeave life-cycle hook.
   */
  public ionViewDidLeave(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    // Clear the estimations so the app doesn't get into an endless loop
    this.estimationService.estimations.next([]);
  }
}
