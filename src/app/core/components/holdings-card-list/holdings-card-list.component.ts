import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { InfiniteScrollCustomEvent, IonList } from '@ionic/angular/standalone';

import { StockHolding } from '../../model/stock.model';
import { HoldingCardComponent } from '../holding-card/holding-card.component';

@Component({
  selector: 'app-holdings-card-list',
  imports: [IonList, HoldingCardComponent],
  templateUrl: './holdings-card-list.component.html',
  styleUrls: ['./holdings-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldingsCardListComponent implements OnInit {
  holdings = input<StockHolding[]>([]);
  holdingsToRender: StockHolding[] = [];
  constructor() {}

  ngOnInit() {
    this.getHoldingsChunk();
  }

  getHoldingsChunk() {
    const renderedHoldingLength = this.holdingsToRender.length;
    this.holdingsToRender = this.holdings().slice(
      renderedHoldingLength,
      renderedHoldingLength + 5
    );
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.getHoldingsChunk();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
