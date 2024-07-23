const mongoose = require("mongoose");

const OrderProductSchema = new mongoose.Schema({
  id_order: { type: Number },
  label: { type: String, required: true },
  ref: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
});

const AccountSchema = new mongoose.Schema({
  id: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    account: AccountSchema,
    total_price: { type: Number, required: true },
    order_date: { type: Date },
    order_status: { type: Number, required: true },
    delivery_date: { type: Date },
    delivery_status: { type: Number, required: true },
    Order_products: [OrderProductSchema],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = {
  Orders,
};
