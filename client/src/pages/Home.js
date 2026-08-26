import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>E-Commerce Admin Dashboard</h1>

      <div>
        <Link to="/products">
          <button>
            Products
          </button>
        </Link>

        <Link to="/categories">
          <button>
            Categories
          </button>
        </Link>
      </div>
    </div>
  );
}