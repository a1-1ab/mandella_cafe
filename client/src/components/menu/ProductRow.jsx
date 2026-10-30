import cn from '../../lib/cn.js';
import Image from '../ui/Image.jsx';
import { ChevronLeft } from '../ui/icons.jsx';
import { formatPrice } from '../../lib/format.js';

const ProductRow = ({ product, active = false, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    className={cn(
      'press flex w-full items-stretch gap-3 rounded-[20px] bg-white p-2.5 text-right shadow-card ring-1 transition-colors',
      active ? 'ring-2 ring-teal' : 'ring-line/70'
    )}
  >
    <ChevronLeft className="mt-6 h-4 w-4 shrink-0 text-muted" />
    <div className="flex-1">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[14.5px] font-bold leading-6 text-ink">{product.name}</h3>
          <p className="mt-0.5 text-[11px] leading-5 text-muted">{product.shortDescription}</p>
          <p className="mt-1.5 text-[13px] font-extrabold text-price">{formatPrice(product.price)}</p>
        </div>
        <Image
          src={product.image}
          alt={product.name}
          wrapperClassName="h-[62px] w-[62px] shrink-0 rounded-2xl"
        />
      </div>
    </div>
  </button>
);

export default ProductRow;
