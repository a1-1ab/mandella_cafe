import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    sugar: { type: String, required: true },
    temperature: { type: String, default: 'ساخن' },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    orderNumber: { type: String, required: true, unique: true },
    items: {
      type: [orderItemSchema],
      validate: (value) => Array.isArray(value) && value.length > 0,
    },
    pickup: {
      label: { type: String, default: 'استلام من المقهى' },
      address: { type: String, default: 'مانديلا، دمشق' },
      eta: { type: String, default: '١٨–٢٨ دقيقة' },
    },
    paymentMethod: { type: String, enum: ['cash'], default: 'cash' },
    subtotal: { type: Number, required: true, min: 0 },
    fees: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    note: { type: String, default: '' },
    status: {
      type: String,
      enum: ['received', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'preparing',
    },
  },
  { timestamps: true }
);

orderSchema.methods.toPublic = function toPublic() {
  return {
    id: String(this._id),
    orderNumber: this.orderNumber,
    items: this.items.map((item) => ({
      productId: String(item.product),
      name: item.name,
      image: item.image,
      size: item.size,
      sugar: item.sugar,
      temperature: item.temperature,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal,
    })),
    pickup: {
      label: this.pickup.label,
      address: this.pickup.address,
      eta: this.pickup.eta,
    },
    paymentMethod: this.paymentMethod,
    subtotal: this.subtotal,
    fees: this.fees,
    total: this.total,
    note: this.note,
    status: this.status,
    itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0),
    createdAt: this.createdAt,
  };
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
