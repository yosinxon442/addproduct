import { Link } from "react-router-dom";
import useProductStore from "../store/productStore";
import useAuthStore from "../store/authStore";
import "./Header.css";

const Header = () => {
  const { products } = useProductStore();
  const { user, logout } = useAuthStore();
  const likedProductsCount = products.filter((p) => p.liked).length;
  const cartProductsCount = products.filter((p) => p.inCart).length;

  return (
    <header className="header">
      <h1>Online Shop</h1>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/wishlist">Wishlist ({likedProductsCount})</Link>
            <Link to="/cart">Cart ({cartProductsCount})</Link>
            <Link to="/add-product">Add Product</Link>
            <button className="logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;