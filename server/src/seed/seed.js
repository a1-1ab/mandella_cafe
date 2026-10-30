import Product from '../models/product.model.js';

const photo = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const PRODUCTS = [
  {
    slug: 'mandella-tea',
    name: 'شاي مانديلا',
    shortDescription: 'حبق، مستكة وورد جوري',
    description:
      'خلطة الدار من الشاي السيلاني مع الحبق البلدي والمستكة والورد الجوري الدمشقي، تُحضّر على نار هادئة وتُقدّم ساخنة برائحة الشام.',
    category: 'hot',
    kind: 'خلطة الدار · ساخن',
    price: 1800,
    image: photo('1544787219-7f47ccb76574'),
    badge: 'الأكثر طلباً',
    sizes: [
      { label: 'كبير', price: 2300 },
      { label: 'وسط', price: 1800 },
    ],
    sugarOptions: ['عادي', 'خفيف', 'بدون سكر'],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    slug: 'shami-coffee',
    name: 'قهوة شامية',
    shortDescription: 'قهوة عربية بالهيل على الطريقة الشامية',
    description: 'قهوة عربية محمّصة بعناية مع الهيل، تُقدّم في فنحان صغير على الطريقة الدمشقية الأصيلة.',
    category: 'hot',
    kind: 'قهوة عربية · ساخن',
    price: 1500,
    image: photo('1509042239860-f550ce710b93'),
    badge: '',
    sizes: [
      { label: 'كبير', price: 1900 },
      { label: 'وسط', price: 1500 },
    ],
    sugarOptions: ['عادي', 'خفيف', 'بدون سكر'],
    isFeatured: false,
    sortOrder: 2,
  },
  {
    slug: 'lemon-mint',
    name: 'ليمون ونعنع',
    shortDescription: 'ليمون طازج مع نعنع بلدي',
    description: 'عصير ليمون طازج مخفوق مع أوراق النعنع البلدي والثلج، منعش ومناسب لأيام دمشق الحارة.',
    category: 'cold',
    kind: 'منعشات · بارد',
    price: 3000,
    image: photo('1499638673689-79a0b5115d87'),
    badge: '',
    sizes: [
      { label: 'كبير', price: 3500 },
      { label: 'وسط', price: 3000 },
    ],
    sugarOptions: ['عادي', 'خفيف', 'بدون سكر'],
    isFeatured: false,
    sortOrder: 3,
  },
  {
    slug: 'rose-sherbet',
    name: 'شراب الورد الجوري',
    shortDescription: 'ورد جوري دمشقي مع اللوز',
    description: 'شراب من الورد الجوري الدمشقي مع حبيبات اللوز، حلو ومعطّر ويُقدّم بارداً.',
    category: 'cold',
    kind: 'شراب الدار · بارد',
    price: 3000,
    image: photo('1576092768241-dec231879fc3'),
    badge: '',
    sizes: [
      { label: 'كبير', price: 3500 },
      { label: 'وسط', price: 3000 },
    ],
    sugarOptions: ['عادي', 'خفيف', 'بدون سكر'],
    isFeatured: true,
    sortOrder: 4,
  },
  {
    slug: 'baklava',
    name: 'بقلاوة شامية',
    shortDescription: 'طبقات رقيقة بالفستق الحلبي',
    description: 'بقلاوة شامية محضّرة بالسمن البلدي والفستق الحلبي، تُقدّم مع الشاي.',
    category: 'sweets',
    kind: 'حلويات شامية',
    price: 2500,
    image: photo('1551024506-0bccd828d307'),
    badge: '',
    sizes: [{ label: 'وسط', price: 2500 }],
    sugarOptions: ['عادي'],
    isFeatured: false,
    sortOrder: 5,
  },
  {
    slug: 'barazek',
    name: 'برازق',
    shortDescription: 'سمسم وفستق حلبي',
    description: 'أقراص برازق مقرمشة بالسمسم المحمّص والفستق، من حلويات الدار الكلاسيكية.',
    category: 'sweets',
    kind: 'حلويات شامية',
    price: 2200,
    image: photo('1488477181946-6428a0291777'),
    badge: '',
    sizes: [{ label: 'وسط', price: 2200 }],
    sugarOptions: ['عادي'],
    isFeatured: false,
    sortOrder: 6,
  },
];

const seedProducts = async () => {
  const count = await Product.estimatedDocumentCount();
  if (count > 0) return { seeded: false, count };

  await Product.insertMany(PRODUCTS);
  console.log(`[seed] inserted ${PRODUCTS.length} products`);
  return { seeded: true, count: PRODUCTS.length };
};

export default seedProducts;

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  const { default: connectDatabase, disconnectDatabase } = await import('../config/database.js');
  await connectDatabase();
  await Product.deleteMany({});
  await Product.insertMany(PRODUCTS);
  console.log(`[seed] fresh seed -> ${PRODUCTS.length} products`);
  await disconnectDatabase();
  process.exit(0);
}
