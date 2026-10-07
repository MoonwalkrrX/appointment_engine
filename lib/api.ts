import {mockSlots} from './mockData';
export type Booking={id:string;serviceId:string;date:string;time:string;name:string;phone:string};
export class ApiError extends Error{constructor(public code:string,public status=400){super(code)}}
const MOCK=process.env.NEXT_PUBLIC_USE_MOCK!=='false';
const wait=(ms=700)=>new Promise(r=>setTimeout(r,ms));
const store=new Map<string,Booking>();let raced=false;
async function post<T>(path:string,body:unknown):Promise<T>{
  const r=await fetch(`/api/engine/${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new ApiError(j.error??'request_failed',r.status);return j as T}
const taken=(date:string,time:string,except?:string)=>[...store.values()].some(b=>b.id!==except&&b.date===date&&b.time===time);
export async function getAvailableSlots(p:{date:string;serviceId:string;staffId?:string}):Promise<string[]>{
  if(MOCK){await wait();return mockSlots(p.date,p.serviceId).filter(t=>!taken(p.date,t))}
  const j=await post<{slots:(string|{local:string})[]}>('availability',{date:p.date,service_id:p.serviceId,staff_id:p.staffId});
  return j.slots.map(s=>typeof s==='string'?s:s.local)} // map to your backend's slot shape
export async function createBooking(b:Omit<Booking,'id'>):Promise<Booking>{
  if(MOCK){await wait(900);
    if(!raced&&b.time==='16:00'){raced=true;throw new ApiError('slot_unavailable',409)} // demo: first 16:00 attempt simulates a race
    if(taken(b.date,b.time))throw new ApiError('slot_unavailable',409);
    const r={...b,id:'AE-'+Math.floor(10000+Math.random()*89999)};store.set(r.id,r);return r}
  const j=await post<{booking_id:string}>('booking',{service_id:b.serviceId,date:b.date,time:b.time,customer_name:b.name,customer_phone:b.phone});
  return {...b,id:j.booking_id}}
export async function cancelBooking(id:string,phone:string):Promise<void>{
  if(MOCK){await wait(600);store.delete(id);return}
  await post('manage',{action:'cancel',booking_id:id,phone})}
export async function rescheduleBooking(id:string,phone:string,date:string,time:string):Promise<Booking>{
  if(MOCK){await wait(900);if(taken(date,time,id))throw new ApiError('slot_unavailable',409);
    const b=store.get(id);if(!b)throw new ApiError('not_found',404);const n={...b,date,time};store.set(id,n);return n}
  await post('manage',{action:'reschedule',booking_id:id,phone,date,time});
  return {id,phone,date,time,serviceId:'',name:''}}
