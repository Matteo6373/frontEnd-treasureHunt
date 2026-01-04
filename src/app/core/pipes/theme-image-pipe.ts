import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'themeImage'
})
export class ThemeImagePipe implements PipeTransform {

  transform(theme: string): string {
    switch (theme?.toUpperCase()) {
      case 'PIRATES': return 'images/pirates.jpg';
      case 'FANTASY': return 'images/fantasy.jpg';
      case 'MYSTERY': return 'images/mystery.jpg';
      case 'HISTORY': return 'images/history.jpg';
      default: return 'images/default.jpg';
    }
  }
}
