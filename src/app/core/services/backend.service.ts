import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockDetails, StockPrice } from '../model/stock.model';

@Injectable({
  providedIn: 'root',
})
export class Backend {
  http = inject(HttpClient);

  getStockDetails(): Observable<StockDetails[]> {
    return this.http.get<StockDetails[]>('/assets/mock-data/details.json');
  }

  getStockPrices(): Observable<StockPrice[]> {
    return this.http.get<StockPrice[]>('/assets/mock-data/pricing.json');
  }
}
