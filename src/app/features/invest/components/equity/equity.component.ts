import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonCol, IonLabel, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-equity',
  imports: [IonLabel, CurrencyPipe, IonRow, IonCol],
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquityComponent {
  total = input(0);
}
