import useProductStore from "../store/productStore";
import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

const Wishlist = () => {
  const { products } = useProductStore();
  const likedProducts = products.filter((p) => p.liked);

  return (
    <div className="wishlist">
      {likedProducts.length > 0 ? (
        likedProducts.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>No liked products!</p>
      )}
    </div>
  );
};

export default Wishlist;