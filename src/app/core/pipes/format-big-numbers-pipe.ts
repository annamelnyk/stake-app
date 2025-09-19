import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBigNumbers',
})
export class FormatBigNumbersPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000000000) {
      return this.replaceZeroWithLetterValue(value / 1000000000, 'b');
    }
    if (value >= 1000000) {
      return this.replaceZeroWithLetterValue(value / 1000000, 'm');
    }
    if (value >= 1000) {
      return this.replaceZeroWithLetterValue(value / 1000, 'k');
    }

    if (value < 1000 && value !== 0) {
      return value.toFixed(1);
    }
    return value.toString();
  }

  replaceZeroWithLetterValue(value: number, label: string): string {
    return value.toFixed(1).replace(/\.0$/, '') + label;
  }
}
