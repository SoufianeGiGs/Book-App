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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MoreStatsPage = () => {
  const [barData, setBarData] = useState(null);
  const [filter, setFilter] = useState('author'); // Default filter
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  // Fetch options based on the filter type (author, city, section)
  const fetchFilterOptions = () => {
    axios.get(`http://127.0.0.1:8000/api/${filter}-options`)
      .then(response => {
        setFilterOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching filter options:', error);
      });
  };

  // Fetch chart data based on the selected option
  const fetchData = () => {
    if (!selectedOption) return;

    axios.get(`http://127.0.0.1:8000/api/books-by-${filter}`, { params: { filter: selectedOption } })
      .then(response => {
        const data = response.data;
        const labels = data.map(d => d.label);
        const values = data.map(d => d.total);

        setBarData({
          labels: labels,
          datasets: [
            {
              label: `Books by ${filter.charAt(0).toUpperCase() + filter.slice(1)}`,
              data: values,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
              hoverBorderColor: 'rgba(54, 162, 235, 1)',
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
    fetchFilterOptions();
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedOption(''); // Reset selected option
    setBarData(null); // Clear the chart
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
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
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6">Customize Your Statistics</h1>
          <p className="text-xl">
            Choose the criteria below to view specific statistics.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <div className="mb-4">
            <label htmlFor="filter" className="block text-lg font-semibold mb-2">Choose a filter:</label>
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="p-3 border border-gray-300 rounded-lg text-lg w-full"
            >
              <option value="author">Author</option>
              <option value="city">City</option>
              <option value="section">Section</option>
            </select>
          </div>

          <div>
            <label htmlFor="option" className="block text-lg font-semibold mb-2">Choose a specific {filter}:</label>
            <select
              id="option"
              value={selectedOption}
              onChange={handleOptionChange}
              className="p-3 border border-gray-300 rounded-lg text-lg w-full"
              disabled={!filterOptions.length}
            >
              <option value="" disabled>Select an option</option>
              {filterOptions.map(option => (
                <option key={option.id} value={option.name}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-white p-8 rounded-lg shadow-xl flex justify-center items-center w-full" style={{ height: '500px', maxWidth: '800px' }}>
            {barData ? <Bar data={barData} options={barOptions} /> : <p>Select an option to view the chart</p>}
          </div>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Harmony. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MoreStatsPage;
