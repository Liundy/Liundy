"use client";

import { useEffect, useRef } from "react";

type Quote = { code:string; name:string; price:number|null; pct:number|null; amount:number|null };
type Payload = { ok:boolean; updatedAt?:string; quotes?:Quote[]; market?:{ totalAmount:number; upCount:number; downCount:number; flatCount:number } };

const order = ["000001","399001","399006","000688","000300"];

function fmtAmount(v:number|null|undefined){
  if(!v || !Number.isFinite(v)) return "--";
  if(v >= 1e12) return `${(v/1e12).toFixed(2)}万亿`;
  if(v >= 1e8) return `${(v/1e8).toFixed(2)}亿`;
  return `${(v/1e4).toFixed(0)}万`;
}

function fmtPct(v:number|null|undefined){
  if(v == null || !Number.isFinite(v)) return "--";
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

export default function LiveMarketBridge(){
  const lastOk = useRef<Date|null>(null);
  useEffect(()=>{
    let stopped=false;
    const run=async()=>{
      try{
        const res=await fetch("/api/market/quotes",{cache:"no-store"});
        const data:Payload=await res.json();
        if(stopped || !data.ok || !data.quotes) return;
        lastOk.current=new Date();
        const cards=Array.from(document.querySelectorAll<HTMLElement>(".indexStrip .indexCard"));
        order.forEach((code,i)=>{
          const q=data.quotes?.find(x=>x.code===code);
          const card=cards[i];
          if(!q || !card) return;
          const name=card.querySelector("span");
          const price=card.querySelector("b");
          const pct=card.querySelector("em");
          if(name) name.textContent=q.name || name.textContent;
          if(price && q.price!=null) price.textContent=q.price.toFixed(2);
          if(pct){ pct.textContent=fmtPct(q.pct); pct.classList.toggle("liveNeg",(q.pct??0)<0); }
        });
        if(cards[5] && data.market){
          const b=cards[5].querySelector("b");
          const e=cards[5].querySelector("em");
          if(b) b.textContent=fmtAmount(data.market.totalAmount);
          if(e) e.textContent="实时两市成交";
        }
        if(cards[7] && data.market){
          const b=cards[7].querySelector("b");
          const e=cards[7].querySelector("em");
          if(b) b.textContent=`${data.market.upCount} / ${data.market.downCount}`;
          if(e) e.textContent=`平盘 ${data.market.flatCount}`;
        }
        const status=document.querySelector<HTMLElement>(".clock small");
        if(status) status.textContent="真实行情试运行 · 5s刷新";
        document.body.dataset.liveMarket="ok";
      }catch{
        document.body.dataset.liveMarket="fallback";
        const status=document.querySelector<HTMLElement>(".clock small");
        if(status && !lastOk.current) status.textContent="行情源暂不可用 · 使用页面备用值";
      }
    };
    run();
    const timer=setInterval(run,5000);
    return()=>{stopped=true;clearInterval(timer)};
  },[]);
  return null;
}
