import type { MarketQuote } from './types';

export interface MarketProvider {
  getWatchlist(): Promise<MarketQuote[]>;
}

/**
 * Demo provider kept behind an interface.
 * Replace this implementation with a licensed A-share data provider later.
 */
export class DemoMarketProvider implements MarketProvider {
  async getWatchlist(): Promise<MarketQuote[]> {
    return [
      {
        symbol: '000001',
        name: '平安银行',
        price: 12.35,
        change: 0.18,
        changePercent: 1.48,
        volume: 128000000,
        updatedAt: new Date().toISOString(),
      },
      {
        symbol: '600519',
        name: '贵州茅台',
        price: 1420,
        change: -8.2,
        changePercent: -0.57,
        volume: 3500000,
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}
