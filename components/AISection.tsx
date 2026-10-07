const S=[['Customer','“I need a consultation next Tuesday afternoon.”'],['AI','Understands the request.'],['Engine','Checks real availability.'],['AI','Presents available options.'],['Customer','Chooses a time.'],['Engine','Creates the appointment.']];
export default function AISection(){return(
  <section className="bg-slate-50 py-20 sm:py-28"><div className="wrap"><h2 className="h2 max-w-2xl">Add AI when your business is ready.</h2>
    <p className="lede">AI is never responsible for deciding whether a slot exists. It talks to the customer; the engine answers from real availability.</p>
    <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{S.map(([w,t],i)=><li key={i} className={`rounded-2xl border p-4 ${w==='Engine'?'border-accent bg-accent text-white':'border-slate-200 bg-white'}`}>
      <p className={`text-xs font-medium ${w==='Engine'?'text-white/80':'text-slate-500'}`}>{w==='Engine'?'Appointment Engine':w}</p><p className="mt-2 text-sm">{t}</p></li>)}</ol>
    <p className="mt-16 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-balance sm:text-5xl">AI handles the conversation. <span className="text-accent">Appointment Engine handles the truth.</span></p></div></section>)}
