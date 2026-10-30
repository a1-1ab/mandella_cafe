import { CATEGORY_LABELS, PICKUP, PRODUCTS } from './data.js';

const ORDERS_KEY = 'mandella.mock.orders';
const GUEST = { id: 'guest-1', name: 'ضيف مانديلا', phone: null, role: 'guest', isGuest: true };
const wait = (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));

const readOrders = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const writeOrders = (orders) => localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

const session = () => ({ token: 'mock-guest-token', user: GUEST });

const findProduct = (idOrSlug) =>
  PRODUCTS.find((product) => product.id === idOrSlug || product.slug === idOrSlug);

export const mockAuthApi = {
  guest: async () => {
    await wait();
    return session();
  },
  me: async () => {
    await wait(60);
    return GUEST;
  },
  login: async () => {
    await wait();
    return session();
  },
  register: async () => {
    await wait();
    return session();
  },
};

export const mockProductApi = {
  list: async ({ category = 'all', q = '', featured } = {}) => {
    await wait();
    return PRODUCTS.filter((product) => {
      if (category && category !== 'all' && product.category !== category) return false;
      if (featured === 'true' && !product.isFeatured) return false;
      if (q && !product.name.includes(q.trim())) return false;
      return true;
    });
  },
  get: async (idOrSlug) => {
    await wait(120);
    const product = findProduct(idOrSlug);
    if (!product) throw new Error('المشروب غير موجود');
    return product;
  },
  categories: async () => {
    await wait(80);
    return Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
      value,
      label,
      count:
        value === 'all' ? PRODUCTS.length : PRODUCTS.filter((product) => product.category === value).length,
    }));
  },
};

export const mockOrderApi = {
  create: async ({ items = [], note = '' }) => {
    await wait(420);
    if (!items.length) throw new Error('السلة فارغة، أضف مشروباً أولاً');

    const orderItems = items.map((item) => {
      const product = findProduct(item.productId);
      if (!product) throw new Error('أحد المشروبات لم يعد متوفراً');

      const size = item.size || product.sizes.at(-1).label;
      const unitPrice = product.sizes.find((option) => option.label === size)?.price ?? product.price;
      const quantity = Math.max(1, Number(item.quantity) || 1);

      return {
        name: product.name,
        image: product.image,
        size,
        sugar: item.sugar || product.sugarOptions.at(-1),
        temperature: product.category === 'cold' ? 'بارد' : 'ساخن',
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
      };
    });

    const orders = readOrders();
    const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const order = {
      id: `order-${Date.now()}`,
      orderNumber: `#${1042 + orders.length}`,
      items: orderItems,
      pickup: PICKUP,
      paymentMethod: 'cash',
      subtotal: total,
      fees: 0,
      total,
      note,
      status: 'preparing',
      itemCount: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      createdAt: new Date().toISOString(),
    };

    writeOrders([order, ...orders]);
    return order;
  },
  get: async (id) => {
    await wait(140);
    const order = readOrders().find((entry) => entry.id === id);
    if (!order) throw new Error('الطلب غير موجود');
    return order;
  },
  list: async () => {
    await wait(120);
    return readOrders();
  },
  setStatus: async (id, status) => {
    await wait(80);
    const orders = readOrders().map((order) => (order.id === id ? { ...order, status } : order));
    writeOrders(orders);
    return orders.find((order) => order.id === id);
  },
};
