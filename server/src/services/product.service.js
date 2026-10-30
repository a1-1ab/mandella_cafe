import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';

const list = async ({ category, q, featured } = {}) => {
  const filter = { isAvailable: true };
  if (category && category !== 'all') filter.category = category;
  if (featured === 'true') filter.isFeatured = true;
  if (q) filter.name = { $regex: q.trim(), $options: 'i' };

  const products = await Product.find(filter).sort({ sortOrder: 1, createdAt: 1 });
  return products.map((product) => ({
    id: String(product._id),
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    category: product.category,
    kind: product.kind,
    price: product.price,
    image: product.image,
    badge: product.badge,
    sizes: product.sizes,
    sugarOptions: product.sugarOptions,
    isFeatured: product.isFeatured,
  }));
};

const getById = async (id) => {
  const product = mongoose.isValidObjectId(id)
    ? (await Product.findById(id)) || (await Product.findOne({ slug: id }))
    : await Product.findOne({ slug: id });

  if (!product) throw ApiError.notFound('المشروب غير موجود');

  return {
    id: String(product._id),
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    category: product.category,
    kind: product.kind,
    price: product.price,
    image: product.image,
    badge: product.badge,
    sizes: product.sizes,
    sugarOptions: product.sugarOptions,
    isFeatured: product.isFeatured,
  };
};

const listCategories = async () => {
  const counts = await Product.aggregate([
    { $match: { isAvailable: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  const labels = { all: 'الكل', hot: 'ساخن', cold: 'بارد', sweets: 'حلويات شامية' };

  return Object.entries(labels).map(([value, label]) => ({
    value,
    label,
    count: value === 'all' ? counts.reduce((sum, item) => sum + item.count, 0) : counts.find((item) => item._id === value)?.count || 0,
  }));
};

const productService = { list, getById, listCategories };

export default productService;
