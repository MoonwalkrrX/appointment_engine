const F=[['Smart availability','Show only genuinely available appointment times.'],['Staff scheduling','Manage different staff members, services, and working hours.'],
['Double-booking protection','Prevent conflicting appointments automatically.'],['Cancellation & rescheduling','Customers manage their appointments without staff changing records.'],
['Multiple booking channels','Website, direct booking link, future messaging integrations, or other channels.'],['Automation-ready','Connect appointments to notifications, CRM systems, payments, and workflows.'],
['AI-ready','Customers can eventually book in natural language while the engine owns the booking logic.'],['Business control','You control services, staff, availability, and booking rules.']];
export default function FeatureGrid(){return(
  <section id="product" className="wrap scroll-mt-16 py-20 sm:py-28"><h2 className="h2 max-w-2xl">Everything an appointment needs, in one system.</h2>
    <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">{F.map(([t,d])=>
      <div key={t} className="bg-white p-6 transition hover:bg-slate-50"><span className="mb-4 block h-2 w-2 rounded-full bg-accent"/><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></div>)}</div></section>)}
