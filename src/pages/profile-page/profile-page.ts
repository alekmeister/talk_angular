import { Component, inject } from '@angular/core';
import { ProfileHeader } from '@shared/ui/profile-header';
import { ProfileService } from '@services/profile/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIcon } from '@shared/ui/svg-icon/svg-icon';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, SvgIcon, RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  profileService = inject(ProfileService);

  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    }),
  );
}
