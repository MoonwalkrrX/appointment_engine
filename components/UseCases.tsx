const U=[['Healthcare','Consultations, follow-ups, doctors, staff availability.'],['Legal','Consultations, lawyer availability, client intake.'],['Beauty & Personal Care','Services, staff, durations, recurring customers.'],
['Real Estate','Property viewings, agents, schedules.'],['Consulting','Strategy calls, discovery sessions, client meetings.'],['Professional Services','Any business where customers need to book time with someone.']];
export default function UseCases(){return(
  <section id="business" className="wrap scroll-mt-16 py-20 sm:py-28"><h2 className="h2 max-w-2xl">Built around how businesses actually work.</h2>
    <p className="lede">Configurable, not locked to one industry. Services, staff, hours, and booking rules are set per business.</p>
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{U.map(([t,d])=><div key={t} className="card"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></div>)}</div></section>)}
