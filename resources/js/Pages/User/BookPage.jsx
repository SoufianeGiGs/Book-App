import React from 'react';
import MultiStepForm from './Book/MultiStepForm';
import { usePage } from '@inertiajs/inertia-react';

const BookPage = () => {
  const { auth } = usePage().props;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <div className="absolute top-4 left-4">
        <a href={`/user/user-dashboard/${auth.user.id}`} className="inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
          Go to Dashboard
        </a>
      </div>
      <div className="w-full max-w-4xl">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default BookPage;
