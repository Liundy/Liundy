"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const dates = ["07-30","07-31","08-03","08-04","08-05","08-06","08-07","08-10","08-11","08-12","08-13","08-14","08-17","08-18","08-19"];
const profit = [260,920,280,860,1240,840,1020,660,430,420,260,410,910,470,80];
const loss = [980,590,1050,80,120,170,220,330,520,260,620,510,120,260,1720];
const up3 = [26,42,26,205,141,298,210,67,49,51,44,41,51,69,23];
const down3 = [306,18,83,2,2,2,3,7,3,3,4,6,2,7,52];
const limitAmt = [280,790,360,1630,1110,970,1130,590,480,690,370,940,950,570,150];
const limitCount = [54,102,82,139,108,97,101,74,59,96,63,107,111,80,39];
const ladder = [52,103,82,141,106,84,75,103,58,97,62,65,109,81,39];
const height = [8,9,6,7,8,5,4,5,6,7,5,5,4,4,3];
const themes = ["芯片","通信","算力","医药","AI应用","机器人","军工","消费电子","其他"];
const themePos = [18,22,25,30,27,23,29,21,19,28,24,31,26,22,14];
const themeNeg = [23,27,24,31,25,21,28,20,19,26,22,29,27,23,18];
const strong = [28,22,25,20,24,29,21,36,22,17,30,19,23,31,25];

function Head({title,sub}:{title:string;sub?:string}){return <div className="sectionHead"><div><b>{title}</b>{sub&&<span>{sub}</span>}</div><small>演示数据 · 向下滚动查看更多</small></div>}

function StackedBars(){return <div className="stackChart">{dates.map((d,i)=><div className="stackCol" key={d}><div className="stackAxis"><i className="p1" style={{height:`${Math.max(8,profit[i]*.10)}px`}}/><i className="p2" style={{height:`${Math.max(5,profit[i]*.035)}px`}}/><i className="n1" style={{height:`${Math.max(6,loss[i]*.07)}px`}}/><i className="n2" style={{height:`${Math.max(4,loss[i]*.03)}px`}}/></div><span>{d}</span></div>)}</div>}
function CountBars(){return <div className="countChart">{dates.map((d,i)=><div key={d}><div className="countPair"><i className="upbar" style={{height:`${Math.max(6,up3[i]*.48)}px`}}><b>{up3[i]}</b></i><i className="downbar" style={{height:`${Math.max(5,down3[i]*.36)}px`}}><b>{down3[i]}</b></i></div><span>{d}</span></div>)}</div>}
function LineBars(){return <div className="lineBars"><svg viewBox="0 0 900 260" preserveAspectRatio="none"><polyline className="moneyLine" points={limitAmt.map((v,i)=>`${30+i*60},${225-v*.105}`).join(" ")}/><polyline className="countLine" points={limitCount.map((v,i)=>`${30+i*60},${225-v*1.15}`).join(" ")}/>{limitAmt.map((v,i)=><g key={i}><circle className="moneyDot" cx={30+i*60} cy={225-v*.105} r="3"/><circle className="countDot" cx={30+i*60} cy={225-limitCount[i]*1.15} r="3"/><text x={22+i*60} y={244} className="svgLabel">{dates[i]}</text></g>)}</svg></div>}
function LadderBars(){return <div className="ladderChart">{dates.map((d,i)=><div key={d}><div className="ladderBar"><i className="l1" style={{height:`${ladder[i]*1.05}px`}}/><i className="l2" style={{height:`${Math.max(4,ladder[i]*.18)}px`}}/><i className="l3" style={{height:`${Math.max(3,ladder[i]*.09)}px`}}/></div><b>{height[i]}板</b><span>{d}</span></div>)}</div>}
function ThemeStack({negative=false}:{negative?:boolean}){const arr=negative?themeNeg:themePos;return <div className="themeStack">{dates.map((d,i)=><div key={d}><div className={negative?"themeColumn negative":"themeColumn"} style={{height:`${Math.max(45,arr[i]*4.4)}px`}}>{themes.slice(0,5+(i%4)).map((t,j)=><i key={t} className={`t${j%6}`}>{t}</i>)}</div><span>{d}</span></div>)}</div>}
function StrongTheme(){return <div className="themeStack strongStack">{dates.map((d,i)=><div key={d}><div className="themeColumn" style={{height:`${Math.max(55,strong[i]*4.1)}px`}}>{themes.slice(0,6+(i%3)).map((t,j)=><i key={t} className={`t${(j+2)%6}`}>{t}</i>)}</div><span>{d}</span></div>)}</div>}

export default function SentimentExtras(){
  const [target,setTarget]=useState<Element|null>(null);
  useEffect(()=>{
    const sync=()=>{const active=document.querySelector(".activeNav");setTarget(active?.textContent?.trim()==="整体情绪"?document.querySelector(".page"):null)};
    sync();
    document.addEventListener("click",()=>setTimeout(sync,0));
    const obs=new MutationObserver(sync);obs.observe(document.body,{subtree:true,childList:true,attributes:true});
    return()=>obs.disconnect();
  },[]);
  if(!target)return null;
  return createPortal(<div className="sentimentExtras">
    <div className="extraGrid two">
      <div className="panel"><Head title="概念资金流向 V3" sub="隔日盈利 / 隔日亏损 / 日内盈利 / 日内亏损"/><StackedBars/></div>
      <div className="panel"><Head title="三日大涨大跌数 V3" sub="3日大涨 vs 3日大跌"/><CountBars/></div>
    </div>
    <div className="extraGrid three">
      <div className="panel"><Head title="Top15题材-赚钱效应 V3"/><ThemeStack/></div>
      <div className="panel"><Head title="Top15题材-亏钱效应 V3"/><ThemeStack negative/></div>
      <div className="panel"><Head title="Top15强势前排题材 V3"/><StrongTheme/></div>
    </div>
    <div className="extraGrid two">
      <div className="panel"><Head title="多日涨停/炸板 金额·数量图" sub="涨停额 / 炸板额 / 涨停数 / 炸板数"/><LineBars/></div>
      <div className="panel"><Head title="连板梯队涨停额" sub="首板 / 二板 / 三板 / 三板以上"/><LadderBars/></div>
    </div>
    <div className="extraGrid one">
      <div className="panel"><Head title="连板梯队涨停数 + 最高连板高度"/><div className="ladderWithLine"><LadderBars/><div className="heightLine">最高板高度：{height.map((h,i)=><span key={i}>{dates[i]} <b>{h}板</b></span>)}</div></div></div>
    </div>
  </div>,target);
}
