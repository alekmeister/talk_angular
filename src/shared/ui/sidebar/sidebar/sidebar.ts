import { Component, inject, OnInit } from '@angular/core';
import { SvgIcon } from '@shared/ui/svg-icon/svg-icon';
import { AsyncPipe, NgForOf } from '@angular/common';

import { RouterLink } from '@angular/router';
import { ProfileService } from '@services/profile/profile';
import { SubscriberCard } from '@shared/ui/sidebar/subscriber-card/subscriber-card';
import { firstValueFrom } from 'rxjs';
import { ImgUrlsPipe } from '@shared/pipes/img-urls-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, NgForOf, RouterLink, AsyncPipe, SubscriberCard, ImgUrlsPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList(); // $ Observable
  me = this.profileService.me;

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
  // ngOnInit аля componentDidMount() или
  //   useEffect(() => {
  //       profileService.getMe();
  //   }, [])

  ngOnInit() {
    // firstValueFrom без него не выполнится, или нужно подписаться. + в том, что не нужно будет управлять подпиской/отпиской
    firstValueFrom(this.profileService.getMe());
  }
}
