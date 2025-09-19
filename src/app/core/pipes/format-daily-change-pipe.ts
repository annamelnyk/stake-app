import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDailyChange',
})
export class FormatDailyChangePipe implements PipeTransform {
  transform(value: number): string {
    const fixedValue = Number(value.toFixed(2));
    if (fixedValue > 0) {
      return `+${fixedValue}%`;
    }

    if (fixedValue === 0) {
      return `${fixedValue}%`;
    }

    return `${fixedValue}%`;
  }
}
