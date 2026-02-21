import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from 'shared/ui/sidebar';
import { ProfileService } from '@services/profile/profile';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  profileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getMe();
  }
}
