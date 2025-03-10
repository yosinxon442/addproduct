import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const API_KEY = "56ad1431478441da885795f2cac84b42";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      setError('Emailni tekshirishda xatolik yuz berdi. Iltimos, qayta urinib koring.');
      alert('Emailni tekshirishda xatolik yuz berdi. Iltimos, qayta urinib koring.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      const errorMessage = 'Iltimos, to‘g‘ri email manzilini kiriting.';
      setError(errorMessage);
      alert(errorMessage);
      return;
    }

    const isEmailValid = await verifyEmail(email);
    if (!isEmailValid) {
      const errorMessage = 'Bu email manzili notogri yoki ishlatilmaydi.';
      setError(errorMessage);
      alert(errorMessage);
      return;
    }

    login({ email });
    alert('Royxatdan muvaffaqiyatli otdingiz!');
    navigate('/');
  };

  return (
    <div className="register">
      <h2>Register</h2>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
