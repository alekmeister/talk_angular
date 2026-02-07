import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrls',
})
export class ImgUrlsPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if(!value) return null
    return `https://icherniakov.ru/yt-course/${value}`;
  }

}
