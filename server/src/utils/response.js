export const sendSuccess = (res, { statusCode = 200, message = 'تمت العملية بنجاح', data = null, meta = null } = {}) => {
  const payload = { success: true, message, data };
  if (meta) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

export const sendCreated = (res, options) => sendSuccess(res, { statusCode: 201, ...options });
