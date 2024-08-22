import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

const Login = () => {
  const { errors } = usePage().props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/login', { email, password });
  };

  return (
    <div className="flex h-screen bg-white">
      <div
        className="w-1/2 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/image.png')" }}
      ></div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {errors.email && (
            <div className="bg-red-500 text-white text-center p-2 rounded">
              {errors.email}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 text-center text-white bg-black rounded-lg hover:bg-gray-800"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <a
              href="/auth/google"
              className="flex items-center justify-center w-full py-2 text-center text-white bg-red-500 rounded-lg hover:bg-red-700"
            >
              <img src="/images/google.webp" alt="Google Logo" className="w-5 h-5 mr-2" />
              Login with Google
            </a>
          </div>
          <div className="text-center mt-4">
            <a  
              href="/register"
              className="block w-full py-2 text-center text-black hover:underline"
            >
              Don't have an account? Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
