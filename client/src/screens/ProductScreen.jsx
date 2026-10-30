import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Screen from '../components/layout/Screen.jsx';
import ScreenHeader from '../components/layout/ScreenHeader.jsx';
import Image from '../components/ui/Image.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';
import Stepper from '../components/ui/Stepper.jsx';
import { LoadingBlock, ErrorBlock } from '../components/ui/Notices.jsx';
import { ArrowLeft } from '../components/ui/icons.jsx';
import useProduct from '../hooks/useProduct.js';
import useCart from '../hooks/useCart.js';
import { formatPrice, toArabicDigits } from '../lib/format.js';

const ProductScreen = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { data: product, loading, error, refetch } = useProduct(slug);

  const [size, setSize] = useState('');
  const [sugar, setSugar] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes?.at(-1)?.label || 'وسط');
    setSugar(product.sugarOptions?.at(-1) || 'بدون سكر');
    setQuantity(1);
  }, [product]);

  const unitPrice = useMemo(() => {
    const match = product?.sizes?.find((item) => item.label === size);
    return match?.price ?? product?.price ?? 0;
  }, [product, size]);

  const addToOrder = () => {
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      size,
      sugar,
      temperature: product.category === 'cold' ? 'بارد' : 'ساخن',
      unitPrice,
      quantity,
    });
    navigate('/summary');
  };

  return (
    <Screen>
      <ScreenHeader title="على ذوقك" onBack={() => navigate(-1)} />

      <div className="screen-scroll">
        {loading ? <LoadingBlock label="نفتح صفحة المشروب..." /> : null}
        {error ? <ErrorBlock message={error} onRetry={refetch} /> : null}

        { product ? (
          <>
            <div className="px-5 pt-1">
              <Image
                src={product.image}
                alt={product.name}
                wrapperClassName="h-[212px] w-full rounded-[24px]"
              />
            </div>

            <div className="px-5 pt-4">
              <span className="inline-block rounded-full bg-teal-soft px-2.5 py-1 text-[10px] font-bold text-teal-deep">
                {product.kind}
              </span>
              <div className="mt-2 flex items-center justify-between gap-3">
                <h2 className="text-[20px] font-extrabold text-ink">{product.name}</h2>
                <p className="text-[15px] font-extrabold text-price">{formatPrice(unitPrice)}</p>
              </div>
              <p className="mt-2 text-[12px] leading-7 text-muted">{product.description}</p>
            </div>

            {product.sizes?.length > 1 ? (
              <section className="px-5 pt-5">
                <h3 className="mb-2 text-[12.5px] font-bold text-ink">الحجم</h3>
                <div className="flex gap-2">
                  {product.sizes.map((option) => (
                    <Chip
                      key={option.label}
                      tone="amber"
                      active={size === option.label}
                      onClick={() => setSize(option.label)}
                      className="flex-1 py-2.5"
                    >
                      {option.label} · {formatPrice(option.price)}
                    </Chip>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="px-5 pt-4">
              <h3 className="mb-2 text-[12.5px] font-bold text-ink">السكر</h3>
              <div className="flex gap-2">
                {(product.sugarOptions || []).map((option) => (
                  <Chip
                    key={option}
                    tone="tealOutline"
                    active={sugar === option}
                    onClick={() => setSugar(option)}
                    className="flex-1 py-2.5"
                  >
                    {option}
                  </Chip>
                ))}
              </div>
            </section>

            <section className="flex items-center justify-between px-5 pt-5">
              <h3 className="text-[12.5px] font-bold text-ink">الكمية</h3>
              <Stepper
                value={toArabicDigits(quantity)}
                onIncrement={() => setQuantity((current) => Math.min(20, current + 1))}
                onDecrement={() => setQuantity((current) => Math.max(1, current - 1))}
              />
            </section>

            <div className="px-5 pb-5 pt-6">
              <Button size="lg" className="w-full" onClick={addToOrder}>
                <span>
                  أضف الطلب · {formatPrice(unitPrice * quantity)}
                </span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </Screen>
  );
};

export default ProductScreen;
