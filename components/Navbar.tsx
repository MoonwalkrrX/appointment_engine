'use client';
import {useState} from 'react';
const L=[['Product','#product'],['How it works','#how'],['For businesses','#business'],['Pricing','#pricing']];
export default function Navbar(){const [o,setO]=useState(false);return(
  <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
    <div className="wrap flex h-16 items-center justify-between">
      <a href="#" className="flex items-center gap-2 font-semibold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-sm text-white">A</span>Appointment Engine</a>
      <nav className="hidden gap-8 text-sm text-slate-600 md:flex">{L.map(([t,h])=><a key={h} href={h} className="hover:text-ink">{t}</a>)}</nav>
      <div className="hidden items-center gap-5 md:flex"><a href="/sign-in" className="text-sm text-slate-600 hover:text-ink">Sign in</a><a href="#booking-demo" className="btn-p h-10 px-4 text-sm">Get started</a></div>
      <button aria-label="Toggle menu" aria-expanded={o} onClick={()=>setO(!o)} className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 md:hidden">
        <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">{o?<path d="M3 3l12 12M15 3L3 15"/>:<path d="M2 5h14M2 9h14M2 13h14"/>}</svg></button>
    </div>
    {o&&<div className="wrap flex flex-col border-t border-slate-100 pb-4 md:hidden">{L.map(([t,h])=><a key={h} href={h} onClick={()=>setO(false)} className="py-3.5 text-base">{t}</a>)}
      <a href="/sign-in" className="py-3.5 text-base text-slate-600">Sign in</a><a href="#booking-demo" onClick={()=>setO(false)} className="btn-p mt-2">Get started</a></div>}
  </header>)}
