import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      login(res.data.token); 
      toast.success('Login successful');
      navigate('/dashboard'); 
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#ccddea] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl border-2 border-[#2772A0] p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-[#2772A0] text-center">CRM Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 border-2 border-[#2772A0] rounded-md bg-[#e6f0f7] text-[#2772A0] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 border-2 border-[#2772A0] rounded-md bg-[#e6f0f7] text-[#2772A0] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#2772A0] text-white font-bold py-3 rounded-md hover:bg-blue-900 transition duration-300"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600">
          Use your admin credentials to access the CRM dashboard.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
