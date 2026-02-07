import {Component, Input} from '@angular/core';
import {ProfileInterface} from '../../../services/profile/profile.interface';
import {ImgUrlsPipe} from '../../pipes/img-urls-pipe';

@Component({
  selector: 'app-profile-card',
  imports: [
    ImgUrlsPipe
  ],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css',
})
export class ProfileCard {
  @Input() profile?: ProfileInterface
}
