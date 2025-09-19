import { inject, Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { StockHolding } from "../model/stock.model"
import { Storage, StorageKey } from "./storage.service"

@Injectable({
  providedIn: "root",
})
export class UserInvestments {
  storageService = inject(Storage)
  #investments = new BehaviorSubject<StockHolding[]>([])
  investments$ = this.#investments.asObservable()

  constructor() {
    this.init()
  }

  init() {
    this.retrieveUserInvestments()
  }

  retrieveUserInvestments() {
    let investments: StockHolding[] | null = this.storageService.getItem(
      StorageKey.Investments
    )

    if (!investments) {
      investments = []
      this.storageService.setItem(StorageKey.Investments, investments)
    }

    this.#investments.next(investments)
  }

  purchaseInvestment(newInvestment: StockHolding) {
    const userInvestments = this.#investments.getValue()

    const investments = [...userInvestments, newInvestment]
    this.storageService.setItem(StorageKey.Investments, investments)
    this.#investments.next(investments)
  }
}
