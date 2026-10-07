import BookingWidget from './BookingWidget';
export default function Hero(){return(
  <section className="wrap grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
    <div className="rise"><h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl">Turn your availability into booked appointments.</h1>
      <p className="lede">Give customers a simple way to book, cancel, and reschedule appointments while your business handles the rest automatically.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#booking-demo" className="btn-p">Start booking</a><a href="#how" className="btn-s">See how it works</a></div>
      <p className="mt-6 text-sm text-slate-500">Website booking · Booking links · Automation · AI-ready</p></div>
    <div id="booking-demo" className="rise scroll-mt-24 [animation-delay:.15s]"><BookingWidget/></div>
  </section>)}
