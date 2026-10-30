import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: 'ضيف مانديلا' },
    phone: { type: String, trim: true, unique: true, sparse: true },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ['guest', 'customer', 'admin'], default: 'guest' },
    isGuest: { type: Boolean, default: false },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

userSchema.methods.toPublic = function toPublic() {
  return {
    id: String(this._id),
    name: this.name,
    phone: this.phone || null,
    role: this.role,
    isGuest: this.isGuest,
  };
};

const User = mongoose.model('User', userSchema);

export default User;
