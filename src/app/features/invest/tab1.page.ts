import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { delay, Observable, tap } from 'rxjs';
import { HoldingsCardListComponent } from 'src/app/core/components/holdings-card-list/holdings-card-list.component';
import { HoldingsListComponent } from 'src/app/core/components/holdings-list/holdings-list.component';
import { LoaderComponent } from 'src/app/core/components/loader/loader.component';
import { SubheaderComponent } from 'src/app/core/components/subheader/subheader.component';
import { StockHolding } from 'src/app/core/model/stock.model';
import { Stock } from 'src/app/core/services/stock.service';
import { UserInvestments } from 'src/app/core/services/user-investments.service';
import { EquityComponent } from 'src/app/features/invest/components/equity/equity.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    EquityComponent,
    SubheaderComponent,
    HoldingsListComponent,
    HoldingsCardListComponent,
    IonGrid,
    IonRow,
    IonCol,
    LoaderComponent,
    AsyncPipe,
  ],
})
export class Tab1Page {
  stockService = inject(Stock);
  userInvestmentsService = inject(UserInvestments);
  loading = true;

  userInvestments$ = this.userInvestmentsService.investments$;
  stocks$: Observable<StockHolding[]> = this.stockService.stocksListInfo$.pipe(
    delay(1000),
    tap(() => (this.loading = false))
  );
}
