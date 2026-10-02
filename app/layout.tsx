import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import Header from '@/components/header';
import Brand from '@/components/brand';
import {siteUrl,whatsapp} from '@/lib/site';
import './globals.css';
const arabicFont = localFont({
  src: [
    {path:'../public/fonts/ibm-plex-sans-arabic-400.ttf',weight:'400',style:'normal'},
    {path:'../public/fonts/ibm-plex-sans-arabic-500.ttf',weight:'500',style:'normal'},
    {path:'../public/fonts/ibm-plex-sans-arabic-600.ttf',weight:'600',style:'normal'},
    {path:'../public/fonts/ibm-plex-sans-arabic-700.ttf',weight:'700',style:'normal'}
  ],
  variable:'--font-arabic',
  display:'swap',
  fallback:['Tahoma','Arial'],
  preload:true
});
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'VALYNEX | حلول المعامل والتجهيزات الطبية في مصر',template:'%s | VALYNEX'},description:'فالينكس: حلول تجهيز وتوريد للمعامل والمنشآت الطبية في مصر. اكتشف فئات المنتجات واطلب عرض سعر يناسب احتياجات منشأتك.',openGraph:{locale:'ar_EG',type:'website',siteName:'VALYNEX',title:'VALYNEX | أجهزة ومستلزمات المعامل في مصر',description:'حلول المعامل والتجهيزات الطبية للسوق المصري.'},twitter:{card:'summary'},robots:{index:true,follow:true},icons:{icon:'/icon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){const schema={'@context':'https://schema.org','@type':'Organization',name:'VALYNEX',alternateName:'فالينكس',url:siteUrl,telephone:'+201037779413',areaServed:{'@type':'Country',name:'Egypt'},contactPoint:{'@type':'ContactPoint',telephone:'+201037779413',contactType:'sales',availableLanguage:['Arabic']}};return <html lang="ar" dir="rtl" className={arabicFont.variable}><body><a className="skip" href="#main">انتقل إلى المحتوى</a><Header/><main id="main">{children}</main><footer className="footer"><div className="wrap footer-grid"><div><Link href="/" className="brand" aria-label="VALYNEX — الرئيسية"><Brand/></Link><p>أجهزة ومستلزمات المعامل.<br/>طلبات التوريد للمنشآت الطبية في مصر.</p></div><nav aria-label="روابط التذييل"><Link href="/about">عن فالينكس</Link><Link href="/products">المنتجات والخدمات</Link><Link href="/shop">المتجر</Link><Link href="/contact">تواصل معنا</Link></nav><div><small>ابدأ محادثة</small><a dir="ltr" href={whatsapp()} target="_blank" rel="noopener noreferrer">+20 103 777 9413 ↗</a><span>واتساب · طلبات الشركات والمعامل</span></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} VALYNEX. جميع الحقوق محفوظة.</span><Link href="/photo-credits">مصادر الصور</Link></div></footer><a className="floating-wa" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="طلب عرض سعر عبر واتساب — يفتح نافذة جديدة">واتساب ↗</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></body></html>;}
