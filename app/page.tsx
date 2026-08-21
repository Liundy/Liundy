"use client";

import { useEffect, useMemo, useState } from "react";

type Quote = { code: string; name: string; price: number; change: number; amount: string; tag: string };

const indexes = [
  ["上证指数", "3,825.76", "+0.42%"],
  ["深证成指", "12,146.33", "+0.78%"],
  ["创业板指", "2,668.41", "+1.12%"],
  ["沪深300", "4,218.65", "+0.35%"],
  ["两市成交", "1.28万亿", "+8.6%"],
];

const initialQuotes: Quote[] = [
  { code: "600519", name: "贵州茅台", price: 1488.2, change: 1.26, amount: "42.8亿", tag: "核心" },
  { code: "300750", name: "宁德时代", price: 278.45, change: 3.62, amount: "68.1亿", tag: "强势" },
  { code: "002594", name: "比亚迪", price: 326.8, change: -0.74, amount: "51.4亿", tag: "观察" },
  { code: "688256", name: "寒武纪", price: 712.3, change: 6.85, amount: "76.2亿", tag: "突破" },
  { code: "601318", name: "中国平安", price: 58.16, change: -0.32, amount: "29.6亿", tag: "回踩" },
  { code: "000858", name: "五粮液", price: 138.52, change: 0.91, amount: "21.3亿", tag: "观察" },
];

const sectors = [
  ["AI算力", 5.82, "寒武纪 / 中科曙光"],
  ["机器人", 4.31, "绿的谐波 / 埃斯顿"],
  ["半导体", 3.76, "海光信息 / 北方华创"],
  ["创新药", 2.54, "恒瑞医药 / 百济神州"],
  ["银行", -0.68, "招商银行 / 工商银行"],
];

