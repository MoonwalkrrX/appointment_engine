const Arrow=()=><div className="mx-auto flex flex-col items-center py-1 text-white/40"><div className="h-5 w-px bg-white/30"/><svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0h10L5 6z"/></svg></div>;
const Chips=({c}:{c:string[]})=><div className="flex flex-wrap justify-center gap-2">{c.map(x=><span key={x} className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm">{x}</span>)}</div>;
export default function ArchitectureSection(){return(
  <section className="bg-ink py-20 text-white sm:py-28"><div className="wrap grid items-center gap-12 lg:grid-cols-2">
    <div><h2 className="h2">More than a booking page.</h2>
      <p className="mt-5 max-w-lg text-lg text-white/70">Calendly and traditional scheduling tools focus primarily on letting someone choose a time.</p>
      <p className="mt-4 max-w-lg text-lg text-white">Appointment Engine is designed as the appointment infrastructure underneath a business’s workflow.</p></div>
    <div className="rounded-3xl border border-white/10 bg-white/[.03] p-5 text-center sm:p-8">
      <div className="mx-auto w-fit rounded-xl border border-white/15 px-5 py-2 text-sm font-medium">Customer</div><Arrow/>
      <Chips c={['Website','Booking link','AI','WhatsApp','Other channels']}/><Arrow/>
      <div className="rounded-2xl bg-accent p-5"><p className="text-lg font-semibold">Appointment Engine</p><div className="mt-3"><Chips c={['Availability','Booking','Cancellation','Rescheduling']}/></div></div><Arrow/>
      <div className="mx-auto w-fit rounded-xl border border-white/15 px-5 py-2 text-sm font-medium">Business database</div><Arrow/>
      <Chips c={['Automations','Notifications','Staff']}/></div>
  </div></section>)}
