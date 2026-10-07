import './globals.css';
import type {Metadata} from 'next';
import {Instrument_Sans} from 'next/font/google';
const f=Instrument_Sans({subsets:['latin'],variable:'--font-sans'});
export const metadata:Metadata={title:'Appointment Engine — Turn your availability into booked appointments',description:'Appointment infrastructure for modern businesses.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={f.variable}><body className="font-sans">{children}</body></html>}
