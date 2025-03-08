import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const { products, updateProduct } = useProductStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [rating, setRating] = useState(product?.rating || 0);
  const [description, setDescription] = useState(product?.description || '');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setRating(product.rating);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !rating || !description) return;

    updateProduct(Number(id), { name, price, rating, description });
    navigate('/');
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;