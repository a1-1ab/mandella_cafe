import productService from '../services/product.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

const list = asyncHandler(async (req, res) => {
  const { category, q, featured } = req.query;
  const products = await productService.list({ category, q, featured });
  return sendSuccess(res, { message: 'قائمة المشروبات', data: products, meta: { count: products.length } });
});

const detail = asyncHandler(async (req, res) => {
  const product = await productService.getById(req.params.id);
  return sendSuccess(res, { message: 'تفاصيل المشروب', data: product });
});

const categories = asyncHandler(async (req, res) => {
  const listCategories = await productService.listCategories();
  return sendSuccess(res, { message: 'التصنيفات', data: listCategories });
});

const productController = { list, detail, categories };

export default productController;
