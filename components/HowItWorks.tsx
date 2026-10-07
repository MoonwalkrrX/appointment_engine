const S=[
 ['Customer chooses','Customers select a service, staff member, date, and available time.',['Service','Staff','Date','Time']],
 ['Appointment Engine checks','Availability, working hours, existing appointments, and booking rules are checked automatically.',['✓ Working hours','✓ Existing appointments','✓ Booking rules']],
 ['Appointment is confirmed','The customer receives confirmation and the business gets the appointment recorded in the system.',['Confirmed','Recorded']]] as const;
export default function HowItWorks(){return(
  <section id="how" className="scroll-mt-16 bg-slate-50 py-20 sm:py-28"><div className="wrap"><h2 className="h2">How it works</h2>
    <div className="mt-12 grid gap-4 md:grid-cols-3">{S.map(([t,d,chips],i)=><div key={t} className="card flex flex-col transition hover:-translate-y-0.5 hover:shadow-lg">
      <span className="text-sm font-medium text-accent">0{i+1}</span><h3 className="mt-3 text-xl font-semibold tracking-tight">{t}</h3><p className="mt-2 flex-1 text-slate-600">{d}</p>
      <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">{chips.map(c=><span key={c} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${i===2?'bg-emerald-50 text-emerald-700':'bg-slate-100'}`}>{c}</span>)}</div></div>)}</div></div></section>)}
