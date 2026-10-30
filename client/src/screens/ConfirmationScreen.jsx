import { useNavigate, useParams } from 'react-router-dom';
import Screen from '../components/layout/Screen.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Image from '../components/ui/Image.jsx';
import { LoadingBlock, ErrorBlock } from '../components/ui/Notices.jsx';
import { ArrowLeft, Check, Clock, Pin, Receipt } from '../components/ui/icons.jsx';
import useResource from '../hooks/useResource.js';
import { orderApi } from '../lib/api/index.js';
import { ORDER_STATUS } from '../constants/copy.js';
import { formatItemsLabel, formatPrice, toArabicDigits } from '../lib/format.js';

const ConfirmationScreen = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: order, loading, error, refetch } = useResource(() => orderApi.get(orderId), {
    deps: [orderId],
    immediate: Boolean(orderId),
  });

  const firstItem = order?.items?.[0];

  return (
    <Screen>
      <div className="screen-scroll px-5 pb-5 pt-1">
        {loading ? <LoadingBlock label="نجهّز تفاصيل طلبك..." /> : null}
        {error ? <ErrorBlock message={error} onRetry={refetch} /> : null}

        {order ? (
          <div className="animate-fade-up">
            <div className="flex flex-col items-center pt-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2FA36B] text-white shadow-card">
                <Check className="h-8 w-8" />
              </span>
              <h1 className="mt-4 text-[21px] font-extrabold text-ink">الطلب جاهز للاستلام!</h1>
              <p className="mt-1.5 text-[12.5px] font-bold text-amber">طلبك صار جاهز عنا</p>
              <p className="mt-1 max-w-[280px] text-[11px] leading-6 text-muted">
                منتظرينك في مانديلا، خلّي اسم الطلب معك عند الاستلام.
              </p>
            </div>

            <Card tone="amber" padded="md" className="mt-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10.5px] font-semibold text-ink/70">رقم الطلب</p>
                  <p className="mt-0.5 text-[17px] font-extrabold text-ink">
                    {order.orderNumber}
                  </p>
                </div>
                <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold text-ink">
                  {ORDER_STATUS[order.status] || order.status}
                </span>
              </div>

              {firstItem ? (
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/80 p-2.5">
                  <Image
                    src={firstItem.image}
                    alt={firstItem.name}
                    wrapperClassName="h-14 w-14 shrink-0 rounded-xl"
                  />
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-ink">
                      {firstItem.name} × {toArabicDigits(firstItem.quantity)}
                    </p>
                    <p className="mt-0.5 text-[10.5px] text-ink/60">
                      {firstItem.size} · {firstItem.temperature} · {firstItem.sugar}
                    </p>
                  </div>
                  <p className="text-[13px] font-extrabold text-price">{formatPrice(order.total)}</p>
                </div>
              ) : null}

              <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white/60 py-2 text-[11px] font-semibold text-ink/80">
                <Clock className="h-4 w-4" />
                <span>الاستلام خلال {order.pickup.eta}</span>
              </div>
            </Card>

            <Card tone="white" padded="md" className="mt-3 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-soft text-teal-deep">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-ink">{ORDER_STATUS[order.status] || order.status}</p>
                  <p className="text-[10px] text-muted">الشاي يُحضّر على الطلب</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-soft text-teal-deep">
                  <Pin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-ink">{order.pickup.label}</p>
                  <p className="text-[10px] text-muted">{order.pickup.address}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-line pt-2.5 text-[11px]">
                <span className="text-muted">{formatItemsLabel(order.itemCount)} · الدفع عند الاستلام</span>
                <span className="font-extrabold text-price">{formatPrice(order.total)}</span>
              </div>
            </Card>

            <div className="mt-4 space-y-2.5">
              <Button size="lg" className="w-full" onClick={() => navigate('/home')}>
                <span>العودة للرئيسية</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="md" className="w-full" onClick={() => navigate('/menu')}>
                <Receipt className="h-4 w-4" />
                <span>اطلب مرة أخرى</span>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Screen>
  );
};

export default ConfirmationScreen;
