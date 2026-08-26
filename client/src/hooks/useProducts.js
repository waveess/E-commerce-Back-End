import { useEffect, useState } from 'react';

import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Unable to load products.');
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      console.log('Categories loaded:', data);

      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setError('Unable to load categories.');
    }
  };

  const loadData = async () => {
    setLoading(true);

    await Promise.all([
      loadProducts(),
      loadCategories(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addProduct = async (product) => {
    await createProduct(product);
    await loadProducts();
  };

  const editProduct = async (id, product) => {
    await updateProduct(id, product);
    await loadProducts();
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    await loadProducts();
  };

  return {
    products,
    categories,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
  };
}