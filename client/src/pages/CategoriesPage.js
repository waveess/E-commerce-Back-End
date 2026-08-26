import React, { useState } from 'react';

import CategoryForm from '../components/categories/CategoryForm';
import CategoryList from '../components/categories/CategoryList';

import useCategories from '../hooks/useCategories';

export default function CategoriesPage() {
  const {
    categories,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  const [editingCategory, setEditingCategory] =
    useState(null);

  const handleSubmit = async (data) => {
    if (editingCategory) {
      await editCategory(
        editingCategory.id,
        data
      );

      setEditingCategory(null);
    } else {
      await addCategory(data);
    }
  };

  return (
    <div>
      <h1>Category Management</h1>

      <CategoryForm
        initialData={editingCategory}
        onSubmit={handleSubmit}
        submitLabel={
          editingCategory
            ? 'Update Category'
            : 'Add Category'
        }
      />

      <CategoryList
        categories={categories}
        onEdit={setEditingCategory}
        onDelete={removeCategory}
      />
    </div>
  );
}