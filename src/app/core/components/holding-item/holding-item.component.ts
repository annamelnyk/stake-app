import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonCol, IonRow } from '@ionic/angular/standalone';
import { StockHolding } from '../../model/stock.model';
import { FormatBigNumbersPipe } from '../../pipes/format-big-numbers-pipe';
import { DailyChangeComponent } from '../daily-change/daily-change.component';

@Component({
  selector: 'app-holding-item',
  imports: [
    IonRow,
    IonCol,
    NgTemplateOutlet,
    DailyChangeComponent,
    CurrencyPipe,
    FormatBigNumbersPipe,
  ],
  templateUrl: './holding-item.component.html',
  styleUrls: ['./holding-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldingItemComponent {
  holding = input.required<StockHolding>();
  showDailyChange = input(true);
}
