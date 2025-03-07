import { useState } from "react";
import useProductStore from "../store/productStore";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const addProduct = useProductStore((state) => state.addProduct);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !rating || !description) return;
    
    addProduct({ id: Date.now(), name, price, rating, description });
    navigate("/");
  };

  return (
    <div className="add-product">
      <h2>Mahsulot qo‘shish</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mahsulot nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Narxi"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reyting (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
        <textarea
          placeholder="Mahsulot tavsifi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Qo‘shish</button>
      </form>
    </div>
  );
}

export default AddProduct;