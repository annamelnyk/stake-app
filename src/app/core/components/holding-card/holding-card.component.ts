import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonItem } from '@ionic/angular/standalone';

import { CurrencyPipe } from '@angular/common';
import { StockHolding } from '../../model/stock.model';
import { BuyStockComponent } from '../buy-stock/buy-stock.component';
import { StockTypeLabelComponent } from '../stock-type-label/stock-type-label.component';

@Component({
  selector: 'app-holding-card',
  imports: [IonItem, StockTypeLabelComponent, CurrencyPipe],
  providers: [ModalController],
  templateUrl: './holding-card.component.html',
  styleUrls: ['./holding-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldingCardComponent {
  holding = input.required<StockHolding>();

  modalCtrl = inject(ModalController);

  async openBuyStockModal() {
    const modal = await this.modalCtrl.create({
      component: BuyStockComponent,
      cssClass: ['floating-modal', 'buy-modal'],
      initialBreakpoint: 0.5,
      keyboardClose: false,
      componentProps: {
        stock: this.holding(),
      },
    });
    await modal.present();
  }
}
