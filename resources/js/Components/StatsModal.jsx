import React, { useState, useEffect } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsModal = ({ isOpen, onClose }) => {
  const [selectedElement, setSelectedElement] = useState('author');
  const [barData, setBarData] = useState(null);

  const fetchData = async () => {
    try {
      let response;

      switch (selectedElement) {
        case 'author':
          response = await axios.get('/api/statistics/author');
          break;
        case 'city':
          response = await axios.get('/api/statistics/city');
          break;
        case 'section':
          response = await axios.get('/api/statistics/section');
          break;
        case 'year':
          response = await axios.get('/api/statistics/year');
          break;
        default:
          break;
      }

      const data = response.data;

      const labels = data.map(d => d[selectedElement]);
      const values = data.map(d => d.total);

      setBarData({
        labels: labels,
        datasets: [
          {
            label: `Books Added by ${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)}`,
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleElementChange = (e) => {
    setSelectedElement(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [selectedElement, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Choose Stats to View</h2>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-lg text-gray-700">Select Element:</label>
          <select
            value={selectedElement}
            onChange={handleElementChange}
            className="p-3 border border-gray-300 rounded-lg w-full text-lg"
          >
            <option value="author">Author</option>
            <option value="city">City</option>
            <option value="section">Section</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="mb-6">
          {barData ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Bar data={barData} />
            </div>
          ) : (
            <p className="text-center text-gray-600">No data to display.</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
