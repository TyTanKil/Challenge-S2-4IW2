const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    label: { type: String, required: true }
});

const manufacturerSchema = new mongoose.Schema({
    label: { type: String, required: true }
});

const productImageSchema = new mongoose.Schema({
    content: { type: Buffer, required: true },
    order: { type: Number, required: true }
});

const detailsSchema = new mongoose.Schema({
    label: { type: String, required: true },
    type: { type: String, enum: ['type1', 'type2', 'type3'], required: true },
    group: { type: String }
});

const productDetailsSchema = new mongoose.Schema({
    detail: detailsSchema,
    value: { type: String, required: true }
});

const stockSchema = new mongoose.Schema({
    quantity: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    manufacturer: manufacturerSchema,
    category: categorySchema,
    ref: { type: String, required: true },
    label: { type: String, required: true },
    unit_price: { type: Number, required: true },
    description: { type: String },
    images: [productImageSchema],
    details: [productDetailsSchema],
    stock: stockSchema
});

productSchema.methods.saveToDB = async function () {
    await this.save();
}

module.exports = mongoose.model('product', productSchema);
