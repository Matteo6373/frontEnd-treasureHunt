import { Pipe, PipeTransform } from '@angular/core';
import {TreasureTheme} from '../model/TreasureTheme';


@Pipe({
  name: 'themeImage',
})
export class ThemeImagePipe implements PipeTransform {

  transform(theme: TreasureTheme | null | undefined): string {
    switch (theme) {
      case TreasureTheme.PIRATES:
        return 'images/pirates.jpg';

      case TreasureTheme.FANTASY:
        return 'images/fantasy.jpg';

      case TreasureTheme.MYSTERY:
        return 'images/mystery.jpg';

      case TreasureTheme.HISTORY:
        return 'images/history.jpg';

      default:
        return 'images/default.jpg';
    }
  }
}
