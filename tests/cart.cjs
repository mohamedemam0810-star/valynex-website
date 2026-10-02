const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {stripTypeScriptTypes}=require('node:module');
async function load(file){const code=stripTypeScriptTypes(fs.readFileSync(path.join(__dirname,'..','lib',file),'utf8'));return import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));}
(async()=>{
const {normalizeCart,cartLines,orderMessage}=await load('cart.ts');
const {shopProducts,sellableProduct}=await load('shop.ts');
const products=[{id:'TEST-ONLY',name:'منتج اختبار',category:'supplies',description:'اختبار فقط',details:[],priceEgp:19.99,stock:3,unit:'عبوة',sku:'TEST-SKU'},{id:'UNAVAILABLE',name:'غير متاح',priceEgp:10,stock:0,unit:'قطعة'}];
test('Discard stale or malformed entries and cap combined quantities at actual stock',()=>{assert.deepEqual(normalizeCart([{id:'TEST-ONLY',quantity:2},{id:'TEST-ONLY',quantity:9},{id:'missing',quantity:1},{id:'UNAVAILABLE',quantity:1},{id:'TEST-ONLY',quantity:-1},{id:'TEST-ONLY',quantity:1.5},null],products),[{id:'TEST-ONLY',quantity:3}]);assert.deepEqual(normalizeCart({id:'TEST-ONLY'},products),[]);});
test('Reconcile a saved cart after stock falls and calculate prices in integer piasters',()=>{const lines=cartLines([{id:'TEST-ONLY',quantity:3}],[{...products[0],stock:2}]);assert.equal(lines[0].quantity,2);assert.equal(lines[0].totalPiasters,3998);});
test('WhatsApp review includes every quantity, SKU, totals and shipping caveat; optional blanks omitted',()=>{const lines=cartLines([{id:'TEST-ONLY',quantity:2}],products);const message=orderMessage(lines,{name:'  اسم اختبار  ',phone:'01000000000',city:'القاهرة',address:'',notes:''});assert.ok(message.includes('TEST-SKU'));assert.ok(message.includes('الكمية: 2 عبوة'));assert.ok(message.includes('إجمالي المنتجات'));assert.ok(message.includes('الشحن وأي رسوم إضافية'));assert.ok(message.includes('الاسم: اسم اختبار'));assert.ok(!message.includes('عنوان التوصيل:'));});
test('Do not publish fabricated products, invalid prices or invalid stock',()=>{assert.ok(shopProducts.every(p=>!p.id.startsWith('TEST')&&p.id!=='UNAVAILABLE'));assert.equal(sellableProduct(products[0]),true);for(const change of [{priceEgp:NaN},{priceEgp:-1},{stock:1.5},{unit:''}])assert.equal(sellableProduct({...products[0],...change}),false);});

})().catch(error=>{console.error(error);process.exitCode=1;});
