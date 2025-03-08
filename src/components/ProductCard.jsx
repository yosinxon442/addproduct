import { useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import useAuthStore from '../store/authStore';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { toggleLike, toggleCart, deleteProduct } = useProductStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLike = (id) => {
    toggleLike(id);
  };

  const handleCart = (id) => {
    toggleCart(id);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const renderRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Rating: {renderRating(product.rating)}</p>
      <p>{product.description}</p>
      {user ? (
        <>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
          <button onClick={() => handleEdit(product.id)}>Edit</button>
        </>
      ) : (
        <>
          <button onClick={() => handleLike(product.id)}>
            {product.liked ? 'Unlike' : 'Like'}
          </button>
          <button onClick={() => handleCart(product.id)}>
            {product.inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCard;