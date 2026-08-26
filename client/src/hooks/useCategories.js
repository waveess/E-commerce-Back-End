import { useEffect, useState } from 'react';

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (category) => {
    await createCategory(category);
    loadCategories();
  };

  const editCategory = async (id, category) => {
    await updateCategory(id, category);
    loadCategories();
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  return {
    categories,
    addCategory,
    editCategory,
    removeCategory,
  };
}