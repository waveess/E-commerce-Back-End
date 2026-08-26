import { useState, useEffect } from 'react';

export default function CategoryForm({
  initialData,
  onSubmit,
  submitLabel,
}) {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    setCategoryName(
      initialData?.category_name || ''
    );
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      category_name: categoryName,
    });

    setCategoryName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) =>
          setCategoryName(e.target.value)
        }
        required
      />

      <button type="submit">
        {submitLabel}
      </button>
    </form>
  );
}