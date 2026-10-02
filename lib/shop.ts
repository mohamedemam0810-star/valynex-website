export type ShopProduct = {
  id: string;
  name: string;
  category: 'equipment' | 'supplies' | 'rapid' | 'medical';
  description: string;
  details: string[];
  priceEgp: number;
  stock: number;
  unit: string;
  image?: string;
  imageAlt?: string;
  sku?: string;
};

// Add owner-confirmed products only. Prices are EGP per selling unit.
// Images must be actual product photos saved under public/images/products/.
export const shopProducts: ShopProduct[] = [];

export const shopCategories = [
  {id:'equipment', name:'أجهزة المعامل'},
  {id:'supplies', name:'مستلزمات المعامل'},
  {id:'rapid', name:'الاختبارات السريعة'},
  {id:'medical', name:'تجهيزات طبية'}
] as const;

export const egp = (amount: number) => new Intl.NumberFormat('ar-EG', {
  style:'currency', currency:'EGP', maximumFractionDigits:2
}).format(amount);

export function sellableProduct(product: ShopProduct) {
  return Boolean(product.id && product.name && product.unit) &&
    Number.isSafeInteger(Math.round(product.priceEgp * 100)) &&
    Number.isFinite(product.priceEgp) && product.priceEgp > 0 &&
    Number.isSafeInteger(product.stock) && product.stock >= 0;
}
