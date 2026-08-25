import React, { useState } from 'react';
import '../../styles/ProductForm.css';

export default function ProductForm({
  initialData = {
    product_name: '',
    price: '',
    stock: '',
    category_id: '',
  },
  onSubmit,
  submitLabel = 'Save Product',
}) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category_id: Number(formData.category_id),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        name="product_name"
        placeholder="Product Name"
        value={formData.product_name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />

      <input
        name="category_id"
        type="number"
        placeholder="Category ID"
        value={formData.category_id}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {submitLabel}
      </button>
    </form>
  );
}