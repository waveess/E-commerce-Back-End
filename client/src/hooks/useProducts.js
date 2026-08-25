import { useEffect, useState } from 'react';

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';

export default function useProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (product) => {
    await createProduct(product);
    loadProducts();
  };

  const editProduct = async (id, product) => {
    await updateProduct(id, product);
    loadProducts();
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return {
    products,
    addProduct,
    editProduct,
    removeProduct,
  };
}