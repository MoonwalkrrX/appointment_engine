import {NextRequest,NextResponse} from 'next/server';
const ROUTES:Record<string,string|undefined>={
  services:process.env.URL_SERVICES,staff:process.env.URL_STAFF,availability:process.env.URL_AVAILABILITY,
  booking:process.env.URL_BOOKING,manage:process.env.URL_MANAGE};
export async function POST(req:NextRequest,{params}:{params:{path:string[]}}){
  const path=params.path.join('/');
  if(!(path in ROUTES))return NextResponse.json({error:'not_found'},{status:404});
  const url=ROUTES[path];const key=process.env.BOOKING_API_KEY;
  if(!url||!key)return NextResponse.json({error:'not_configured'},{status:503});
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-api-key':key},body:await req.text(),cache:'no-store'});
  const text=await r.text();
  if(!text)return NextResponse.json({error:'no_response'},{status:502});
  return new NextResponse(text,{status:r.status,headers:{'Content-Type':'application/json'}});
}
