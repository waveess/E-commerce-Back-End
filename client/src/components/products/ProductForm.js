import React, { useEffect, useState } from 'react';
import '../../styles/ProductForm.css';

const emptyProduct = {
  product_name: '',
  price: '',
  stock: '',
  category_id: '',
};

export default function ProductForm({
  initialData = emptyProduct,
  categories = [],
  onSubmit,
  submitLabel = 'Save Product',
}) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData || emptyProduct);
  }, [initialData]);

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
        min="0"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        name="stock"
        type="number"
        min="0"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />

<select
  id="category_id"
  name="category_id"
  value={formData.category_id}
  onChange={handleChange}
  required
>
  <option value="" disabled>
    Select a category
  </option>

  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.category_name}
    </option>
  ))}
</select>
      <button type="submit">
        {submitLabel}
      </button>
    </form>
  );
}