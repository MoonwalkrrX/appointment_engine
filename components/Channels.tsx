const C=[['Website','A branded booking experience embedded directly into a business website.'],['Booking link','A simple link that can be shared anywhere.'],
['AI','Customers can eventually describe what they need naturally and the AI can use the booking engine to find and create appointments.'],['WhatsApp','Customers can interact through WhatsApp when messaging is more convenient.']];
export default function Channels(){return(
  <section className="wrap py-20 sm:py-28"><h2 className="h2 max-w-2xl">One booking engine. Multiple customer experiences.</h2>
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{C.map(([t,d])=><div key={t} className="card"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></div>)}</div></section>)}
