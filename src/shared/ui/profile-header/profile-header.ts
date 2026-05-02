import { Component, input } from '@angular/core';
import { ProfileInterface } from '@services/profile/profile.interface';
import { ImgUrlsPipe } from '@shared/pipes/img-urls-pipe';

@Component({
  selector: 'app-profile-header',
  imports: [ImgUrlsPipe],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {
  // новый вариант через сигналы
  profile = input<ProfileInterface>();
}
