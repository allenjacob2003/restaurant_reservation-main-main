import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  Image: { type: String }, // Path to the uploaded image
});

const Product = mongoose.model('Product', productSchema);

export default Product;