import type {ShopProduct} from './shop';

export type CartItem = {id:string; quantity:number};
export type CartLine = CartItem & {product:ShopProduct; totalPiasters:number};

// Only retain known products, whole quantities and currently available stock.
export function normalizeCart(value:unknown, products:ShopProduct[]):CartItem[] {
  if (!Array.isArray(value)) return [];
  const quantities = new Map<string,number>();
  for (const item of value) {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string' ||
        !Number.isSafeInteger(item.quantity) || item.quantity <= 0) continue;
    const product = products.find(p=>p.id === item.id);
    if (!product || product.stock <= 0) continue;
    quantities.set(item.id, Math.min(product.stock, (quantities.get(item.id) ?? 0) + item.quantity));
  }
  return [...quantities].map(([id,quantity])=>({id,quantity}));
}

export function cartLines(cart:CartItem[], products:ShopProduct[]):CartLine[] {
  return normalizeCart(cart,products).map(item=>{
    const product = products.find(p=>p.id === item.id)!;
    return {...item, product, totalPiasters:Math.round(product.priceEgp*100)*item.quantity};
  });
}

export function orderMessage(lines:CartLine[], customer:{name:string; phone:string; city:string; address:string; notes:string}) {
  const format = (piasters:number) => new Intl.NumberFormat('ar-EG', {style:'currency',currency:'EGP'}).format(piasters/100);
  return [
    'مرحبًا VALYNEX، أود طلب المنتجات التالية:',
    ...lines.map((line,index)=>`${index+1}. ${line.product.name}${line.product.sku ? ` (${line.product.sku})` : ''}\nالكمية: ${line.quantity} ${line.product.unit}\nسعر الوحدة: ${format(Math.round(line.product.priceEgp*100))}\nإجمالي الصنف: ${format(line.totalPiasters)}`),
    `إجمالي المنتجات: ${format(lines.reduce((sum,line)=>sum+line.totalPiasters,0))}`,
    'الشحن وأي رسوم إضافية تُحدد قبل تأكيد الطلب.',
    `الاسم: ${customer.name.trim()}`,
    `رقم التواصل: ${customer.phone.trim()}`,
    `المحافظة: ${customer.city.trim()}`,
    ...(customer.address.trim() ? [`عنوان التوصيل: ${customer.address.trim()}`] : []),
    ...(customer.notes.trim() ? [`ملاحظات: ${customer.notes.trim()}`] : []),
    'يرجى تأكيد التوافر والإجمالي النهائي وموعد التوريد.'
  ].join('\n\n');
}
