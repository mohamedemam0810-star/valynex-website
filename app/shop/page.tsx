import Shop from '@/components/shop';
import {shopProducts,sellableProduct} from '@/lib/shop';

export const metadata = {
  title:'المتجر | أجهزة ومستلزمات المعامل',
  description:'تصفح منتجات فالينكس، اختر الكميات وأرسل طلبك عبر واتساب لتأكيد التوافر والتوصيل.',
  alternates:{canonical:'/shop'}
};

export default function ShopPage() {
  return <Shop products={shopProducts.filter(sellableProduct)}/>;
}
