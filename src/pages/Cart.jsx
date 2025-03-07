import useProductStore from "../store/productStore";
import ProductCard from "../components/ProductCard";
import "./Cart.css";

const Cart = () => {
  const { products } = useProductStore();
  const cartProducts = products.filter((p) => p.inCart);
  const totalPrice = cartProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="cart">
      {cartProducts.length > 0 ? (
        <>
          <div className="cart-products">
            {cartProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <h2>Total Price: ${totalPrice}</h2>
        </>
      ) : (
        <p>No products in cart!</p>
      )}
    </div>
  );
};

export default Cart;