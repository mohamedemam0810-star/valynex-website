'use client';

import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpLeft, ShoppingBag, Search, Plus, Minus, Trash2, X, Package, Check} from 'lucide-react';
import {Eyebrow,Quote} from './ui';
import {whatsapp} from '@/lib/site';
import {egp,shopCategories,type ShopProduct} from '@/lib/shop';
import {cartLines,normalizeCart,orderMessage,type CartItem} from '@/lib/cart';

const storageKey = 'valynex-cart-v1';

export default function Shop({products}:{products:ShopProduct[]}) {
  const [query,setQuery] = useState('');
  const [category,setCategory] = useState('all');
  const [cart,setCart] = useState<CartItem[]>([]);
  const [ready,setReady] = useState(false);
  const [notice,setNotice] = useState('');
  const [selected,setSelected] = useState<ShopProduct|null>(null);
  const [orderUrl,setOrderUrl] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const orderForm = useRef<HTMLFormElement>(null);

  useEffect(()=>{
    try {setCart(normalizeCart(JSON.parse(localStorage.getItem(storageKey) ?? '[]'),products));}
    catch {setCart([]);}
    setReady(true);
  },[products]);
  useEffect(()=>{
    if (!ready) return;
    try {localStorage.setItem(storageKey,JSON.stringify(cart));} catch { /* Cart still works when storage is unavailable. */ }
    setOrderUrl('');
  },[cart,ready]);
  useEffect(()=>{
    if (selected && !dialog.current?.open) dialog.current?.showModal();
  },[selected]);

  const lines = cartLines(cart,products);
  const count = lines.reduce((sum,line)=>sum+line.quantity,0);
  const total = lines.reduce((sum,line)=>sum+line.totalPiasters,0)/100;
  const filtered = products.filter(p=>(category==='all'||p.category===category) &&
    `${p.name} ${p.description} ${p.sku ?? ''}`.toLocaleLowerCase('ar').includes(query.trim().toLocaleLowerCase('ar')));

  function changeQuantity(product:ShopProduct, quantity:number) {
    setCart(current=>normalizeCart([...current.filter(i=>i.id!==product.id),...(quantity>0?[{id:product.id,quantity}]:[])],products));
    setOrderUrl('');
  }
  function add(product:ShopProduct) {
    setCart(current=>normalizeCart([...current,{id:product.id,quantity:1}],products));
    setNotice(`تمت إضافة ${product.name} إلى السلة`);
    setOrderUrl('');
  }
  function photo(product:ShopProduct, sizes:string) {
    return product.image ? <Image src={product.image} alt={product.imageAlt ?? product.name} fill sizes={sizes}/> :
      <div className="shop-no-photo"><Package size={40} strokeWidth={1}/><span>صورة المنتج قريبًا</span></div>;
  }

  return <>
    <section className="shop-intro"><div className="wrap shop-intro-grid"><div><Eyebrow>متجر فالينكس</Eyebrow><h1>اختر احتياجات معملك<br/><span>وأرسل لنا طلبك</span></h1><p>تصفح المنتجات، حدد الكميات، واجمع احتياجاتك في سلة واحدة.<br/>نراجع معك التوافر والتوصيل قبل تأكيد الطلب.</p></div><a className="shop-cart-link" href="#cart"><ShoppingBag size={22}/><span>سلة المشتريات</span><b>{count}</b></a></div><div className="wrap shop-benefits"><span><Check size={16}/>أسعار بالجنيه المصري</span><span><Check size={16}/>تأكيد الطلب عبر واتساب</span><span><Check size={16}/>مراجعة التوافر والتوصيل</span></div></section>
    <section className="wrap shop-layout section" aria-label="المنتجات وسلة المشتريات">
      <div className="shop-catalog">
        {products.length>0 ? <>
          <div className="shop-toolbar"><h2>المنتجات <span>{products.length}</span></h2><label className="shop-search"><Search size={18}/><span className="sr-only">ابحث عن منتج أو كود صنف</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن منتج أو كود صنف"/></label></div>
          <div className="shop-filters" role="group" aria-label="تصفية المنتجات حسب الفئة"><button type="button" aria-pressed={category==='all'} onClick={()=>setCategory('all')}>كل المنتجات</button>{shopCategories.filter(c=>products.some(p=>p.category===c.id)).map(c=><button key={c.id} type="button" aria-pressed={category===c.id} onClick={()=>setCategory(c.id)}>{c.name}</button>)}</div>
          <p className="shop-result-count" role="status">{filtered.length} منتج</p>
          <div className="shop-product-grid">{filtered.map(product=>{
            const quantity=lines.find(l=>l.id===product.id)?.quantity ?? 0;
            const unavailable=product.stock===0;
            return <article className="shop-product" key={product.id}>
              <button className="shop-product-image" type="button" onClick={()=>setSelected(product)} aria-label={`عرض تفاصيل ${product.name}`}>{photo(product,'(max-width:760px) 100vw, (max-width:1050px) 50vw, 30vw')}<span className={`shop-stock${unavailable?' unavailable':''}`}>{unavailable?'غير متاح حاليًا':'متاح للطلب'}</span></button>
              <div className="shop-product-info"><small>{shopCategories.find(c=>c.id===product.category)?.name}</small><h3><button type="button" onClick={()=>setSelected(product)}>{product.name}</button></h3><p>{product.description}</p><div className="shop-price"><strong>{egp(product.priceEgp)}</strong><span>لكل {product.unit}</span></div><button className="button shop-add" type="button" disabled={unavailable||quantity>=product.stock} onClick={()=>add(product)}><Plus size={17}/>{unavailable?'غير متاح':quantity>=product.stock?'بلغت الكمية المتاحة':'أضف إلى السلة'}</button></div>
            </article>;
          })}</div>
          {filtered.length===0&&<div className="shop-no-results"><Search size={28}/><h3>لا توجد نتائج مطابقة</h3><p>جرّب اسمًا آخر أو اعرض كل المنتجات.</p><button type="button" className="text-link" onClick={()=>{setQuery('');setCategory('all');}}>عرض كل المنتجات</button></div>}
        </> : <div className="shop-coming"><div className="shop-coming-symbol"><ShoppingBag size={46} strokeWidth={1}/></div><Eyebrow>المنتجات قيد الإضافة</Eyebrow><h2>قريبًا هنا<br/>منتجات فالينكس</h2><p>نجهّز صور المنتجات وأسعارها وتفاصيلها.<br/>إلى أن تكتمل القائمة، تواصل معنا لمعرفة المتاح أو إرسال احتياجاتك.</p><Quote label="اسأل عن المنتجات المتاحة" message="مرحبًا VALYNEX، أود معرفة المنتجات المتاحة وأسعارها."/></div>}
      </div>
      <aside id="cart" className="shop-cart" aria-labelledby="cart-title"><div className="shop-cart-heading"><h2 id="cart-title">سلة المشتريات</h2><ShoppingBag size={22}/></div><p className="shop-cart-subtitle">{count ? `${count} وحدة في طلبك` : 'اجمع احتياجاتك هنا'}</p>
        {lines.length===0 ? <div className="shop-empty-cart"><Package size={35} strokeWidth={1}/><h3>السلة فارغة</h3><p>عند إضافة منتج، سيظهر هنا مع الكمية والإجمالي.</p></div> : <>
          <ul className="shop-cart-items">{lines.map(line=><li key={line.id}><div className="shop-line-heading"><h3>{line.product.name}</h3><button type="button" className="shop-icon-button" aria-label={`حذف ${line.product.name} من السلة`} onClick={()=>changeQuantity(line.product,0)}><Trash2 size={16}/></button></div><small>{egp(line.product.priceEgp)} / {line.product.unit}</small><div className="shop-line-controls"><div className="shop-quantity"><button type="button" disabled={line.quantity<=1} aria-label={`تقليل كمية ${line.product.name}`} onClick={()=>changeQuantity(line.product,line.quantity-1)}><Minus size={14}/></button><span aria-label={`الكمية ${line.quantity}`}>{line.quantity}</span><button type="button" disabled={line.quantity>=line.product.stock} aria-label={`زيادة كمية ${line.product.name}`} onClick={()=>changeQuantity(line.product,line.quantity+1)}><Plus size={14}/></button></div><strong>{egp(line.totalPiasters/100)}</strong></div></li>)}</ul>
          <div className="shop-total"><span>إجمالي المنتجات</span><strong>{egp(total)}</strong></div><p className="shop-order-note">الشحن وأي رسوم إضافية تُحدد قبل تأكيد الطلب. إرسال الرسالة لا يعني إتمام الشراء أو حجز المخزون.</p>
          <form ref={orderForm} className="shop-order-form" onChange={()=>setOrderUrl('')} onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);const customer={name:String(data.get('name')??''),phone:String(data.get('phone')??''),city:String(data.get('city')??''),address:String(data.get('address')??''),notes:String(data.get('notes')??'')};if(!customer.name.trim()||!customer.city.trim()||!customer.phone.trim())return;setOrderUrl(whatsapp(orderMessage(lines,customer)));}}><h3>بيانات الطلب</h3><label>الاسم<input name="name" autoComplete="name" required maxLength={100}/></label><label>رقم التواصل<input name="phone" type="tel" dir="ltr" autoComplete="tel" required pattern="[+0-9٠-٩ ()-]{7,20}" maxLength={20}/></label><label>المحافظة<input name="city" autoComplete="address-level1" required maxLength={80}/></label><label>عنوان التوصيل <small>اختياري</small><input name="address" autoComplete="street-address" maxLength={250}/></label><label>ملاحظات <small>اختياري</small><textarea name="notes" rows={2} maxLength={500} placeholder="أي تفاصيل تخص طلبك"/></label><p className="shop-privacy">بيانات التواصل لا تُحفظ على الموقع. راجع الرسالة في واتساب وأرسلها بنفسك.</p><button type="submit" className="button shop-order-button">جهّز رسالة الطلب <ArrowUpLeft size={18}/></button>{orderUrl&&<div className="shop-order-ready" role="status"><p>رسالتك جاهزة بالمنتجات والكميات والإجمالي.</p><a className="button" href={orderUrl} target="_blank" rel="noopener noreferrer">راجع الطلب في واتساب ↗</a></div>}</form>
        </>}
        <div className="shop-help"><span>تحتاج صنفًا غير موجود؟</span><a href={whatsapp('مرحبًا VALYNEX، أبحث عن منتج غير موجود في المتجر.')} target="_blank" rel="noopener noreferrer">اسألنا عبر واتساب ↗</a></div>
      </aside>
    </section>
    <p className="sr-only" role="status" aria-live="polite">{notice}</p>
    <dialog ref={dialog} className="shop-dialog" onClose={()=>setSelected(null)}><button className="shop-dialog-close shop-icon-button" type="button" aria-label="إغلاق تفاصيل المنتج" onClick={()=>dialog.current?.close()}><X size={22}/></button>{selected&&<div className="shop-detail"><div className="shop-detail-photo">{photo(selected,'(max-width:760px) 100vw, 45vw')}</div><div><Eyebrow>{shopCategories.find(c=>c.id===selected.category)?.name}</Eyebrow><h2>{selected.name}</h2>{selected.sku&&<p className="shop-sku">كود الصنف: <bdi>{selected.sku}</bdi></p>}<p>{selected.description}</p><ul>{selected.details.map(detail=><li key={detail}>{detail}</li>)}</ul><div className="shop-price"><strong>{egp(selected.priceEgp)}</strong><span>لكل {selected.unit}</span></div><button className="button" type="button" disabled={selected.stock===0||(lines.find(l=>l.id===selected.id)?.quantity??0)>=selected.stock} onClick={()=>{add(selected);dialog.current?.close();}}>أضف إلى السلة <Plus size={18}/></button></div></div>}</dialog>
  </>;
}
