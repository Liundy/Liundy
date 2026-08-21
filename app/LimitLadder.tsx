"use client";

const sectors = [
  {name:"地产链", burst:"5.2亿", seal:"1.49亿", limit:5, rows:{"4进5":["深物业A +10.02%"],"2进3":["金地集团 +10.01%","特发服务 +19.98%"],"1进2":["我爱我家 +10.19%","中交地产 +9.98%","南都物业 +10.00%"],"首板":["深振业A +10.05%","沙河股份 +9.96%","京能置业 +10.02%"]}},
  {name:"农业", burst:"146.9亿", seal:"6.24亿", limit:4, rows:{"2进3":["金健米业 +9.99%","农发种业 +6.16%"],"1进2":["黑芝麻 +9.98%","万向德农 +7.97%","北大荒 +2.97%"],"首板":["中农联合 +9.95%","丰乐种业 +9.88%"]}},
  {name:"医药", burst:"37.9亿", seal:"2.66亿", limit:4, rows:{"3进4":["神奇制药 +10.26%"],"1进2":["开开实业 +9.96%","众生药业 +8.68%"],"首板":["哈三联 +9.99%","双鹭药业 +10.07%","河化股份 +19.99%"]}},
  {name:"化工", burst:"27.1亿", seal:"1.74亿", limit:4, rows:{"1进2":["赤天化 +8.80%","金牛化工 +1.18%"],"首板":["中锐股份 +10.01%","华锦股份 +9.98%","惠云钛业 +10.09%"]}},
  {name:"商业航天", burst:"37.3亿", seal:"1.47亿", limit:2, rows:{"1进2":["光启技术 +10.00%","中国卫星 +8.65%"],"首板":["金利华电 +20.01%","鲁信创投 +10.03%","金风科技 +9.69%"]}},
  {name:"煤炭", burst:"9.8亿", seal:"3.34亿", limit:2, rows:{"1进2":["大有能源 +10.00%","宝泰隆 +10.14%"],"首板":["恒源煤电 +9.92%","陕西黑猫 +10.01%"]}},
  {name:"算力", burst:"1.5亿", seal:"9309万", limit:2, rows:{"1进2":["中际旭创 +10.01%","工业富联 +10.03%"],"首板":["寒武纪 +19.99%","浪潮信息 +9.97%","中科曙光 +9.85%"]}},
  {name:"芯片", burst:"120.7亿", seal:"8539万", limit:1, rows:{"2进3":["百合花 +10.00%"],"1进2":["华正新材 +9.99%","盈方微 +10.00%"],"首板":["斯达半导 +10.00%","江波龙 +20.00%","兆易创新 +10.03%"]}},
  {name:"机器人概念", burst:"63.1亿", seal:"2302万", limit:1, rows:{"3进4":["正裕工业 +10.00%"],"1进2":["绿的谐波 +20.00%","埃斯顿 +9.98%"],"首板":["拓斯达 +19.98%","鸣志电器 +10.00%","柯力传感 +9.97%"]}},
  {name:"其他", burst:"251.4亿", seal:"8.14亿", limit:12, rows:{"3进4":["桂发祥 +10.02%","日播时尚 +9.99%"],"2进3":["中百集团 +10.73%","哈尔斯 +10.06%"],"1进2":["华大智造 +9.99%","西部材料 +10.02%","中国软件 +9.97%"],"首板":["N宇树 +36.34%","亿田智能 +19.98%","爱朋医疗 +20.02%","光智科技 +10.07%"]}}
];

const levels=["4进5","3进4","2进3","1进2","首板"];

export default function LimitLadder(){return <section className="ladderPage">
  <div className="ladderToolbar"><div><button className="on">日期选择</button><button>实时</button><button>前一天</button><button>后一天</button><strong>2026-08-19</strong></div><div><span className="liveDot"/> 竞价快照回溯</div></div>
  <div className="ladderTabs"><button className="on">今日梯队</button><button>昨日涨停梯队</button></div>
  <div className="ladderMatrix">
    <div className="ladderCorner">题材名</div>{sectors.map(s=><div className="sectorHead" key={s.name}><b>{s.name}</b><span>炸板额 <em>{s.burst}</em></span><span>涨停封单 <em>{s.seal}</em></span><span>涨停 <strong>{s.limit}</strong></span></div>)}
    {levels.map(level=><div className="ladderRow" key={level}><div className="levelLabel"><b>{level}</b></div>{sectors.map(s=><div className="ladderCell" key={s.name+level}>{(s.rows as Record<string,string[]>)[level]?.map((x,i)=><div className="stockChip" key={x}><span>{x.split(" ")[0]}</span><em className={x.includes("-")?"neg":"pos"}>{x.split(" ")[1]}</em><i>{i%2?"0.4亿":"1.2亿"}</i></div>)}</div>)}</div>)}
  </div>
</section>}
