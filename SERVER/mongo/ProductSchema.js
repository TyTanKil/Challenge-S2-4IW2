const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  id: { type: Number },
  label: { type: String, required: true },
});

const ManufacturerSchema = new mongoose.Schema({
  id: { type: Number },
  label: { type: String, required: true },
});

const ProductImageSchema = new mongoose.Schema({
  id: { type: Number },
  url: { type: String, required: true },
});

const StockSchema = new mongoose.Schema({
  id: { type: Number },
  quantity: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  manufacturer: ManufacturerSchema,
  category: CategorySchema,
  ref: { type: String, required: true },
  label: { type: String, required: true },
  unit_price: { type: Number, required: true },
  description: { type: String },
  stock: StockSchema,
  images: [ProductImageSchema],
});

const Products = mongoose.model("Product", ProductSchema);

module.exports = {
  Products,
};
