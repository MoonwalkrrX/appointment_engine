const NAV=['Dashboard','Calendar','Appointments','Customers','Services','Staff','Availability','Settings'];
const ROWS=[['09:00','John Doe','Haircut'],['10:00','Sarah Smith','Consultation'],['11:00'],['13:00','Michael Brown','Haircut']];
export default function DashboardPreview(){return(
  <section className="bg-slate-50 py-20 sm:py-28"><div className="wrap"><h2 className="h2 max-w-2xl">Your whole day, one clear view.</h2>
    <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_80px_-40px_rgba(15,18,24,.35)]">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-3">{[0,1,2].map(i=><span key={i} className="h-2.5 w-2.5 rounded-full bg-slate-300"/>)}</div>
      <div className="flex min-h-[380px]"><aside className="hidden w-52 shrink-0 border-r border-slate-200 p-4 md:block"><p className="mb-4 px-3 text-sm font-semibold">Appointment Engine</p>
        {NAV.map((n,i)=><div key={n} className={`rounded-lg px-3 py-2 text-sm ${i===0?'bg-accent/10 font-medium text-accent':'text-slate-600'}`}>{n}</div>)}</aside>
        <div className="min-w-0 flex-1 p-4 sm:p-8"><div className="-mx-1 mb-5 flex gap-1 overflow-x-auto px-1 md:hidden">{NAV.map((n,i)=><span key={n} className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${i===0?'bg-accent text-white':'bg-slate-100'}`}>{n}</span>)}</div>
          <h3 className="text-xl font-semibold tracking-tight">Today’s appointments</h3>
          <ul className="mt-5 space-y-2.5">{ROWS.map(([t,n,s])=><li key={t} className={`flex items-center gap-3 rounded-xl border p-3.5 sm:gap-5 ${n?'border-slate-200':'border-dashed border-slate-300 bg-slate-50'}`}>
            <span className="w-12 shrink-0 text-sm font-medium tabular-nums">{t}</span>
            {n?<><div className="min-w-0 flex-1"><p className="truncate font-medium">{n}</p><p className="text-sm text-slate-500">{s}</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Confirmed</span></>
              :<span className="flex-1 text-sm text-slate-500">Available</span>}</li>)}</ul></div></div></div></div></section>)}
