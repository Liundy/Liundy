"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LimitLadder from "./LimitLadder";

export default function LadderPortal(){
  const [active,setActive]=useState(false);
  const [host,setHost]=useState<HTMLElement|null>(null);
  useEffect(()=>{
    const nav=document.querySelector(".navBar nav");
    if(!nav)return;
    let btn=document.getElementById("limit-ladder-nav") as HTMLButtonElement|null;
    if(!btn){btn=document.createElement("button");btn.id="limit-ladder-nav";btn.textContent="涨停梯队";nav.appendChild(btn)}
    const root=document.querySelector("main.terminal") as HTMLElement|null;
    if(root){let h=document.getElementById("limit-ladder-host");if(!h){h=document.createElement("div");h.id="limit-ladder-host";root.appendChild(h)}setHost(h)}
    const click=()=>setActive(v=>!v);btn.addEventListener("click",click);
    const syncOthers=(e:Event)=>{const t=e.target as HTMLElement;if(t.tagName==="BUTTON"&&t!==btn&&t.parentElement===nav)setActive(false)};nav.addEventListener("click",syncOthers);
    return()=>{btn?.removeEventListener("click",click);nav.removeEventListener("click",syncOthers)};
  },[]);
  useEffect(()=>{
    const btn=document.getElementById("limit-ladder-nav");btn?.classList.toggle("activeNav",active);
    const mainPage=document.querySelector("main.terminal > .page") as HTMLElement|null;
    const strip=document.querySelector("main.terminal > .indexStrip") as HTMLElement|null;
    if(active){if(mainPage)mainPage.style.display="none";if(strip)strip.style.display="none"}
    else{if(mainPage)mainPage.style.display="";if(strip)strip.style.display=""}
  },[active]);
  if(!active||!host)return null;
  return createPortal(<LimitLadder/>,host);
}
