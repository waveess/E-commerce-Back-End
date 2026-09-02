import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <h1>E-Commerce Admin Dashboard</h1>

      <div className="home-navigation">
        <Link to="/products" className="navigation-card">
          <span className="navigation-card-icon">🛍️</span>
          <span className="navigation-card-title">Products</span>
          <span className="navigation-card-description">
            Browse and manage products
          </span>
          <span className="navigation-card-action">Browse Products →</span>
        </Link>

        <Link to="/categories" className="navigation-card">
          <span className="navigation-card-icon">🗂️</span>
          <span className="navigation-card-title">Categories</span>
          <span className="navigation-card-description">
            Explore and manage categories
          </span>
          <span className="navigation-card-action">View Categories →</span>
        </Link>
      </div>
    </div>
  );
}