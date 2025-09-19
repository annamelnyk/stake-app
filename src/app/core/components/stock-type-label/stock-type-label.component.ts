import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StockType, StockTypeEnum } from '../../model/stock.model';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-stock-type-label',
  imports: [TitleCasePipe, UpperCasePipe],
  templateUrl: './stock-type-label.component.html',
  styleUrls: ['./stock-type-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockTypeLabelComponent {
  stockType = input.required<StockType>();

  protected StockTypeEnum = StockTypeEnum;
}
