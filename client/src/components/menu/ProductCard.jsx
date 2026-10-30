import Card from '../ui/Card.jsx';
import Image from '../ui/Image.jsx';
import { Plus } from '../ui/icons.jsx';
import { formatPrice } from '../../lib/format.js';

const ProductCard = ({ product, onOpen, onAdd }) => (
  <Card tone="white" padded="none" className="overflow-hidden">
    <button type="button" onClick={onOpen} className="block w-full text-right">
      <Image src={product.image} alt={product.name} wrapperClassName="h-[132px] w-full" />
    </button>
    <div className="flex items-start gap-2 px-3.5 pb-3.5 pt-3">
      <div className="flex-1">
        <h3 className="text-[14px] font-bold text-ink">{product.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{product.shortDescription}</p>
        <p className="mt-1.5 text-[13px] font-extrabold text-price">{formatPrice(product.price)}</p>
      </div>
      <button
        type="button"
        aria-label={`أضف ${product.name}`}
        onClick={onAdd}
        className="press mt-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-white shadow-card"
      >
        <Plus />
      </button>
    </div>
  </Card>
);

export default ProductCard;
