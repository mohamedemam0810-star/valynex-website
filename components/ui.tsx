import Link from 'next/link';
import { ArrowUpLeft, ArrowLeft } from 'lucide-react';
import { whatsapp } from '@/lib/site';
export function Quote({label='اطلب عرض سعر',message}:{label?:string;message?:string}) { return <a className="button" href={whatsapp(message)} target="_blank" rel="noopener noreferrer">{label}<ArrowUpLeft size={18}/><span className="sr-only"> (يفتح واتساب في نافذة جديدة)</span></a>; }
export function Eyebrow({children}:{children:React.ReactNode}) { return <p className="eyebrow"><span/>{children}</p>; }
export function CTA(){return <section className="cta wrap"><div><Eyebrow>الخطوة التالية تبدأ بمحادثة</Eyebrow><h2>لديك احتياج.<br/>لنحوّله إلى خطة واضحة.</h2><p>شاركنا نوع المنشأة وقائمة احتياجاتك لنبدأ إعداد طلب عرض السعر.</p></div><Link className="button" href="/contact">تحدث عن مشروعك <ArrowLeft size={20}/></Link></section>;}
export function Art({compact=false}:{compact?:boolean}) {return <div className={`art ${compact?'compact':''}`} aria-hidden="true"><div className="art-grid"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="core"><span/><span/><span/></div><div className="art-label label-top">PRECISION / CONNECTED</div><div className="art-label label-bottom">V / NEXT GENERATION</div><i className="node node-a"/><i className="node node-b"/><i className="node node-c"/></div>;}
