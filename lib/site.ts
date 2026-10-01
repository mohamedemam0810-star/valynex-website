export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
export const whatsapp = (message = 'مرحبًا VALYNEX، أود طلب عرض سعر لحلول المعامل والتجهيزات الطبية.') => `https://wa.me/201037779413?text=${encodeURIComponent(message)}`;
export const categories = [
 {id:'equipment',name:'أجهزة وتجهيزات المعامل',en:'LABORATORY EQUIPMENT',text:'حلول تجهيز تتوافق مع طبيعة العمل والطاقة التشغيلية لمعملك.',items:['أجهزة المعامل','تجهيزات العمل اليومية','حلول تطوير المعمل'],icon:'01'},
 {id:'supplies',name:'مستلزمات المعامل',en:'LABORATORY SUPPLIES',text:'تنظيم احتياجات التشغيل المتكررة ضمن طلب توريد واضح.',items:['مستهلكات المعامل','مستلزمات التشغيل','طلبات التوريد الدورية'],icon:'02'},
 {id:'medical',name:'تجهيزات طبية',en:'MEDICAL SOLUTIONS',text:'تحديد التجهيزات المناسبة لاحتياجات المنشآت الطبية.',items:['تجهيزات المنشآت','مستلزمات طبية','حلول بحسب التخصص'],icon:'03'},
 {id:'services',name:'حلول التوريد والتجهيز',en:'PROCUREMENT & SETUP',text:'من قائمة الاحتياجات إلى عرض سعر محدد المواصفات والنطاق.',items:['مراجعة الاحتياجات','تجميع طلبات التوريد','تنسيق نطاق التجهيز'],icon:'04'}
];
