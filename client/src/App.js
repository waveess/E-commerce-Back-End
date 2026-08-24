import React, { useEffect, useState } from 'react';
import { getProducts, getCategories, getTags } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStoreData = async () => {
      try {
        const [productsData, categoriesData, tagsData] = await Promise.all([
          getProducts(),
          getCategories(),
          getTags(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (err) {
        console.error('Store data error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStoreData();
  }, []);

  if (loading) {
    return <h1>Loading store...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <h1>E-Commerce Store</h1>

      <section>
        <h2>Products</h2>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.Product_name} — ${product.price}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Categories</h2>

        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.category_name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Tags</h2>

        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              {tag.tag_name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;