import { Component, inject } from '@angular/core';
import { SvgIcon } from '@shared/ui/svg-icon/svg-icon';
import { AsyncPipe, NgForOf } from '@angular/common';

import { RouterLink } from '@angular/router';
import { ProfileService } from '@services/profile/profile';
import { SubscriberCard } from '@shared/ui/sidebar/subscriber-card/subscriber-card';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, NgForOf, RouterLink, AsyncPipe, SubscriberCard],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '',
    },
    {
      label: 'Чаты',
      icon: 'message',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];
}
