export const SERVICES=[{id:'haircut',name:'Haircut',minutes:60},{id:'consult',name:'Consultation',minutes:30},{id:'colour',name:'Colour & style',minutes:90}];
export type Day={iso:string;dow:string;n:number};
export function nextDays(count=7):Day[]{const out:Day[]=[];const d=new Date();
  while(out.length<count){d.setDate(d.getDate()+1);if(d.getDay()===0)continue;
    out.push({iso:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,dow:d.toLocaleDateString('en-US',{weekday:'short'}),n:d.getDate()})}
  return out}
const ALL=['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00'];
export function mockSlots(date:string,serviceId:string){const seed=[...date+serviceId].reduce((a,c)=>a+c.charCodeAt(0),0);
  return ALL.filter((_,i)=>i===6||(seed+i*3)%5!==0)}
