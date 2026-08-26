import React, { useState } from 'react';

import ProductForm from '../components/products/ProductForm';
import ProductList from '../components/products/ProductList';

import useProducts from '../hooks/useProducts';

import '../styles/ProductsPage.css';

export default function ProductsPage() {
  const {
    products,
    categories,
    addProduct,
    editProduct,
    removeProduct,
  } = useProducts();

  const [editingProduct, setEditingProduct] =
    useState(null);

  const handleSubmit = async (data) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      await addProduct(data);
    }
  };

  return (
    <div className="products-page">
      <h1>Products Dashboard</h1>

      <ProductForm
        initialData={
          editingProduct || undefined
        }
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel={
          editingProduct
            ? 'Update Product'
            : 'Add Product'
        }
      />

      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={removeProduct}
      />
    </div>
  );
}