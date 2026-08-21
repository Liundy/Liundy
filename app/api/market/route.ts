import { NextResponse } from 'next/server';
import { DemoMarketProvider } from '@/app/lib/market/provider';

export async function GET() {
  const provider = new DemoMarketProvider();
  const quotes = await provider.getWatchlist();

  return NextResponse.json({
    success: true,
    data: quotes,
    source: 'demo',
  });
}
