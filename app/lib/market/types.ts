export type MarketQuote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  updatedAt: string;
};

export type KLinePoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
