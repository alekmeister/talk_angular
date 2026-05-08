import { Component, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIcon } from '@shared/ui/svg-icon/svg-icon';
import { ProfileHeader } from '@shared/ui/profile-header';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ImgUrlsPipe } from '@shared/pipes/img-urls-pipe';
import { ProfileService } from '@services/profile/profile';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, SvgIcon, RouterLink, ImgUrlsPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  profileService = inject(ProfileService);

  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);
  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    }),
  );
}
