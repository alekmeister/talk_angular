import {Component, inject, OnInit, signal} from '@angular/core';
import {ProfileService} from '../../services/profile/profile';
import {ProfileInterface} from '../../services/profile/profile.interface';
import {ProfileCard} from '../../shared/ui/profile-card/profile-card';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCard
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage implements OnInit {
  profileService = inject(ProfileService)
  profiles = signal<ProfileInterface[]>([]);

  ngOnInit() {
    this.profileService.getTestAccounts().subscribe(val => {
      this.profiles.set(val)
    })
  }
}
