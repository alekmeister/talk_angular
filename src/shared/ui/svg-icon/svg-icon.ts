import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]', // захватываем любой svg с аттрибутом icon
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>', // создание <use> внутри <svg>
  styles: [''],
})
export class SvgIcon {
  @Input() icon = '';

  get href() {
    return `/assets/images/${this.icon}.svg`;
  }
}
