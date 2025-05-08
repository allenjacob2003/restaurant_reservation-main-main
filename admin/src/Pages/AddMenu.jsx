import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';

const AddMenu = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);

      if (image) formData.append('image', image);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token, // Ensure the token is passed correctly
        },
      });

      if (response.data.success) {
        toast.success('Menu Added Successfully');
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding menu:', error);
      toast.error('Failed to add menu. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-1" encType="multipart/form-data">
        <div>
          <p className="text-[22px]">Upload Image</p>
          <div>
            <label htmlFor="image">
              <img src={!image ? '+' : URL.createObjectURL(image)} alt="" />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2 text-[22px]">Product Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] p-4 border border-gray-300 rounded"
            type="text"
            placeholder="Enter Product Name"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2 text-[22px]">Product Description</p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] p-4 border border-gray-300 rounded"
            type="text"
            placeholder="Enter Product Description"
            required
          />
        </div>

        <div className="flex flex-wrap gap-4 w-full">
          <div className="min-w-[200px]">
            <p className="mb-2 text-[22px]">Product Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full max-w-[500px] p-3 border border-gray-300 text-[16px] rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Spaghetti">Spaghetti</option>
              <option value="Pizza">Pizza</option>
              <option value="Rice">Rice</option>
              <option value="Noodeles">Noodeles</option>
              <option value="Chicken">Chicken</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-[22px]">Product Price</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="40"
              className="w-full max-w-[120px] p-4 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <button type="submit" className="mt-6 px-20 py-3 bg-amber-500 rounded hover:opacity-90">
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;