import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, ArrowLeft } from 'lucide-react';
import { whatsapp } from '@/lib/site';
export function Quote({label='اطلب عرض سعر',message}:{label?:string;message?:string}) { return <a className="button" href={whatsapp(message)} target="_blank" rel="noopener noreferrer">{label}<ArrowUpLeft size={18}/><span className="sr-only"> (يفتح واتساب في نافذة جديدة)</span></a>; }
export function Eyebrow({children}:{children:React.ReactNode}) { return <p className="eyebrow"><span/>{children}</p>; }
export function CTA(){return <section className="cta wrap"><div><Eyebrow>تواصل مع فالينكس</Eyebrow><h2>عندك قائمة احتياجات؟<br/>أرسلها لنا.</h2><p>اكتب الأصناف والكميات والمحافظة. وإذا كان لديك موديل محدد، أضفه للطلب.</p></div><Link className="button" href="/contact">اطلب عرض سعر <ArrowLeft size={20}/></Link></section>;}
export function Art({compact=false}:{compact?:boolean}) {return <figure className={`lab-portrait ${compact?"compact":""}`}><Image src="/images/lab-people-real.webp" alt="أخصائي يستخدم ميكروسكوبًا في معمل؛ صورة فوتوغرافية مرجعية" fill sizes="(max-width: 760px) 100vw, 50vw" priority={!compact}/><figcaption><span>بيئة المعمل</span><strong>التفاصيل اليومية تهم.</strong><small>صورة فوتوغرافية مرجعية للنشاط</small></figcaption></figure>;}
