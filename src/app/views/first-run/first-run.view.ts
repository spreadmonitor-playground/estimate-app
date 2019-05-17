import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-run-view',
  templateUrl: 'first-run.view.html',
  styleUrls: ['first-run.view.scss'],
})
export class FirstRunViewComponent implements OnInit {

  public readonly form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  /**
   * If the user has been alrady set we just redirect from this page
   * to the group selector.
   */
  ngOnInit() {
    if (this.profileService.userNameSet) {
      this.router.navigate(['/room-selector']);
    }
  }

  /**
   * Saves the currently entere username and redirects
   * the app the group listing page
   */
  public save() {
    if (this.form.valid) {
      const { firstName, lastName } = this.form.value;

      this.profileService.userName = `${firstName} ${lastName}`;
      this.router.navigate(['/room-selector']);
    }
  }
}
