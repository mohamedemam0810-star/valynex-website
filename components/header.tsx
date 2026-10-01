'use client';
import Link from 'next/link';
import Brand from './brand';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import { Menu, X } from 'lucide-react';
import { Quote } from './ui';
const links=[['/','الرئيسية'],['/about','عن فالينكس'],['/products','المنتجات والخدمات'],['/contact','تواصل معنا']];
export default function Header(){const path=usePathname();const [open,setOpen]=useState(false);return <header className="header"><div className="wrap header-inner"><Link href="/" className="brand" aria-label="VALYNEX — الرئيسية"><Brand/></Link><nav aria-label="القائمة الرئيسية" className="desktop-nav">{links.map(([url,label])=><Link aria-current={path===url?'page':undefined} key={url} href={url}>{label}</Link>)}</nav><div className="header-quote"><Quote/></div><button className="menu-button" aria-label={open?'إغلاق القائمة':'فتح القائمة'} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<nav id="mobile-nav" className="mobile-nav" aria-label="قائمة الهاتف">{links.map(([url,label])=><Link aria-current={path===url?'page':undefined} onClick={()=>setOpen(false)} key={url} href={url}>{label}</Link>)}<Quote/></nav>}</header>;}
