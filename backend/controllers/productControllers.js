import productModel from "../models/productModels.js"
import { v2 as cloudinary } from "cloudinary"

const addproduct = async (req, res) => {
   try {
      const { name, price, description, category } = req.body;
      const image = req.file;  // Single file upload, accessed via req.file

      let imageUrl = "";

      if (image) {
         // Construct the relative path to the uploaded image
         imageUrl = image.filename;  // Store the relative path in the database
      } else {
         imageUrl = "https://via.placeholder.com/150";  // Default image URL if no image is uploaded
      }

      // Prepare the product data to be saved
      const productData = {
         name,
         description,
         category,
         price: Number(price),
         Image: imageUrl,  // Store the image URL (relative path) in the database
         date: Date.now()
      };

      // Create and save the product document
      const product = new productModel(productData);
      await product.save();

      // Send a success response
      res.json({ success: true, message: "Product added successfully", product });

   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Product not added" });
   }
};

const listproducts = async (req, res) => {
   try {
      const products = await productModel.find({})
      res.json({ success: true, products })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: "Error fetching products" })
   }
}


const removeproduct = async (req, res) => {
   try {
      await productModel.findByIdAndDelete(req.body._id)
      res.json({ success: true, message: "Product removed successfully" })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: "Error removing product" })

   }

}

const singleproduct = async (req, res) => {

}

const deleteMenuItem = async (req, res) => {
   const prodId = req.params.id;
   try {
      const result = await productModel.findByIdAndDelete(prodId)
      if (result) {
         return res.status(200).json({ message: "Menu item deleted successfully" })
      }
   } catch (error) {
      return res.status(500).json({ message: "Error deleting menu item" })
   }
}

export { addproduct, listproducts, removeproduct, singleproduct, deleteMenuItem }