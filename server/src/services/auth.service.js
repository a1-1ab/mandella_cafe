import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { signToken } from '../utils/token.js';

const SALT_ROUNDS = 10;

const withToken = (user) => ({ token: signToken(user), user: user.toPublic() });

const register = async ({ name, phone, password }) => {
  const existing = await User.findOne({ phone });
  if (existing && !existing.isGuest) throw ApiError.conflict('رقم الهاتف مستخدم مسبقاً');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  if (existing) {
    existing.name = name || existing.name;
    existing.passwordHash = passwordHash;
    existing.role = 'customer';
    existing.isGuest = false;
    await existing.save();
    return withToken(existing);
  }

  const user = await User.create({
    name: name || 'عميل مانديلا',
    phone,
    passwordHash,
    role: 'customer',
    isGuest: false,
  });

  return withToken(user);
};

const login = async ({ phone, password }) => {
  const user = await User.findOne({ phone }).select('+passwordHash');
  if (!user || !user.passwordHash) throw ApiError.unauthorized('رقم الهاتف أو كلمة المرور غير صحيحة');

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) throw ApiError.unauthorized('رقم الهاتف أو كلمة المرور غير صحيحة');

  return withToken(user);
};

const createGuest = async () => {
  const user = await User.create({ isGuest: true, role: 'guest' });
  return withToken(user);
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('المستخدم غير موجود');
  return user.toPublic();
};

const authService = { register, login, createGuest, getProfile };

export default authService;
