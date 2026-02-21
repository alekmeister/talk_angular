import { Component, Input } from '@angular/core';
import { ProfileInterface } from '@services/profile/profile.interface';
import { ImgUrlsPipe } from '@shared/pipes/img-urls-pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlsPipe, NgOptimizedImage],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.css',
})
export class SubscriberCard {
  @Input() profile!: ProfileInterface;
}
