import { Component } from '@angular/core';
import { SvgIcon } from '@shared/ui/svg-icon/svg-icon';
import { NgForOf, NgOptimizedImage } from '@angular/common';

import { RouterLink } from '@angular/router';
import { SubscriberCard } from '../subscriber-card/subscriber-card';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, NgForOf, NgOptimizedImage, SubscriberCard, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
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
