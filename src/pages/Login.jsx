import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const API_KEY = "56ad1431478441da885795f2cac84b42"; // AbstractAPI kaliti

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // Email formatini tekshirish (regex orqali)
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // AbstractAPI orqali emailni tekshirish
  const verifyEmail = async (email) => {
    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`
      );

      console.log("Email verification response:", response.data); // Debug uchun

      return (
        response.data.is_valid_format.value &&
        response.data.deliverability === "DELIVERABLE"
      );
    } catch (error) {
      console.error("Email verification error:", error);
      alert('Emailni tekshirishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email formatini tekshirish
    if (!validateEmail(email)) {
      alert('Iltimos, to‘g‘ri email manzilini kiriting.');
      return;
    }

    // API orqali emailni tekshirish
    const isEmailValid = await verifyEmail(email);
    if (!isEmailValid) {
      alert('Bu email manzili noto‘g‘ri yoki mavjud emas.');
      return;
    }

    // Email to‘g‘ri bo‘lsa, parolni tekshirish
    if (email === 'user@example.com' && password === 'password') {
      login({ email });
      alert('Tizimga muvaffaqiyatli kirdingiz!');
      navigate('/');
    } else {
      alert('Email yoki parol noto‘g‘ri!');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
