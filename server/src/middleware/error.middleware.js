import ApiError from '../utils/ApiError.js';
import env from '../config/env.js';

export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`المسار ${req.originalUrl} غير موجود`));
};

const normalizeError = (error) => {
  if (error instanceof ApiError) return error;

  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors).map((item) => item.message);
    return ApiError.unprocessable('بيانات غير صالحة', details);
  }

  if (error.name === 'CastError') {
    return ApiError.badRequest('المعرّف المُرسل غير صالح');
  }

  if (error.code === 11000) {
    return ApiError.conflict('هذا العنصر موجود مسبقاً', Object.keys(error.keyValue || {}));
  }

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return ApiError.unauthorized('جلسة غير صالحة، يرجى تسجيل الدخول من جديد');
  }

  if (error.type === 'entity.parse.failed') {
    return ApiError.badRequest('صيغة JSON غير صحيحة');
  }

  return new ApiError(error.statusCode || 500, error.message || 'خطأ في الخادم');
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  const normalized = normalizeError(error);
  const isServerError = normalized.statusCode >= 500;

  if (isServerError) console.error('[error]', error);

  res.status(normalized.statusCode).json({
    success: false,
    message: isServerError && env.nodeEnv === 'production' ? 'حدث خطأ غير متوقع' : normalized.message,
    ...(normalized.details ? { details: normalized.details } : {}),
    ...(env.nodeEnv === 'development' && isServerError ? { stack: error.stack } : {}),
  });
};
