const OLD:[string,boolean][]=[['Customer sends message',0],['“Are you available tomorrow?”',0],['Staff checks calendar',1],['Staff replies',1],['Customer asks about another time',0],['Staff checks again',1],['Customer finally books',0]] as any;
const NEW=['Customer opens your booking page','Picks a service and a real, open time','Booked. Confirmation sent.'];
export default function ProblemSection(){return(
  <>
  <div className="border-y border-slate-200 bg-slate-50"><div className="wrap py-8"><p className="text-sm text-slate-600">Built for businesses that run on appointments.</p>
    <ul className="mt-3 flex flex-wrap gap-2">{['Clinics','Salons & Barbers','Consultants','Law Firms','Real Estate','Professional Services'].map(c=><li key={c} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm">{c}</li>)}</ul></div></div>
  <section className="wrap py-20 sm:py-28"><h2 className="h2 max-w-3xl">Your customers shouldn’t have to chase you for an appointment.</h2>
    <div className="mt-12 grid gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-8"><p className="mb-5 text-sm font-medium text-slate-500">Today: seven steps, two people</p>
        <ol className="space-y-2.5">{OLD.map(([t,staff],i)=><li key={i} className={`w-fit max-w-[88%] rounded-2xl px-4 py-2.5 text-sm ${staff?'ml-auto bg-slate-200':'border border-slate-200 bg-white'}`} style={{transform:`rotate(${(i%3-1)*0.8}deg)`}}>{t}</li>)}</ol></div>
      <div className="flex flex-col justify-center rounded-3xl bg-ink p-6 text-white sm:p-10"><p className="text-2xl font-semibold tracking-tight sm:text-3xl">Appointment Engine turns that conversation into a booking flow.</p>
        <ol className="mt-8 space-y-3">{NEW.map((t,i)=><li key={t} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm"><span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-xs">{i+1}</span>{t}</li>)}</ol></div>
    </div></section></>)}
