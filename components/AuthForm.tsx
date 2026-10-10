'use client';
import {useState} from 'react';
import {signIn,signUp,AuthError,AUTH_MOCK} from '@/lib/auth';
const MSG:Record<string,string>={invalid_credentials:'Email or password is incorrect.',email_taken:'An account with this email already exists. Sign in instead.'};
export default function AuthForm({mode}:{mode:'in'|'up'}){
  const up=mode==='up';
  const [f,setF]=useState({business:'',email:'',password:''});const [busy,setBusy]=useState(false);const [err,setErr]=useState('');const [done,setDone]=useState(false);
  const set=(k:keyof typeof f)=>(e:React.ChangeEvent<HTMLInputElement>)=>setF({...f,[k]:e.target.value});
  async function submit(e:React.FormEvent){e.preventDefault();setErr('');
    if(up&&f.business.trim().length<2)return setErr('Enter your business name.');
    if(!/^\S+@\S+\.\S+$/.test(f.email))return setErr('Enter a valid email address.');
    if(f.password.length<8)return setErr('Password must be at least 8 characters.');
    setBusy(true);
    try{up?await signUp({business:f.business.trim(),email:f.email.trim(),password:f.password}):await signIn({email:f.email.trim(),password:f.password});setDone(true)}
    catch(x){setErr(x instanceof AuthError&&MSG[x.code]||'Something went wrong. Please try again.')}finally{setBusy(false)}}
  const fields=[...(up?[['business','Business name','text','organization','Your business']]:[]),['email','Email','email','email','you@business.com'],['password','Password','password',up?'new-password':'current-password',up?'At least 8 characters':'Your password']];
  return(
  <main className="grid min-h-screen place-items-center bg-slate-50 px-5 py-10">
    <div className="w-full max-w-md">
      <a href="/" className="mb-6 flex items-center justify-center gap-2 font-semibold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-sm text-white">A</span>Appointment Engine</a>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_70px_-30px_rgba(15,18,24,.25)] sm:p-8" aria-live="polite">
        {done?<div className="py-4 text-center"><h1 className="text-2xl font-semibold tracking-tight">{up?'Account request received':'Signed in'}</h1>
          <p className="mt-2 text-sm text-slate-600">{AUTH_MOCK?'Demo mode: no account was created. The business dashboard is built next.':'Redirecting to your dashboard…'}</p>
          <a href="/" className="btn-p mt-6 w-full">Back to home</a></div>:
        <><h1 className="text-2xl font-semibold tracking-tight">{up?'Create your account':'Welcome back'}</h1>
          <p className="mt-1.5 text-sm text-slate-600">{up?'Set up your business and start taking bookings.':'Sign in to manage your appointments.'}</p>
          <form onSubmit={submit} noValidate className="mt-6 space-y-4">
            {fields.map(([k,l,t,ac,ph])=><label key={k} className="block text-sm font-medium">{l}
              <input type={t} name={k} value={f[k as keyof typeof f]} onChange={set(k as keyof typeof f)} autoComplete={ac} placeholder={ph}
                className="mt-1.5 h-12 w-full rounded-xl border border-slate-200 px-3.5 text-base font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"/></label>)}
            {err&&<p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</p>}
            <button type="submit" disabled={busy} className="btn-p w-full disabled:opacity-60">{busy?(up?'Creating account…':'Signing in…'):(up?'Create account':'Sign in')}</button></form></>}
      </div>
      {!done&&<p className="mt-6 text-center text-sm text-slate-600">{up?'Already have an account? ':'New to Appointment Engine? '}<a href={up?'/sign-in':'/sign-up'} className="font-medium text-accent hover:underline">{up?'Sign in':'Create an account'}</a></p>}
    </div></main>)}
