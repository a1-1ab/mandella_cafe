import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, enum: ['hot', 'cold', 'sweets'], required: true },
    kind: { type: String, default: 'خلطة الدار · ساخن' },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    badge: { type: String, default: '' },
    sizes: { type: [sizeSchema], default: [] },
    sugarOptions: { type: [String], default: ['عادي', 'خفيف', 'بدون سكر'] },
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
