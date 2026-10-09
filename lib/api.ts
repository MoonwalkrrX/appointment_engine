import {SERVICES,STAFF,mockSlots} from './mockData';
export type Service={id:string;name:string;minutes:number};
export type Staff={id:string;name:string};
export type Booking={id:string;serviceId:string;staffId:string;date:string;time:string;name:string;phone:string};
export class ApiError extends Error{constructor(public code:string,public status=400){super(code)}}
const MOCK=process.env.NEXT_PUBLIC_USE_MOCK==='true';
export const TIMEZONE=process.env.NEXT_PUBLIC_TIMEZONE||'Africa/Lagos';
const wait=(ms=700)=>new Promise(r=>setTimeout(r,ms));
const store=new Map<string,Booking>();let raced=false;
async function post<T>(path:string,body:unknown):Promise<T>{
  const r=await fetch(`/api/engine/${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new ApiError(r.status===409?'slot_unavailable':(j.error??'request_failed'),r.status);return j as T}
const start=(d:string,t:string)=>`${d}T${t}:00`;
const taken=(date:string,time:string,except?:string)=>[...store.values()].some(b=>b.id!==except&&b.date===date&&b.time===time);
export async function getServices():Promise<Service[]>{
  if(MOCK){await wait(300);return SERVICES}
  const j=await post<{services:{id:string;name:string;duration_minutes:number}[]}>('services',{});
  return j.services.map(s=>({id:s.id,name:s.name,minutes:s.duration_minutes}))}
export async function getStaff():Promise<Staff[]>{
  if(MOCK){await wait(300);return STAFF}
  return (await post<{staff:Staff[]}>('staff',{})).staff}
export async function getAvailableSlots(p:{date:string;serviceId:string;staffId:string}):Promise<string[]>{
  if(MOCK){await wait();return mockSlots(p.date,p.serviceId).filter(t=>!taken(p.date,t))}
  const j=await post<{slots:{slot_start:string}[]}>('availability',{service_id:p.serviceId,staff_id:p.staffId,date:p.date,timezone:TIMEZONE});
  return (j.slots??[]).map(s=>s.slot_start.slice(11,16))}
export async function createBooking(b:Omit<Booking,'id'>):Promise<Booking>{
  if(MOCK){await wait(900);
    if(!raced&&b.time==='16:00'){raced=true;throw new ApiError('slot_unavailable',409)}
    if(taken(b.date,b.time))throw new ApiError('slot_unavailable',409);
    const r={...b,id:'AE-'+Math.floor(10000+Math.random()*89999)};store.set(r.id,r);return r}
  const j=await post<any>('booking',{service_id:b.serviceId,staff_id:b.staffId,customer_name:b.name,customer_phone:b.phone,start_time:start(b.date,b.time),timezone:TIMEZONE});
  return {...b,id:String(j.booking?.id??j.appointment_id??j.id??'confirmed')}}
export async function cancelBooking(id:string,phone:string):Promise<void>{
  if(MOCK){await wait(600);store.delete(id);return}
  await post('manage',{action:'cancel',appointment_id:id,customer_phone:phone})}
export async function rescheduleBooking(id:string,phone:string,date:string,time:string):Promise<void>{
  if(MOCK){await wait(900);if(taken(date,time,id))throw new ApiError('slot_unavailable',409);
    const b=store.get(id);if(b)store.set(id,{...b,date,time});return}
  await post('manage',{action:'reschedule',appointment_id:id,customer_phone:phone,new_start_time:start(date,time),timezone:TIMEZONE})}
