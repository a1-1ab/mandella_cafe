import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';

const buildOrderNumber = async () => {
  const last = await Order.findOne().sort({ createdAt: -1 }).select('orderNumber');
  const lastNumber = last ? Number(String(last.orderNumber).replace('#', '')) : 1041;
  const next = Number.isFinite(lastNumber) ? lastNumber + 1 : 1042;
  return `#${next}`;
};

const resolveUnitPrice = (product, sizeLabel) => {
  const match = (product.sizes || []).find((size) => size.label === sizeLabel);
  return match ? match.price : product.price;
};

const create = async (userId, { items, note = '', paymentMethod = 'cash' }) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw ApiError.badRequest('السلة فارغة، أضف مشروباً أولاً');
  }

  const ids = items.map((item) => item.productId);
  const invalidId = ids.find((id) => !mongoose.isValidObjectId(id));
  if (invalidId) throw ApiError.badRequest('معرّف مشروب غير صالح');

  const products = await Product.find({ _id: { $in: ids } });
  const productMap = new Map(products.map((product) => [String(product._id), product]));

  const orderItems = items.map((item) => {
    const product = productMap.get(String(item.productId));
    if (!product) throw ApiError.notFound('أحد المشروبات لم يعد متوفراً');

    const quantity = Math.max(1, Number(item.quantity) || 1);
    const size = item.size || product.sizes.at(-1)?.label || 'وسط';
    const sugar = item.sugar || product.sugarOptions.at(-1) || 'بدون سكر';
    const unitPrice = resolveUnitPrice(product, size);

    return {
      product: product._id,
      name: product.name,
      image: product.image,
      size,
      sugar,
      temperature: product.category === 'cold' ? 'بارد' : 'ساخن',
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const fees = 0;

  const order = await Order.create({
    user: userId,
    orderNumber: await buildOrderNumber(),
    items: orderItems,
    paymentMethod,
    subtotal,
    fees,
    total: subtotal + fees,
    note,
    status: 'preparing',
  });

  return order.toPublic();
};

const listForUser = async (userId) => {
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(20);
  return orders.map((order) => order.toPublic());
};

const getById = async (userId, orderId) => {
  if (!mongoose.isValidObjectId(orderId)) throw ApiError.badRequest('معرّف الطلب غير صالح');

  const order = await Order.findById(orderId);
  if (!order) throw ApiError.notFound('الطلب غير موجود');
  if (String(order.user) !== String(userId)) throw ApiError.forbidden('لا يمكنك الوصول لهذا الطلب');

  return order.toPublic();
};

const updateStatus = async (orderId, status, user) => {
  const order = await Order.findById(orderId);
  if (!order) throw ApiError.notFound('الطلب غير موجود');
  if (String(order.user) !== String(user._id) && user.role !== 'admin') {
    throw ApiError.forbidden('لا يمكنك تعديل هذا الطلب');
  }

  order.status = status;
  await order.save();
  return order.toPublic();
};

const orderService = { create, listForUser, getById, updateStatus };

export default orderService;
