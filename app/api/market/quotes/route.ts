import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type EastMoneyRow = Record<string, number | string | null>;

const SECIDS = "1.000001,0.399001,0.399006,1.000688,1.000300";
const FIELDS = "f2,f3,f4,f6,f12,f14,f104,f105,f106";

function toNumber(v: unknown) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalize(row: EastMoneyRow) {
  return {
    code: String(row.f12 ?? ""),
    name: String(row.f14 ?? ""),
    price: toNumber(row.f2),
    pct: toNumber(row.f3),
    change: toNumber(row.f4),
    amount: toNumber(row.f6),
    upCount: toNumber(row.f104),
    downCount: toNumber(row.f105),
    flatCount: toNumber(row.f106),
  };
}

export async function GET() {
  const url = new URL("https://push2.eastmoney.com/api/qt/ulist.np/get");
  url.searchParams.set("secids", SECIDS);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("fltt", "2");
  url.searchParams.set("invt", "2");
  url.searchParams.set("ut", "fa5fd1943c7b386f172d6893dbbd1d0c");

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(url.toString(), {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://quote.eastmoney.com/",
      },
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const json = await res.json();
    const raw = json?.data?.diff;
    const rows: EastMoneyRow[] = Array.isArray(raw) ? raw : raw && typeof raw === "object" ? Object.values(raw) : [];
    const quotes = rows.map(normalize);

    const sh = quotes.find(q => q.code === "000001");
    const sz = quotes.find(q => q.code === "399001");
    const totalAmount = (sh?.amount ?? 0) + (sz?.amount ?? 0);
    const upCount = (sh?.upCount ?? 0) + (sz?.upCount ?? 0);
    const downCount = (sh?.downCount ?? 0) + (sz?.downCount ?? 0);
    const flatCount = (sh?.flatCount ?? 0) + (sz?.flatCount ?? 0);

    return NextResponse.json({
      ok: true,
      source: "eastmoney-public",
      updatedAt: new Date().toISOString(),
      quotes,
      market: { totalAmount, upCount, downCount, flatCount },
    }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      source: "eastmoney-public",
      error: error instanceof Error ? error.message : "unknown error",
      updatedAt: new Date().toISOString(),
    }, { status: 502, headers: { "Cache-Control": "no-store, max-age=0" } });
  }
}
