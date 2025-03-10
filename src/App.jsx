import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Sarlavha komponenti
import Home from './pages/Home'; // Bosh sahifa
import Wishlist from './pages/Wishlist'; // Sevimlilar sahifasi
import Cart from './pages/Cart'; // Savat sahifasi
import AddProduct from './pages/AddProduct'; // Mahsulot qo'shish sahifasi
import Login from './pages/Login'; // Kirish sahifasi
import Register from './pages/Register'; // Ro'yxatdan o'tish sahifasi
import EditProduct from './pages/EditProduct'; // Mahsulotni tahrirlash sahifasi
import Profile from './pages/Profile'; // Profil sahifasi
import ProtectedRoute from './components/ProtectedRoute'; // Himoyalangan yo'l komponenti
import './App.css'; // Asosiy CSS fayli

const App = () => {
  return (
    <Router>
      {/* Sarlavha komponenti (har bir sahifada ko'rinadi) */}
      <Header />

      {/* Sahifalar marshrutlari */}
      <Routes>
        {/* Bosh sahifa */}
        <Route path="/" element={<Home />} />

        {/* Kirish sahifasi */}
        <Route path="/login" element={<Login />} />

        {/* Ro'yxatdan o'tish sahifasi */}
        <Route path="/register" element={<Register />} />

        {/* Sevimlilar sahifasi (himoyalangan) */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* Savat sahifasi (himoyalangan) */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Mahsulot qo'shish sahifasi (himoyalangan) */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        {/* Mahsulotni tahrirlash sahifasi (himoyalangan) */}
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* Profil sahifasi (himoyalangan) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;