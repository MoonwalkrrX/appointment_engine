import {NextRequest,NextResponse} from 'next/server';
// Server-side proxy: the API key stays on the server and never reaches the browser.
const ALLOWED=['availability','booking','manage'];
export async function POST(req:NextRequest,{params}:{params:{path:string[]}}){
  const path=params.path.join('/');const base=process.env.BOOKING_API_URL;const key=process.env.BOOKING_API_KEY;
  if(!ALLOWED.includes(path))return NextResponse.json({error:'not_found'},{status:404});
  if(!base||!key)return NextResponse.json({error:'not_configured'},{status:503});
  const r=await fetch(`${base}/${path}`,{method:'POST',headers:{'Content-Type':'application/json','x-api-key':key},body:await req.text(),cache:'no-store'}); // adjust header name/paths to your backend
  return new NextResponse(await r.text(),{status:r.status,headers:{'Content-Type':'application/json'}});
}
