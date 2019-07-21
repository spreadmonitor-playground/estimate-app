import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore, UserQuery } from 'src/app/state';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-first-run-view',
  templateUrl: 'first-run.view.html',
  styleUrls: ['first-run.view.scss'],
})
export class FirstRunViewComponent implements OnInit {
  public readonly form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userStore: UserStore,
    private readonly socketService: SocketService,
    private readonly userQuery: UserQuery
  ) {}

  /**
   * If the name has been already set then we pre-populate the form.
   */
  public ngOnInit(): void {
    this.form.patchValue(this.userQuery.getValue());
  }

  /**
   * Saves the currently entered username and redirects
   * the app the group listing page if the form is valid.
   */
  public save(): void {
    if (this.form.valid) {
      const { firstName, lastName } = this.form.value;

      this.userStore.update({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      });

      this.socketService.dispatchMessage('setProfile', this.userQuery.getValue());

      this.router.navigate(['/room-selector']);
    }
  }
}
