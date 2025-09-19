export enum StockTypeEnum {
  Stock = 'stock',
  Etf = 'etf',
  Otc = 'otc',
}
export type StockType =
  | StockTypeEnum.Stock
  | StockTypeEnum.Etf
  | StockTypeEnum.Otc;

export interface StockPrice {
  id: string;
  symbol: string;
  open: number;
  close: number;
  ask: number;
  high: number;
  low: number;
}

export interface StockDetails {
  id: string;
  symbol: string;
  type: StockType;
  fullName: string;
  logo: string;
  volume: number;
  marketCap: number;
}

export type StockInfo = StockDetails & StockPrice;

export interface StockHolding {
  id: string;
  symbol: string;
  logo: string;
  type: StockType;
  fullName: string;
  price: number;
  dailyChangeAmount?: number;
  dailyChangeAmountPercent?: number;
  dailyTurnOver?: number;
  shares: number;
  //priceRange?: string;
}
