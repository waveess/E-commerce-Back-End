import React from 'react';
import '../../styles/ProductCard.css';

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}) {
  return (
    <div className="product-card">
      <h3>{product.product_name}</h3>

      <p>Price: ${product.price}</p>

      <p>Stock: {product.stock}</p>

      <p>
        Category:{' '}
        {product.category?.category_name || product.category_id}
      </p>

      <div className="product-actions">
        <button onClick={() => onEdit(product)}>
          Edit
        </button>

        <button
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}