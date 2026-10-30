import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Screen from '../components/layout/Screen.jsx';
import ScreenHeader from '../components/layout/ScreenHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Image from '../components/ui/Image.jsx';
import Button from '../components/ui/Button.jsx';
import Stepper from '../components/ui/Stepper.jsx';
import { EmptyBlock, ErrorBlock } from '../components/ui/Notices.jsx';
import { ArrowLeft, Cash, Check, Clock, Lock, Pin } from '../components/ui/icons.jsx';
import useCart from '../hooks/useCart.js';
import { orderApi } from '../lib/api/index.js';
import { BRAND } from '../constants/copy.js';
import { formatItemsLabel, formatPrice, toArabicDigits } from '../lib/format.js';

const SummaryScreen = () => {
  const navigate = useNavigate();
  const { items, count, subtotal, increment, decrement, isEmpty, clear, toPayload } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const confirmOrder = async () => {
    setSubmitting(true);
    setError('');

    try {
      const order = await orderApi.create({ items: toPayload(), paymentMethod: 'cash' });
      clear();
      navigate(`/confirmation/${order.id}`, { replace: true });
    } catch (caught) {
      setError(caught.message || 'تعذّر تأكيد الطلب');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <ScreenHeader
        title="ملخّص الطلب"
        subtitle="راجع طلبك قبل التأكيد، الدفع نقداً عند الاستلام"
        onBack={() => navigate('/menu')}
      />

      <div className="screen-scroll">
        {isEmpty ? (
          <div className="px-5 pt-6">
            <EmptyBlock
              title="سلتك فارغة"
              message="أضف مشروباً من قائمة الدار لتبدأ طلبك."
              actionLabel="تصفح المشروبات"
              onAction={() => navigate('/menu')}
            />
          </div>
        ) : null}

        {!isEmpty ? (
          <>
            <div className="space-y-3 px-5 pt-2">
              {items.map((item) => (
                <Card key={item.key} tone="white" padded="none" className="p-3">
                  <div className="flex gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      wrapperClassName="h-[70px] w-[70px] shrink-0 rounded-2xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold text-ink">{item.name}</h3>
                      <p className="mt-0.5 text-[10.5px] text-muted">
                        {item.size} · {item.temperature} · {item.sugar}
                      </p>
                      <p className="mt-1 text-[13px] font-extrabold text-price">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-line/70 pt-2">
                    <span className="text-[10.5px] font-medium text-muted">{formatPrice(item.unitPrice)} / كوب</span>
                    <Stepper
                      value={toArabicDigits(item.quantity)}
                      onIncrement={() => increment(item.key)}
                      onDecrement={() => decrement(item.key)}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <Card tone="amber" padded="md" className="mx-5 mt-4 flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-ink">
                <Pin className="h-[18px] w-[18px]" />
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-extrabold text-ink">{BRAND.pickup.label}</p>
                <p className="mt-1 text-[11px] font-semibold text-ink/70">
                  {BRAND.pickup.address} · الاستلام خلال {BRAND.pickup.eta}
                </p>
              </div>
            </Card>

            <section className="px-5 pt-5">
              <h3 className="mb-2 text-[13px] font-extrabold text-ink">طريقة الدفع</h3>
              <div className="flex items-center gap-3 rounded-[18px] border-2 border-teal bg-white p-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal text-white">
                  <Check className="h-3 w-3" />
                </span>
                <div className="flex-1">
                  <p className="text-[12.5px] font-bold text-ink">نقداً عند الاستلام</p>
                  <p className="mt-0.5 text-[10.5px] text-muted">لا حاجة لدفع مسبق</p>
                </div>
                <Cash className="h-[18px] w-[18px] text-teal-deep" />
              </div>
            </section>

            <Card tone="white" padded="md" className="mx-5 mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-muted">المجموع · {formatItemsLabel(count)}</span>
                <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-muted">رسوم الاستلام</span>
                <span className="font-semibold text-teal-deep">مجاناً</span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line pt-2.5">
                <span className="text-[13px] font-extrabold text-ink">الإجمالي</span>
                <span className="text-[16px] font-extrabold text-price">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                <Clock className="h-3.5 w-3.5" />
                <span>وقت التحضير التقريبي {BRAND.pickup.eta}</span>
              </div>
            </Card>

            {error ? (
              <div className="px-5 pt-4">
                <ErrorBlock message={error} />
              </div>
            ) : null}

            <div className="px-5 pb-5 pt-4">
              <Button size="lg" className="w-full" disabled={submitting} onClick={confirmOrder}>
                <span>
                  {submitting ? 'جاري تأكيد الطلب...' : `تأكيد الطلب · ${formatPrice(subtotal)}`}
                </span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted">
                <Lock className="h-3.5 w-3.5" />
                الدفع عند الاستلام، بدون دفع مسبق
              </p>
            </div>
          </>
        ) : null}
      </div>
    </Screen>
  );
};

export default SummaryScreen;
