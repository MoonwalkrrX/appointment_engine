'use client';
import {useEffect,useState} from 'react';
import {nextDays,Day} from '@/lib/mockData';
import {getServices,getStaff,getAvailableSlots,createBooking,cancelBooking,rescheduleBooking,ApiError,Booking,Service,Staff} from '@/lib/api';
const fmt=(iso:string)=>new Date(iso+'T12:00').toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'});
const sel=(on:boolean)=>`transition ${on?'border-accent bg-accent/5 text-accent ring-1 ring-accent':'border-slate-200 hover:border-slate-400'}`;
const Skel=({c}:{c:string})=><div className={`animate-pulse rounded-xl bg-slate-100 ${c}`}/>;
export default function BookingWidget(){
  const [days,setDays]=useState<Day[]>([]);const [services,setServices]=useState<Service[]>([]);const [staff,setStaff]=useState<Staff[]>([]);
  const [booting,setBooting]=useState(true);const [bootErr,setBootErr]=useState('');
  const [svc,setSvc]=useState('');const [stf,setStf]=useState('');const [date,setDate]=useState('');
  const [time,setTime]=useState<string|null>(null);const [slots,setSlots]=useState<string[]>([]);const [loading,setLoading]=useState(true);
  const [name,setName]=useState('');const [phone,setPhone]=useState('');const [busy,setBusy]=useState(false);const [err,setErr]=useState('');
  const [view,setView]=useState<'pick'|'done'|'cancelled'>('pick');const [booking,setBooking]=useState<Booking|null>(null);
  const [moving,setMoving]=useState(false);const [tick,setTick]=useState(0);
  useEffect(()=>{const d=nextDays();setDays(d);setDate(d[0].iso);
    Promise.all([getServices(),getStaff()]).then(([s,t])=>{setServices(s);setStaff(t);setSvc(s[0]?.id??'');setStf(t[0]?.id??'')})
      .catch(()=>setBootErr('Could not load booking options. Please refresh.')).finally(()=>setBooting(false))},[]);
  useEffect(()=>{if(!date||!svc||!stf)return;let live=true;setLoading(true);setTime(null);
    getAvailableSlots({date,serviceId:svc,staffId:stf}).then(s=>{if(live){setSlots(s);setLoading(false)}})
      .catch(()=>{if(live){setSlots([]);setErr('Could not check availability. Please try again.');setLoading(false)}});
    return()=>{live=false}},[date,svc,stf,tick]);
  const clean=phone.replace(/[^\d+]/g,'');
  async function submit(){
    if(!time){setErr('Choose a time first.');return}
    if(!moving&&(name.trim().length<2||!/^\+?\d{7,15}$/.test(clean))){setErr('Enter your name and a valid phone number (7–15 digits).');return}
    setBusy(true);setErr('');
    try{
      if(moving&&booking){await rescheduleBooking(booking.id,booking.phone,date,time);setBooking({...booking,date,time})}
      else setBooking(await createBooking({serviceId:svc,staffId:stf,date,time,name:name.trim(),phone:clean}));
      setView('done');setMoving(false);
    }catch(e){
      if(e instanceof ApiError&&e.code==='slot_unavailable'){setErr(`${time} was just taken by someone else. Availability is refreshed — pick another time.`);setTick(t=>t+1)}
      else setErr('Something went wrong. Please try again.');
    }finally{setBusy(false)}}
  async function cancel(){if(!booking)return;setBusy(true);setErr('');
    try{await cancelBooking(booking.id,booking.phone);setView('cancelled')}catch{setErr('Could not cancel. Please try again.')}finally{setBusy(false)}}
  const mins=services.find(x=>x.id===svc)?.minutes;
  return(
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_30px_70px_-30px_rgba(15,18,24,.3)] sm:p-7" aria-live="polite">
    <div className="mb-5"><p className="text-xs text-slate-500">Appointment Engine</p>
      <h3 className="text-xl font-semibold tracking-tight">{moving?'Choose a new time':'Book an appointment'}</h3></div>
    {bootErr&&<p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{bootErr}</p>}
    {view==='pick'&&!bootErr&&<div className="space-y-5">
      {!moving&&<div><p className="mb-2 text-sm font-medium">Service</p>
        <div className="grid gap-2">{booting?[0,1,2].map(i=><Skel key={i} c="h-14"/>):services.map(x=><button key={x.id} onClick={()=>{setSvc(x.id);setErr('')}} aria-pressed={svc===x.id}
          className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 text-left ${sel(svc===x.id)}`}><span className="text-sm font-medium leading-tight">{x.name}</span><span className="shrink-0 text-xs opacity-70">{x.minutes} min</span></button>)}</div></div>}
      {!moving&&<div><p className="mb-2 text-sm font-medium">With</p>
        <div className="flex flex-wrap gap-2">{booting?<Skel c="h-11 w-40"/>:staff.map(x=><button key={x.id} onClick={()=>{setStf(x.id);setErr('')}} aria-pressed={stf===x.id}
          className={`h-11 rounded-xl border px-4 text-sm font-medium ${sel(stf===x.id)}`}>{x.name}</button>)}</div></div>}
      <div><p className="mb-2 text-sm font-medium">Choose a date</p>
        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">{days.length===0?[0,1,2,3].map(i=><Skel key={i} c="h-16 w-16 shrink-0"/>):
          days.map(d=><button key={d.iso} onClick={()=>{setDate(d.iso);setErr('')}} aria-pressed={date===d.iso} className={`min-w-[64px] shrink-0 snap-start rounded-xl border py-2.5 ${sel(date===d.iso)}`}>
            <span className="block text-xs opacity-70">{d.dow}</span><span className="text-lg font-semibold">{d.n}</span></button>)}</div></div>
      <div><p className="mb-2 text-sm font-medium">Available times{mins?<span className="font-normal text-slate-500"> · {mins} min</span>:null}</p>
        {booting||loading?<div className="grid grid-cols-3 gap-2">{[0,1,2,3,4,5].map(i=><Skel key={i} c="h-11"/>)}</div>:
        slots.length===0?<p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">No times available on this day. Try another date.</p>:
        <div className="grid grid-cols-3 gap-2">{slots.map(t=><button key={t} onClick={()=>{setTime(t);setErr('')}} aria-pressed={time===t} className={`h-11 rounded-xl border text-sm font-medium ${sel(time===t)}`}>{t}</button>)}</div>}</div>
      {!moving&&<div className="grid gap-3 sm:grid-cols-2">{([['Name','text',name,setName,'Your full name','name'],['Phone','tel',phone,setPhone,'+234 …','tel']] as const).map(([l,ty,v,set,ph,ac])=>
        <label key={l} className="text-sm font-medium">{l}<input type={ty} value={v} onChange={e=>set(e.target.value)} placeholder={ph} autoComplete={ac}
          className="mt-1.5 h-12 w-full rounded-xl border border-slate-200 px-3.5 text-base font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"/></label>)}</div>}
      {err&&<p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</p>}
      <button onClick={submit} disabled={busy||loading||booting} className="btn-p w-full disabled:opacity-60">{busy?'Confirming…':moving?'Confirm new time':'Confirm appointment'}</button>
    </div>}
    {view==='done'&&booking&&<div className="py-2 text-center">
      <svg viewBox="0 0 52 52" className="mx-auto h-14 w-14" style={{animation:'pop .4s ease both'}}><circle cx="26" cy="26" r="25" fill="#2B4BF2"/>
        <path d="M15 27l8 8 14-16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="40" style={{animation:'draw .5s .25s ease forwards'}}/></svg>
      <h4 className="mt-4 text-xl font-semibold">You’re booked, {booking.name.split(' ')[0]}.</h4>
      <dl className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200 text-left text-sm">{[['Service',services.find(x=>x.id===booking.serviceId)?.name],['With',staff.find(x=>x.id===booking.staffId)?.name],['When',`${fmt(booking.date)} · ${booking.time}`],['Reference',booking.id.slice(0,8)]].map(([k,v])=>
        <div key={k} className="flex justify-between gap-4 px-4 py-3"><dt className="text-slate-500">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl>
      {err&&<p role="alert" className="mt-3 text-sm text-red-700">{err}</p>}
      <div className="mt-5 grid grid-cols-2 gap-2"><button className="btn-s" onClick={()=>{setMoving(true);setView('pick');setErr('')}}>Reschedule</button>
        <button className="btn-s text-red-600" disabled={busy} onClick={cancel}>{busy?'Cancelling…':'Cancel booking'}</button></div></div>}
    {view==='cancelled'&&<div className="py-6 text-center"><h4 className="text-xl font-semibold">Booking cancelled</h4>
      <p className="mt-2 text-sm text-slate-600">The time is open again for other customers.</p>
      <button className="btn-p mt-6" onClick={()=>{setView('pick');setBooking(null);setTick(t=>t+1)}}>Book again</button></div>}
  </div>)}
