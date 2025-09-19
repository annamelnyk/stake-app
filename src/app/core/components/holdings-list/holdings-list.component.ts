import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';

import { HoldingItemComponent } from 'src/app/core/components/holding-item/holding-item.component';
import { StockHolding } from 'src/app/core/model/stock.model';

@Component({
  selector: 'app-holdings-list',
  imports: [IonGrid, IonRow, IonCol, HoldingItemComponent],
  templateUrl: './holdings-list.component.html',
  styleUrls: ['./holdings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldingsListComponent {
  holdings = input<StockHolding[]>([]);
}
