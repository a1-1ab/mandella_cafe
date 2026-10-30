import authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess, sendCreated } from '../utils/response.js';

const register = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;
  if (!phone || !password) throw ApiError.badRequest('رقم الهاتف وكلمة المرور مطلوبان');
  if (String(password).length < 6) throw ApiError.badRequest('كلمة المرور يجب أن تكون 6 أحرف على الأقل');

  const result = await authService.register({ name, phone, password });
  return sendCreated(res, { message: 'تم إنشاء الحساب بنجاح', data: result });
});

const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) throw ApiError.badRequest('رقم الهاتف وكلمة المرور مطلوبان');

  const result = await authService.login({ phone, password });
  return sendSuccess(res, { message: 'تم تسجيل الدخول بنجاح', data: result });
});

const guest = asyncHandler(async (req, res) => {
  const result = await authService.createGuest();
  return sendCreated(res, { message: 'تم بدء جلسة ضيف', data: result });
});

const me = asyncHandler(async (req, res) => {
  const profile = await authService.getProfile(req.user._id);
  return sendSuccess(res, { message: 'بيانات المستخدم', data: profile });
});

const authController = { register, login, guest, me };

export default authController;
