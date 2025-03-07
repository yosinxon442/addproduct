import { Link } from "react-router-dom";
import useProductStore from "../store/productStore";
import "./Header.css";

const Header = () => {
  const { products } = useProductStore();
  const likedProductsCount = products.filter((p) => p.liked).length;
  const cartProductsCount = products.filter((p) => p.inCart).length;

  return (
    <header className="header">
      <h1>Online Shop</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist ({likedProductsCount})</Link>
        <Link to="/cart">Cart ({cartProductsCount})</Link>
        <Link to="/add-product">Add Product</Link>
      </nav>
    </header>
  );
};

export default Header;