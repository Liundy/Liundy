"use client";

import { useEffect, useState } from "react";

type AuctionRow = {
  code: string;
  name: string;
  tags: string[];
  prev: string;
  t915: string;
  t920: string;
  t925: string;
  d920: string;
  d925: string;
  auction: string;
  open: string;
  amount: string;
  ratio: string;
  concept: string;
};

const indexes = [
  ["上证指数", "3728.03", "+0.63%"],
  ["深证成指", "11835.57", "+0.84%"],
  ["创业板指", "2536.41", "+1.02%"],
  ["科创50", "1098.85", "+1.14%"],
  ["沪深300", "4373.92", "+0.89%"],
  ["两市成交", "1256.38亿", "+8.45%"],
];

const auctionRows: AuctionRow[] = [
  { code:"002625", name:"光启技术", tags:["爆量","高开","高换手"], prev:"涨停4天3板", t915:"4426", t920:"6526", t925:"7542", d920:"+47.46%", d925:"+15.57%", auction:"+10.00%", open:"+10.03%", amount:"7821", ratio:"10.32", concept:"商业航天 / 卫星互联网" },
  { code:"000158", name:"常山北明", tags:["爆量","高开","高换手"], prev:"涨停3天2板", t915:"11316", t920:"16612", t925:"19924", d920:"+46.82%", d925:"+19.96%", auction:"+9.99%", open:"+9.98%", amount:"23621", ratio:"7.82", concept:"华为概念 / 算力" },
  { code:"301236", name:"软通动力", tags:["爆量","高开"], prev:"涨停3天4板", t915:"13642", t920:"17632", t925:"19876", d920:"+29.24%", d925:"+12.73%", auction:"+10.03%", open:"+10.10%", amount:"20156", ratio:"6.43", concept:"AI智能体 / 华为" },
  { code:"002651", name:"利君股份", tags:["高开"], prev:"首板", t915:"8862", t920:"12581", t925:"15781", d920:"+41.97%", d925:"+25.43%", auction:"+10.07%", open:"+9.97%", amount:"17321", ratio:"6.31", concept:"军工 / 航空装备" },
  { code:"000833", name:"粤桂股份", tags:["爆量","高开"], prev:"涨停2天2板", t915:"3863", t920:"4302", t925:"5622", d920:"+11.36%", d925:"+30.68%", auction:"+10.05%", open:"+10.00%", amount:"6121", ratio:"11.73", concept:"磷化工 / 有机硅" },
  { code:"002229", name:"鸿博股份", tags:["高开"], prev:"首板", t915:"6720", t920:"7076", t925:"9056", d920:"+5.30%", d925:"+27.97%", auction:"+10.04%", open:"+10.02%", amount:"8927", ratio:"13.74", concept:"AI应用 / 数据中心" },
  { code:"002640", name:"跨境通", tags:["高开","高换手"], prev:"3连板", t915:"11072", t920:"10261", t925:"10519", d920:"-7.34%", d925:"+2.51%", auction:"+9.97%", open:"+9.69%", amount:"11734", ratio:"16.98", concept:"跨境电商" },
  { code:"002131", name:"利欧股份", tags:["爆量","高开"], prev:"首板", t915:"7076", t920:"9109", t925:"13324", d920:"+28.73%", d925:"+46.24%", auction:"+10.00%", open:"+10.15%", amount:"14787", ratio:"12.17", concept:"AI营销 / AIGC" },
];

const boostRows = [
  ["002625","光启技术","爆量 高开 高换手","+10.03%","4天3板","商业航天","1.8","安全","+10.03%","0.69亿","0.94亿","0.48亿","14578","0.94","0.03%"],
  ["000158","常山北明","爆量 高开 高换手","+10.00%","3天2板","华为概念","1.8","安全","+9.99%","0.83亿","4.95亿","4.76亿","24150","0.83","0.20%"],
  ["301236","软通动力","爆量 高开","+9.75%","3天4板","AI智能体","1.8","安全","+6.09%","0.73亿","0.71亿","0.66亿","12500","0.73","0.08%"],
  ["002651","利君股份","高开","+9.14%","3天2板","军工","1.3","安全","+20.01%","0.55亿","0.11亿","0.10亿","6840","0.55","0.10%"],
  ["000833","粤桂股份","爆量 高开","+5.48%","3天2板","磷化工","1.5","安全","+8.79%","0.13亿","0.42亿","0.40亿","35180","0.13","0.01%"],
  ["002229","鸿博股份","高开","+8.25%","5天5板","AI应用","1.0","安全","+0.95%","0.17亿","0.74亿","0.66亿","86500","0.17","0.08%"],
];