const candles = [46, 55, 50, 64, 59, 71, 66, 77, 73, 88, 80, 91, 86, 96, 89, 102, 95, 111, 105, 119, 110, 124, 116, 132, 126, 138, 129, 144, 136, 151];

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [selected, setSelected] = useState(3);
  const [clock, setClock] = useState("");
  const [period, setPeriod] = useState("日K");

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("zh-CN", { hour12: false }));
    tick();
    const clockTimer = setInterval(tick, 1000);
    const quoteTimer = setInterval(() => {
      setQuotes(qs => qs.map(q => ({ ...q, price: +(q.price * (1 + (Math.random() - .48) * .0007)).toFixed(2) })));
    }, 4000);
    return () => { clearInterval(clockTimer); clearInterval(quoteTimer); };
  }, []);

  const current = quotes[selected];
  const market = useMemo(() => ({ up: 3418, down: 1672, limitUp: 79, limitDown: 7, height: 6 }), []);

  return (
    <main>
      <header className="topbar">
        <div className="brand"><span className="logo">A</span><div><b>A股看盘台</b><small>TRADING DESK · V1</small></div></div>
        <div className="indices">{indexes.map((x, i) => <div className="index" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><em className={i === 4 ? "up" : "up"}>{x[2]}</em></div>)}</div>
        <div className="status"><i /> 行情模拟 · {clock}</div>
      </header>

      <section className="workspace">
        <aside className="panel watch">
          <div className="panelTitle"><b>自选股</b><span>6只</span></div>
          <div className="watchHead"><span>名称/代码</span><span>现价</span><span>涨跌</span></div>
          {quotes.map((q, i) => <button className={`quote ${selected === i ? "active" : ""}`} onClick={() => setSelected(i)} key={q.code}>
            <span className="qname"><b>{q.name}</b><small>{q.code} · {q.tag}</small></span>
            <span><b>{q.price.toFixed(2)}</b><small>{q.amount}</small></span>
            <strong className={q.change >= 0 ? "up" : "down"}>{q.change >= 0 ? "+" : ""}{q.change.toFixed(2)}%</strong>
          </button>)}
          <div className="miniTitle">盘中信号</div>
          <div className="signal"><i className="hot"/><span><b>寒武纪</b><small>放量突破 20日新高</small></span><time>10:26</time></div>
          <div className="signal"><i/><span><b>机器人板块</b><small>板块涨幅进入前三</small></span><time>10:18</time></div>
          <div className="signal"><i/><span><b>宁德时代</b><small>分时均线向上</small></span><time>10:07</time></div>
        </aside>

        <section className="center">
          <div className="panel chartPanel">
            <div className="stockHeader"><div><div className="stockName">{current.name} <small>{current.code}</small></div><div className={`bigPrice ${current.change >= 0 ? "up" : "down"}`}>{current.price.toFixed(2)} <small>{current.change >= 0 ? "+" : ""}{current.change.toFixed(2)}%</small></div></div><div className="ohlc"><span>今开 <b>682.10</b></span><span>最高 <b className="up">728.88</b></span><span>最低 <b className="down">676.32</b></span><span>成交额 <b>76.2亿</b></span></div></div>
            <div className="tabs">{["分时","日K","周K","月K"].map(p => <button key={p} onClick={() => setPeriod(p)} className={period === p ? "chosen" : ""}>{p}</button>)}<span>MA5　MA10　MA20</span></div>
            <div className="chart">
              <div className="gridLines" />
              <svg viewBox="0 0 900 330" preserveAspectRatio="none" aria-label="模拟K线">
                <polyline className="ma ma1" points={candles.map((v,i)=>`${i*31},${270-v*1.35}`).join(" ")} />
                <polyline className="ma ma2" points={candles.map((v,i)=>`${i*31},${286-v*1.22}`).join(" ")} />
                {candles.map((v,i)=>{const rising=i%4!==1; const x=i*30+8; const y=270-v*1.25; const h=20+(i%5)*5; return <g key={i} className={rising?"candle upStroke":"candle downStroke"}><line x1={x+6} y1={y-10} x2={x+6} y2={y+h+12}/><rect x={x} y={y} width="12" height={h}/></g>})}
              </svg>
              <div className="chartBadge">{period} · 演示数据</div>
            </div>
          </div>
          <div className="bottomGrid">
            <div className="panel"><div className="panelTitle"><b>市场情绪</b><span>偏强</span></div><div className="emotion"><div><strong>{market.up}</strong><small>上涨</small></div><div><strong className="downText">{market.down}</strong><small>下跌</small></div><div><strong>{market.limitUp}</strong><small>涨停</small></div><div><strong className="downText">{market.limitDown}</strong><small>跌停</small></div></div><div className="meter"><span style={{width:"67%"}}/></div><div className="emotionFoot"><span>赚钱效应 67%</span><span>最高连板 {market.height}板</span></div></div>
            <div className="panel"><div className="panelTitle"><b>交易观察</b><span>今日</span></div><div className="notes"><p><b>09:48</b> AI算力放量，观察核心是否回踩承接</p><p><b>10:12</b> 指数站稳早盘高点，仓位可保持积极</p><p><b>10:31</b> 高位股分歧，避免无计划追涨</p></div></div>
          </div>
        </section>

        <aside className="rightcol">
          <div className="panel sectors"><div className="panelTitle"><b>板块强弱</b><span>涨幅榜</span></div>{sectors.map((s,i)=><div className="sector" key={s[0]}><span className="rank">{i+1}</span><span><b>{s[0]}</b><small>{s[2]}</small></span><strong className={Number(s[1])>=0?"up":"down"}>{Number(s[1])>=0?"+":""}{s[1]}%</strong></div>)}</div>
          <div className="panel heat"><div className="panelTitle"><b>市场温度</b><span>10:35</span></div><div className="gauge"><div><strong>72</strong><small>偏热</small></div></div><div className="heatRows"><p><span>昨日涨停表现</span><b className="up">+3.86%</b></p><p><span>炸板率</span><b>21%</b></p><p><span>百股涨停</span><b>否</b></p><p><span>全A成交额</span><b>1.28万亿</b></p></div></div>
          <div className="panel"><div className="panelTitle"><b>涨停梯队</b><span>79家</span></div><div className="ladder"><p><b>6板</b><span>1</span></p><p><b>5板</b><span>2</span></p><p><b>4板</b><span>3</span></p><p><b>3板</b><span>7</span></p><p><b>2板</b><span>16</span></p><p><b>首板</b><span>50</span></p></div></div>
        </aside>
      </section>
      <footer>V1 原型 · 当前全部行情为演示数据，不能用于交易决策 · 下一阶段接入真实行情 API</footer>
    </main>
  );
}
