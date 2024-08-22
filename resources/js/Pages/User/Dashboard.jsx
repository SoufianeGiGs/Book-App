import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import UserNavbar from '../../Components/UserNavbar';
import 'animate.css/animate.min.css';
import FileUploadComponent from './FileUpload';
import StatsModal from '../../Components/StatsModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [barData, setBarData] = useState(null);
  const [timeFrame, setTimeFrame] = useState('day');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = (groupBy) => {
    axios.get(`http://127.0.0.1:8000/api/books-added?groupBy=${groupBy}`)
      .then(response => {
        const data = response.data;
        const labels = data.map(d => {
          if (groupBy === 'day') return d.date;
          if (groupBy === 'month') return `${d.month}/${d.year}`;
          if (groupBy === 'year') return d.year;
        });
        const values = data.map(d => d.total);

        setBarData({
          labels: labels,
          datasets: [
            {
              label: `Books Added Per ${groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}`,
              data: values,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
              hoverBorderColor: 'rgba(255, 99, 132, 1)',
              borderRadius: 5,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(timeFrame);
  }, [timeFrame]);

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(220, 220, 220, 0.3)',
        },
        ticks: {
          color: '#333',
        },
      },
      x: {
        grid: {
          color: 'rgba(220, 220, 220, 0.3)',
        },
        ticks: {
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        titleFont: {
          size: 16,
          family: 'Arial, sans-serif',
        },
        bodyFont: {
          size: 14,
          family: 'Arial, sans-serif',
        },
        footerFont: {
          size: 12,
          family: 'Arial, sans-serif',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <UserNavbar />
      <header className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6 animate__animated animate__fadeInDown">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl animate__animated animate__fadeInUp animate__delay-1s">
            Manage your books, track your activities, and stay up to date with the latest updates.
          </p>
          <p className="text-lg mt-4 animate__animated animate__fadeInUp animate__delay-1s">
            Our platform provides you with all the tools you need to manage your book collection effectively. Explore, organize, and track your collection with ease.
          </p>
          <div className="mt-8">
            <a
              href="/user/book"
              className="bg-white text-red-600 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add a New Book Manually
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
          <div className="md:w-5/12 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">Manage Your Collection</h2>
            <p className="text-gray-600 mt-6 animate__animated animate__fadeInLeft">
              Easily upload, organize, and manage your books in one place. Keep track of everything with ease.
            </p>
            <div className="mt-10">
              <FileUploadComponent />
            </div>
          </div>
          <div className="md:w-5/12 mt-10 md:mt-0 text-center">
            <img src="/images/book2.jpg" alt="Books Illustration" className="w-full max-w-sm mx-auto animate__animated animate__fadeInRight" />
          </div>
        </div>
      </main>

      <section className="bg-white from-white via-red-50 to-white py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-red-700">Your Collection Insights</h2>
    <p className="text-center text-gray-700 mt-4 max-w-3xl mx-auto">
      Delve into your book collection's data like never before. Whether you're tracking the number of books added daily, monthly, or annually, our advanced statistics provide a crystal-clear view of your collection's growth. Uncover trends, pinpoint your most productive months, and gain valuable insights into your book-adding habits.
    </p>
    <div className="text-center mb-8 mt-8">
      <label htmlFor="timeFrame" className="mr-3 font-semibold text-lg text-red-600">
        View by:
      </label>
      <select
        id="timeFrame"
        value={timeFrame}
        onChange={handleTimeFrameChange}
        className="p-3 border border-red-300 rounded-lg text-lg text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
    </div>
    <div className="mt-12 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl flex justify-center items-center w-full" style={{ height: '500px', maxWidth: '800px' }}>
        {barData ? <Bar data={barData} options={barOptions} /> : <p className="text-red-600">Loading...</p>}
      </div>
    </div>
    <div className="mt-8 text-center">
      <button 
        onClick={handleOpenModal}
        className="bg-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110"
      >
        View More Stats
      </button>
      <p className="mt-4 text-gray-700">
        Take your analysis further by exploring more detailed statistics. Customize your view to analyze specific elements of your collection, such as books by author, city, or section.
      </p>
    </div>
  </div>
</section>

<StatsModal isOpen={isModalOpen} onClose={handleCloseModal} />


      <footer className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Harmony. All rights reserved.</p>
          <p className="text-gray-300 text-sm mt-4">
            Your one-stop solution for managing your book collection with efficiency and style.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
