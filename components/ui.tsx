import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, ArrowLeft } from 'lucide-react';
import { whatsapp } from '@/lib/site';
export function Quote({label='اطلب عرض سعر',message}:{label?:string;message?:string}) { return <a className="button" href={whatsapp(message)} target="_blank" rel="noopener noreferrer">{label}<ArrowUpLeft size={18}/><span className="sr-only"> (يفتح واتساب في نافذة جديدة)</span></a>; }
export function Eyebrow({children}:{children:React.ReactNode}) { return <p className="eyebrow"><span/>{children}</p>; }
export function CTA(){return <section className="cta wrap"><div><Eyebrow>الخطوة التالية تبدأ بمحادثة</Eyebrow><h2>لديك احتياج.<br/>لنحوّله إلى خطة واضحة.</h2><p>شاركنا نوع المنشأة وقائمة احتياجاتك لنبدأ إعداد طلب عرض السعر.</p></div><Link className="button" href="/contact">تحدث عن مشروعك <ArrowLeft size={20}/></Link></section>;}
export function Art({compact=false}:{compact?:boolean}) {return <figure className={`lab-portrait ${compact?"compact":""}`}><Image src="/images/laboratory-team.webp" alt="مشهد توضيحي لأطباء وأخصائيي تحاليل يعملون في معمل حديث" fill sizes="(max-width: 760px) 100vw, 50vw" priority={!compact}/><figcaption><span>LABORATORY / PEOPLE / PRECISION</span><strong>العلم وراء كل تفصيلة.</strong><small>صورة توضيحية للنشاط</small></figcaption></figure>;}
