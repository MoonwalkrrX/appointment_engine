// UI-only for now: in mock mode no account is created and nothing is stored.
export const AUTH_MOCK=process.env.NEXT_PUBLIC_AUTH_MOCK!=='false';
export class AuthError extends Error{constructor(public code:string){super(code)}}
const wait=(ms=800)=>new Promise(r=>setTimeout(r,ms));
async function post(path:string,body:unknown){
  const r=await fetch(`/api/auth/${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new AuthError(j.error??'request_failed');return j}
export async function signUp(p:{business:string;email:string;password:string}){if(AUTH_MOCK){await wait();return{email:p.email}}return post('sign-up',p)}
export async function signIn(p:{email:string;password:string}){if(AUTH_MOCK){await wait();return{email:p.email}}return post('sign-in',p)}
