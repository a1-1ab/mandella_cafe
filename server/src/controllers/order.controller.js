import orderService from '../services/order.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendCreated } from '../utils/response.js';

const create = asyncHandler(async (req, res) => {
  const { items, note, paymentMethod } = req.body;
  const order = await orderService.create(req.user._id, { items, note, paymentMethod });
  return sendCreated(res, { message: 'تم تأكيد الطلب', data: order });
});

const list = asyncHandler(async (req, res) => {
  const orders = await orderService.listForUser(req.user._id);
  return sendSuccess(res, { message: 'طلباتك', data: orders, meta: { count: orders.length } });
});

const detail = asyncHandler(async (req, res) => {
  const order = await orderService.getById(req.user._id, req.params.id);
  return sendSuccess(res, { message: 'تفاصيل الطلب', data: order });
});

const updateStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateStatus(req.params.id, req.body.status, req.user);
  return sendSuccess(res, { message: 'تم تحديث حالة الطلب', data: order });
});

const orderController = { create, list, detail, updateStatus };

export default orderController;
