import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import AdminSidebar from '../Components/AdminSidebar';
import SummaryCard from '../Components/SummaryCard';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const Statistics = ({ 
    total_users, 
    total_books, 
    total_authors, 
    total_cities, 
    users_by_month, 
    books_by_month, 
    active_users, 
    users_by_year, 
    books_by_year, 
    books_by_ville_edition, 
    books_by_section 
}) => {

    const booksByVilleEditionData = {
        labels: books_by_ville_edition.map(data => data.ville_edition),
        datasets: [
            {
                label: 'Books by Ville Edition',
                data: books_by_ville_edition.map(data => data.total),
                backgroundColor: books_by_ville_edition.map(() => `rgba(255, 99, 132, 0.7)`), // Bright pink
            },
        ],
    };

    const usersData = {
        labels: users_by_month.map(data => `${data.year}-${data.month}`),
        datasets: [
            {
                label: 'User Registrations by Month',
                data: users_by_month.map(data => data.total),
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Vibrant blue
            },
        ],
    };

    const booksData = {
        labels: books_by_month.map(data => `${data.year}-${data.month}`),
        datasets: [
            {
                label: 'Books Added by Month',
                data: books_by_month.map(data => data.total),
                backgroundColor: 'rgba(75, 192, 192, 0.7)', // Aqua green
            },
        ],
    };

    const pieData = {
        labels: ['Users', 'Books'],
        datasets: [
            {
                data: [total_users, total_books],
                backgroundColor: [
                    'rgba(255, 87, 51)',   // Aqua green
                    'rgba(241, 219, 53)',   // Orange
                ],  // Purple and orange
            },
        ],
    };

    const usersByYearData = {
        labels: users_by_year.map(data => data.year),
        datasets: [
            {
                label: 'User Registrations by Year',
                data: users_by_year.map(data => data.total),
                backgroundColor: 'rgba(255, 205, 86, 0.7)', // Bright yellow
            },
        ],
    };

    const booksByYearData = {
        labels: books_by_year.map(data => data.year),
        datasets: [
            {
                label: 'Books Added by Year',
                data: books_by_year.map(data => data.total),
                backgroundColor: 'rgba(255, 159, 64, 0.7)', // Bright orange
            },
        ],
    };

    const doughnutData = {
        labels: books_by_ville_edition.map(data => data.ville_edition),
        datasets: [
            {
                data: books_by_ville_edition.map(data => data.total),
                backgroundColor: [
                    'rgba(241, 181, 53)',   // Pink
                    'rgba(216, 53, 241)',   // Blue
                    'rgba(255, 87, 51)',   // Yellow
                    'rgba(53, 241, 81)',   // Aqua green
                    'rgba(232, 229, 250 )',  // Purple
                    'rgba(241, 219, 53)',   // Orange
                ], // Light purple
            },
        ],
    };

    const booksBySectionData = {
        labels: books_by_section.map(data => data.section),
        datasets: [
            {
                label: 'Books by Section',
                data: books_by_section.map(data => data.total),
                backgroundColor: books_by_section.map(() => `rgba(54, 162, 235, 0.7)`), // Blue
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        layout: {
            padding: {
                top: 10,
                left: 10,
                right: 10,
                bottom: 10,
            },
        },
    };
    
    return (
        <div className="flex">
            <div className="fixed top-0 left-0 h-full">
                <AdminSidebar />
            </div>
            <div className="flex-1 ml-64 p-8 overflow-y-auto max-h-screen">
                <div className="bg-gradient-to-r from-red-600 to-yellow-600 p-6 rounded-lg text-white mb-8 shadow-lg">
                    <h1 className="text-3xl font-bold">Application Overview</h1>
                    <p className="text-lg mt-2">Get insights into the application usage with key statistics and trends.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <SummaryCard title="Total Users" value={total_users} icon="users" color="blue" />
                    <SummaryCard title="Total Books" value={total_books} icon="book" color="green" />
                    <SummaryCard title="Total Authors" value={total_authors} icon="pen" color="red" />
                    <SummaryCard title="Total Cities" value={total_cities} icon="city" color="gray" />
                </div>

                {/* Adding Titles and Spacing between categories */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4">User Registrations by Month</h3>
                            <div className="relative" style={{ height: '300px', width: '100%' }}>
                                <Bar data={usersData} options={options} />
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4">Books Added by Month</h3>
                            <div className="relative" style={{ height: '300px', width: '100%' }}>
                                <Bar data={booksData} options={options} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Yearly Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4">User Registrations by Year</h3>
                            <div className="relative" style={{ height: '300px', width: '100%' }}>
                                <Line data={usersByYearData} options={options} />
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4">Books Added by Year</h3>
                            <div className="relative" style={{ height: '300px', width: '100%' }}>
                                <Line data={booksByYearData} options={options} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comparative Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4">Users vs Books</h3>
                            <div className="relative" style={{ height: '300px', width: '100%' }}>
                                <Pie data={pieData} options={options} />
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4">Books by Ville Edition</h3>
                            <div className="relative" style={{ height: '300px', width: '100%' }}>
                                <Doughnut data={doughnutData} options={options} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Section Insights</h2>
                    <div className="grid grid-cols-1">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4">Books by Section</h3>
                            <div className="relative" style={{ height: '300px', width: '100%' }}>
                                <Bar data={booksBySectionData} options={options} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Statistics;
