import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name) validationErrors.name = 'Name is required';
    if (!email) validationErrors.email = 'Email is required';
    if (!password) validationErrors.password = 'Password is required';
    if (password !== passwordConfirmation) validationErrors.passwordConfirmation = 'Passwords do not match';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    Inertia.post('/register', { name, email, password, password_confirmation: passwordConfirmation });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
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
          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.passwordConfirmation && <p className="text-red-500 text-sm">{errors.passwordConfirmation}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-center text-white bg-black rounded-lg hover:bg-gray-800"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <a
            href="/auth/google"
            className="flex items-center justify-center w-full py-2 text-center text-white bg-red-500 rounded-lg hover:bg-red-700"
          >
            <img src="/images/google.webp" alt="Google Logo" className="w-5 h-5 mr-2" />
            Register with Google
          </a>
        </div>
        <div className="text-center mt-4">
          <a
            href="/login"
            className="block w-full py-2 text-center text-black hover:underline"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
