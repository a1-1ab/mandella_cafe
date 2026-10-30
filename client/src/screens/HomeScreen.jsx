import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Screen from '../components/layout/Screen.jsx';
import Logo from '../components/brand/Logo.jsx';
import SearchField from '../components/ui/SearchField.jsx';
import CategoryPills from '../components/menu/CategoryPills.jsx';
import ProductCard from '../components/menu/ProductCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Button from '../components/ui/Button.jsx';
import Image from '../components/ui/Image.jsx';
import Card from '../components/ui/Card.jsx';
import { LoadingBlock, ErrorBlock, EmptyBlock } from '../components/ui/Notices.jsx';
import { ArrowLeft } from '../components/ui/icons.jsx';
import { useCategories, useProducts } from '../hooks/useProducts.js';
import useCart from '../hooks/useCart.js';
import { BRAND } from '../constants/copy.js';
import { formatPrice } from '../lib/format.js';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { add } = useCart();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const { data: categories } = useCategories();
  const { data: products, loading, error, refetch } = useProducts({ category, q: query });

  const featured = useMemo(() => (products || []).find((item) => item.isFeatured) || products?.[0], [products]);
  const recommended = useMemo(() => (products || []).filter((item) => item.id !== featured?.id), [products, featured]);

  const openProduct = (product) => navigate(`/product/${product.slug}`);

  const addQuick = (product) => {
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: product.sizes?.[product.sizes.length - 1]?.label || 'وسط',
      temperature: product.category === 'cold' ? 'بارد' : 'ساخن',
      sugar: product.sugarOptions?.[product.sugarOptions.length - 1] || 'بدون سكر',
      unitPrice: product.sizes?.[product.sizes.length - 1]?.price ?? product.price,
      quantity: 1,
    });
  };

  return (
    <Screen>
      <div className="screen-scroll">
        <header className="flex items-center justify-between gap-3 px-5 pb-3 pt-1">
          <div>
            <h1 className="text-[18px] font-extrabold leading-6 text-ink">{BRAND.welcome}</h1>
            <p className="mt-1 text-[10.5px] font-medium text-muted">{BRAND.locality}</p>
          </div>
          <Logo compact />
        </header>

        <div className="px-5">
          <SearchField value={query} onChange={setQuery} placeholder={BRAND.searchPlaceholder} />
        </div>

        <CategoryPills
          categories={categories || []}
          value={category}
          onChange={setCategory}
          className="px-5 pt-3"
        />

        {featured ? (
          <div className="px-5 pt-3">
            <button
              type="button"
              onClick={() => openProduct(featured)}
              className="relative block h-[168px] w-full overflow-hidden rounded-[22px] text-right shadow-card"
            >
              <Image src={featured.image} alt={featured.name} wrapperClassName="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-l from-ink/85 via-ink/45 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <span className="w-fit rounded-full bg-teal px-2.5 py-1 text-[9.5px] font-bold text-white">
                  عرض الدار
                </span>
                <div>
                  <p className="max-w-[250px] text-[15px] font-extrabold leading-6 text-white">
                    شاي مانديلا بالحبق والمستكة والورد الجوري
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-white/85">
                    {formatPrice(featured.price)} · كوب وسط
                  </p>
                </div>
              </div>
            </button>
          </div>
        ) : null}

        <div className="px-5 pt-5">
          <SectionHeading title="مقترح لكم" hint={products ? `${products.length}` : ''} action={<span className="text-[11px] font-semibold text-teal-deep">عرض الكل</span>} />
        </div>

        <div className="space-y-3 px-5 pt-3">
          {loading ? <LoadingBlock label="نحضّر لك الاقتراحات..." /> : null}
          {error ? <ErrorBlock message={error} onRetry={refetch} /> : null}
          {!loading && !error && recommended.length === 0 && !featured ? (
            <EmptyBlock
              title="لا توجد نتائج"
              message="جرّب تصنيفاً آخر أو ابحث باسم مشروب مختلف."
              actionLabel="عرض كل المشروبات"
              onAction={() => {
                setCategory('all');
                setQuery('');
              }}
            />
          ) : null}
          {recommended.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openProduct(product)}
              onAdd={() => addQuick(product)}
            />
          ))}
        </div>

        <Card tone="teal" padded="md" className="mx-5 mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-extrabold">خلطات الدار تُحضّر على الطلب</p>
            <p className="mt-1 text-[10.5px] text-white/85">استلام من المقهى خلال ١٨–٢٨ دقيقة</p>
          </div>
          <span className="text-2xl">🍵</span>
        </Card>

        <div className="px-5 pb-5 pt-4">
          <Button size="lg" className="w-full" onClick={() => navigate('/menu')}>
            <span>تصفح المشروبات</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Screen>
  );
};

export default HomeScreen;
