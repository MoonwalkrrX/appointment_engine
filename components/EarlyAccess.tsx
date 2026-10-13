'use client';
import {useState} from 'react';
import {joinEarlyAccess,ApiError} from '@/lib/api';
const TYPES=['Clinic or healthcare','Salon or barber','Legal','Real estate','Consulting','Other'];
const inp="mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-base font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
export default function EarlyAccess(){
  const [f,setF]=useState({name:'',type:TYPES[0],contact:'',website:''});
  const [busy,setBusy]=useState(false);const [err,setErr]=useState('');const [done,setDone]=useState(false);
  const set=(k:keyof typeof f)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>setF({...f,[k]:e.target.value});
  async function submit(e:React.FormEvent){e.preventDefault();setErr('');
    const c=f.contact.trim();
    if(f.name.trim().length<2)return setErr('Enter your business name.');
    if(!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(c))return setErr('Enter a valid email address.');
    setBusy(true);
    try{await joinEarlyAccess({businessName:f.name.trim(),businessType:f.type,contact:c,website:f.website});setDone(true)}
    catch(x){setErr(x instanceof ApiError&&x.status===422?'Please check your details and try again.':'Something went wrong. Please try again.')}finally{setBusy(false)}}
  return(
  <section id="early-access" className="wrap scroll-mt-16 pb-20 sm:pb-28">
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div><h2 className="h2">Join the first businesses on BookPilot.</h2>
        <p className="lede">We’re opening BookPilot to a small group of businesses first. Tell us about yours and we’ll be in touch.</p>
        <p className="mt-4 text-sm text-slate-500">No payment details needed.</p></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_70px_-30px_rgba(15,18,24,.25)] sm:p-8" aria-live="polite">
        {done?<div className="py-6 text-center"><h3 className="text-2xl font-semibold tracking-tight">You’re on the list.</h3><p className="mt-2 text-sm text-slate-600">Thanks for your interest. We’ll be in touch.</p></div>:
        <form onSubmit={submit} noValidate className="relative space-y-4">
          <label className="block text-sm font-medium">Business name<input value={f.name} onChange={set('name')} autoComplete="organization" placeholder="Your business" className={inp}/></label>
          <label className="block text-sm font-medium">Business type<select value={f.type} onChange={set('type')} className={inp}>{TYPES.map(t=><option key={t}>{t}</option>)}</select></label>
          <label className="block text-sm font-medium">Email<input type="email" value={f.contact} onChange={set('contact')} autoComplete="email" placeholder="you@business.com" className={inp}/></label>
          <input type="text" name="website" value={f.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0"/>
          {err&&<p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</p>}
          <button type="submit" disabled={busy} className="btn-p w-full disabled:opacity-60">{busy?'Sending…':'Join early access'}</button>
          <p className="text-xs text-slate-500">We’ll only use your details to contact you about BookPilot.</p>
        </form>}
      </div>
    </div>
  </section>)}
