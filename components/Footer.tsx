const G:[string,string[]][]=[['Product',['Booking','Availability','Staff','Automation','AI']],['Company',['About','Contact','Documentation']],['Social',['GitHub','X','LinkedIn']],['Legal',['Privacy','Terms']]];
export default function Footer(){return(
  <footer className="border-t border-slate-200"><div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
    <div><p className="font-semibold">Appointment Engine</p><p className="mt-2 max-w-xs text-sm text-slate-600">Appointment infrastructure for modern businesses.</p></div>
    {G.map(([h,l])=><div key={h}><p className="text-sm font-semibold">{h}</p><ul className="mt-3 space-y-2">{l.map(x=><li key={x}><a href={`/${x.toLowerCase()}`} className="text-sm text-slate-600 hover:text-ink">{x}</a></li>)}</ul></div>)}</div></footer>)}
