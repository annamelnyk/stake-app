import { inject, Injectable } from "@angular/core"
import { BehaviorSubject, forkJoin, map, tap } from "rxjs"
import { StockHolding, StockInfo } from "../model/stock.model"
import { Backend } from "./backend.service"

@Injectable({
  providedIn: "root",
})
export class Stock {
  backendService = inject(Backend)

  #stocksList = new BehaviorSubject<StockInfo[]>([])
  stocksList$ = this.#stocksList.asObservable()

  #stocksListInfo = new BehaviorSubject<StockHolding[]>([])
  stocksListInfo$ = this.#stocksListInfo.asObservable()

  constructor() {
    this.getCurrentStocks().subscribe()
  }

  getCurrentStocks() {
    return forkJoin({
      details: this.backendService.getStockDetails(),
      price: this.backendService.getStockPrices(),
    }).pipe(
      map((data) =>
        data.details.map((stockDetail, index) => ({
          ...data.price[index],
          ...stockDetail,
        }))
      ),
      tap((stocks) => this.#stocksList.next(stocks)),
      tap((stocks) => this.buildStockListInfo(stocks))
    )
  }

  buildStockListInfo(stocks: StockInfo[]): void {
    const stockHoldings: StockHolding[] = stocks.map(
      ({
        id,
        symbol,
        fullName,
        logo,
        type,
        high,
        low,
        close,
        open,
        marketCap,
      }): StockHolding => {
        const sh: StockHolding = {
          id,
          symbol,
          fullName,
          logo,
          type,
          price: this.getDailyPrice(high, low),
          dailyChangeAmount: this.getDailyChangeAmount(close, open),

          shares: this.getOutstandingShares(marketCap, close),
        }

        return {
          ...sh,
          dailyChangeAmountPercent: this.getDailyChangeAmountPercent(
            sh.dailyChangeAmount,
            open
          ),
        }
      }
    )
    this.#stocksListInfo.next(stockHoldings)
  }

  getDailyPrice(high: number, low: number): number {
    return (high + low) / 2
  }

  getOutstandingShares(marketCap: number, closePrice: number): number {
    return marketCap / closePrice
  }

  getDailyChangeAmount(close: number, open: number): number {
    return close - open
  }

  getDailyChangeAmountPercent(
    dailyChange: number | undefined,
    open: number
  ): number {
    if (typeof dailyChange !== "number") return 0
    return (dailyChange / open) * 100
  }

  getDailyTurnOver(volume: number, close: number): number {
    return volume * close
  }
}
