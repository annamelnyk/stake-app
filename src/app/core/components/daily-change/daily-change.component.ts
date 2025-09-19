import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormatDailyChangePipe } from '../../pipes/format-daily-change-pipe';

@Component({
  selector: 'app-daily-change',
  imports: [FormatDailyChangePipe],
  templateUrl: './daily-change.component.html',
  styleUrls: ['./daily-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyChangeComponent {
  dailyChangeAmount = input.required<number>();
}
