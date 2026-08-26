export default function CategoryList({
    categories,
    onEdit,
    onDelete,
  }) {
    return (
      <div>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <span>
              {category.category_name}
            </span>
  
            <button
              onClick={() => onEdit(category)}
            >
              Edit
            </button>
  
            <button
              onClick={() =>
                onDelete(category.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }