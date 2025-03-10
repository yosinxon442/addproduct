import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const API_KEY = "56ad1431478441da885795f2cac84b42";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const verifyEmail = async (email) => {
    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`
      );

      console.log("Email verification response:", response.data);

      return (
        response.data.is_valid_format.value &&
        response.data.deliverability === "DELIVERABLE"
      );
    } catch (error) {
      console.error("Email verification error:", error);
      alert('Emailni tekshirishda xatolik yuz berdi. Iltimos, qayta urinib koring.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Iltimos, togri email manzilini kiriting.');
      return;
    }

    const isEmailValid = await verifyEmail(email);
    if (!isEmailValid) {
      alert('Bu email manzili notogri yoki mavjud emas.');
      return;
    }

    if (email === 'user@example.com' && password === 'password') {
      login({ email });
      alert('Tizimga muvaffaqiyatli kirdingiz!');
      navigate('/');
    } else {
      alert('Email yoki parol notogri');
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
