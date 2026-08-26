import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<ProductsPage />}
        />

        {/* Categories */}
        <Route
          path="/categories"
          element={<CategoriesPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;