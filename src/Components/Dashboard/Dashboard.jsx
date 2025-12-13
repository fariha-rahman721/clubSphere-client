import React from 'react';
import { Link } from 'react-router';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-11/12 mx-auto grid grid-cols-12 gap-4 py-6">

                {/* Sidebar */}
                <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-xl font-bold text-orange-600 mb-6">
                        Dashboard
                    </h2>

                    <ul className="menu gap-2">
                        <li>
                            <Link className="font-semibold">Overview</Link>
                        </li>
                        <li>
                            <Link className="font-semibold">My Clubs</Link>
                        </li>
                        <li>
                            <Link className="font-semibold">Events</Link>
                        </li>
                        <li>
                            <Link className="font-semibold">Payments</Link>
                        </li>
                        <li>
                            <Link className="font-semibold text-red-500">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="col-span-12 md:col-span-9 lg:col-span-10 bg-white rounded-xl shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        Welcome to Dashboard 👋
                    </h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="stat bg-orange-100 rounded-xl">
                            <div className="stat-title">Total Clubs</div>
                            <div className="stat-value text-orange-600">12</div>
                        </div>

                        <div className="stat bg-orange-100 rounded-xl">
                            <div className="stat-title">Total Members</div>
                            <div className="stat-value text-orange-600">340</div>
                        </div>

                        <div className="stat bg-orange-100 rounded-xl">
                            <div className="stat-title">My Events</div>
                            <div className="stat-value text-orange-600">25</div>
                        </div>

                        <div className="stat bg-orange-100 rounded-xl">
                            <div className="stat-title">Payments</div>
                            <div className="stat-value text-orange-600">$1,200</div>
                        </div>
                    </div>

                    {/* Content Box */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-600">
                            This area will change based on your role (Admin / Manager / Member).
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
