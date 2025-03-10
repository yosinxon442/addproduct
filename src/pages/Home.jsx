import useProductStore from "../store/productStore";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const { products } = useProductStore();

  return (
    <div className="home">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;