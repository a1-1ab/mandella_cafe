import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Screen from '../components/layout/Screen.jsx';
import ScreenHeader from '../components/layout/ScreenHeader.jsx';
import CategoryPills from '../components/menu/CategoryPills.jsx';
import ProductRow from '../components/menu/ProductRow.jsx';
import Button from '../components/ui/Button.jsx';
import IconButton from '../components/ui/IconButton.jsx';
import { LoadingBlock, ErrorBlock, EmptyBlock } from '../components/ui/Notices.jsx';
import { ArrowLeft, Cup } from '../components/ui/icons.jsx';
import { useCategories, useProducts } from '../hooks/useProducts.js';
import useCart from '../hooks/useCart.js';
import { toArabicDigits } from '../lib/format.js';

const MENU_FILTERS = ['all', 'hot', 'cold'];

const MenuScreen = () => {
  const navigate = useNavigate();
  const { count } = useCart();
  const [category, setCategory] = useState('all');

  const { data: categories } = useCategories();
  const { data: products, loading, error, refetch } = useProducts({ category });

  const filters = useMemo(
    () => (categories || []).filter((item) => MENU_FILTERS.includes(item.value)),
    [categories]
  );

  return (
    <Screen>
      <ScreenHeader
        title="قائمة المشروبات"
        subtitle="خلطات الدار، قهوة شامية، ومنعشات تُحضّر طازجة"
        onBack={() => navigate('/home')}
        action={
          <IconButton label="السلة" onClick={() => navigate('/summary')} className="relative">
            <Cup className="h-[18px] w-[18px]" />
            {count > 0 ? (
              <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose px-1 text-[10px] font-bold text-white">
                {toArabicDigits(count)}
              </span>
            ) : null}
          </IconButton>
        }
      />

      <div className="screen-scroll">
        <CategoryPills
          categories={filters}
          value={category}
          onChange={setCategory}
          className="px-5 pt-3"
        />

        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-[15.5px] font-extrabold text-ink">اختيارات من الدار</h2>
          <span className="text-[11px] font-semibold text-muted">
            {products ? `${toArabicDigits(products.length)} مشروبات` : '...'}
          </span>
        </div>

        <div className="space-y-3 px-5">
          {loading ? <LoadingBlock label="نجهّز القائمة..." /> : null}
          {error ? <ErrorBlock message={error} onRetry={refetch} /> : null}
          {!loading && !error && products?.length === 0 ? (
            <EmptyBlock title="لا يوجد مشروبات في هذا التصنيف" message="اختر تصنيفاً آخر من الأعلى." />
          ) : null}
          {(products || []).map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              active={index === 0}
              onOpen={() => navigate(`/product/${product.slug}`)}
            />
          ))}
        </div>

        <div className="px-5 pb-5 pt-5">
          <Button size="lg" className="w-full" onClick={() => navigate('/product/mandella-tea')}>
            <span>عرض شاي مانديلا</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Screen>
  );
};

export default MenuScreen;