const trendRows = [
  ["爆量 高开 高换手","50.52%","5转","商业航天","强开"],
  ["爆量 高开 高换手","545.81%","3转","华为概念","强开"],
  ["爆量 高开","83.61%","13转","AI智能体","强开"],
  ["高开","23.01%","1转","军工","强开"],
  ["爆量 高开","270.71%","0转","磷化工","观察"],
  ["高开","368.71%","0转","AI应用","观察"],
  ["高开","117.91%","0转","跨境电商","观察"],
];

const nav = ["首页","自选股","行情","板块","竞价","打板池","涨停复盘","市场情绪","数据中心","系统设置"];

function Tone({value}:{value:string}) {
  const cls = value.startsWith("-") ? "neg" : value === "安全" ? "safe" : value.includes("观察") ? "muted" : "pos";
  return <span className={cls}>{value}</span>;
}

export default function Home(){
  const [clock,setClock]=useState("");
  const [point,setPoint]=useState("09:25");
  useEffect(()=>{const tick=()=>setClock(new Date().toLocaleTimeString("zh-CN",{hour12:false}));tick();const t=setInterval(tick,1000);return()=>clearInterval(t)},[]);
  return <main className="terminal">
    <header className="navBar">
      <div className="brand"><span className="logo">A</span><b>A股看盘台 <em>V2.0</em></b></div>
      <nav>{nav.map(n=><button key={n} className={n==="竞价"?"activeNav":""}>{n}</button>)}</nav>
      <div className="clock"><strong>{clock}</strong><small>集合竞价中 · 自动刷新 5s</small></div>
    </header>

    <section className="indexStrip">
      {indexes.map(x=><div className="indexCard" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><em>{x[2]}</em></div>)}
      <div className="indexCard compact"><span>涨停</span><b>68</b><em>较昨日 +9</em></div>
      <div className="indexCard compact"><span>上涨家数</span><b>3287</b><em>较昨日 +514</em></div>
      <div className="indexCard compact"><span>市场温度</span><b>68°C</b><em>热度较高</em></div>
    </section>

    <section className="auctionPage">
      <div className="panel widePanel">
        <div className="sectionHead"><div><b>竞价封单（多日）</b><span>08-19（今日）</span></div><small>生成 18:00:50 · 刷新 20:21:51 · 间隔 5.0s</small></div>
        <div className="tableWrap"><table><thead><tr><th>#</th><th>代码</th><th>名称</th><th>标签</th><th>昨日状态</th><th>09:15</th><th>09:20</th><th>09:25</th><th>09:20变化</th><th>09:25变化</th><th>竞价涨幅</th><th>今开涨幅</th><th>竞价金额(万)</th><th>竞价量比</th><th>所属概念/行业</th></tr></thead><tbody>{auctionRows.map((r,i)=><tr key={r.code}><td>{i+1}</td><td>{r.code}</td><td className="nameCell">{r.name}</td><td>{r.tags.map(t=><span className="tag" key={t}>{t}</span>)}</td><td>{r.prev}</td><td>{r.t915}</td><td>{r.t920}</td><td>{r.t925}</td><td><Tone value={r.d920}/></td><td><Tone value={r.d925}/></td><td><Tone value={r.auction}/></td><td><Tone value={r.open}/></td><td className="money">{r.amount}</td><td className="ratio">{r.ratio}</td><td className="concept">{r.concept}</td></tr>)}</tbody></table></div>
      </div>

      <div className="panel widePanel">
        <div className="sectionHead"><div><b>竞价加强单</b><span>2026-08-19</span></div><div className="timeTabs">{["09:15","09:20","09:25"].map(t=><button onClick={()=>setPoint(t)} className={point===t?"on":""} key={t}>{t}</button>)}</div></div>
        <div className="tableWrap"><table><thead><tr><th>#</th><th>代码</th><th>名称</th><th>异动原因</th><th>竞价涨幅</th><th>昨日状态</th><th>概念分析</th><th>竞总分</th><th>安全</th><th>今开</th><th>封单</th><th>昨封</th><th>今封</th><th>竞价金额(万)</th><th>竞价量比</th><th>竞价额占比</th></tr></thead><tbody>{boostRows.map((r,i)=><tr key={r[0]}><td>{i+1}</td><td>{r[0]}</td><td className="nameCell">{r[1]}</td><td><span className="reason">{r[2]}</span></td><td><Tone value={r[3]}/></td><td>{r[4]}</td><td className="concept">{r[5]}</td><td className="score">{r[6]}</td><td><Tone value={r[7]}/></td><td><Tone value={r[8]}/></td><td>{r[9]}</td><td>{r[10]}</td><td>{r[11]}</td><td className="money">{r[12]}</td><td className="ratio">{r[13]}</td><td>{r[14]}</td></tr>)}</tbody></table></div>
      </div>

      <div className="lowerGrid">
        <div className="panel">
          <div className="sectionHead"><div><b>竞价额 & 竞价涨幅榜</b><span>今日涨停</span></div><small>按竞价金额排序</small></div>
          <div className="tableWrap"><table><thead><tr><th>#</th><th>代码</th><th>名称</th><th>竞价金额</th><th>量比</th><th>昨日成交</th><th>竞价占比</th><th>竞价涨幅</th><th>所属概念</th></tr></thead><tbody>{auctionRows.slice(0,6).map((r,i)=><tr key={r.code}><td>{i+1}</td><td>{r.code}</td><td className="nameCell">{r.name}</td><td className="money">{r.amount}</td><td className="ratio">{r.ratio}</td><td>{["12.5亿","11.8亿","8.7亿","6.4亿","9.1亿","7.5亿"][i]}</td><td>{["0.20%","0.15%","0.14%","0.10%","0.11%","0.09%"][i]}</td><td><Tone value={r.auction}/></td><td className="concept">{r.concept}</td></tr>)}</tbody></table></div>
        </div>

        <div className="panel trendPanel">
          <div className="sectionHead"><div><b>竞价趋势异动股 V2</b><span>默认按异动强度排序</span></div><small>点列名可切换</small></div>
          <div className="tableWrap"><table><thead><tr><th>#</th><th>异动原因</th><th>竞价涨幅</th><th>转强</th><th>昨日概念</th><th>信号</th></tr></thead><tbody>{trendRows.map((r,i)=><tr key={i}><td>{i+1}</td><td><span className="reason">{r[0]}</span></td><td><Tone value={r[1]}/></td><td>{r[2]}</td><td className="concept">{r[3]}</td><td><span className={r[4]==="强开"?"signal strong":"signal"}>{r[4]}</span></td></tr>)}</tbody></table></div>
        </div>

        <div className="panel timelinePanel">
          <div className="sectionHead"><div><b>竞价时间轴</b><span>关键节点</span></div></div>
          <div className="timeline">
            <div><time>09:15</time><b>初始封单</b><p>封单总额 <strong>98.27亿</strong></p><p>股票家数 3685</p></div>
            <i>↓</i>
            <div><time>09:20</time><b>封单变化</b><p>封单总额 <strong>125.64亿</strong></p><p className="pos">变化 +27.37亿</p></div>
            <i>↓</i>
            <div><time>09:25</time><b>终盘封单</b><p>封单总额 <strong>156.92亿</strong></p><p className="pos">变化 +31.28亿</p></div>
          </div>
        </div>
      </div>
    </section>
    <footer>V2 竞价工作台原型 · 当前数据均为演示数据，仅用于确认布局与字段，不作为交易依据</footer>
  </main>
}
