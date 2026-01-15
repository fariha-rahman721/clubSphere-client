import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { User as UserIcon, ChevronDown, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Successfully logged out"))
            .catch((error) => toast.error(error.message));
    };

    const links = (
        <>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `font-bold ${darkMode ? 'text-yellow-400' : 'text-orange-700'}`
                        : `hover:${darkMode ? 'text-yellow-300' : 'text-orange-900'} font-semibold transition-colors`
                }
                to="/"
            >
                Home
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `font-bold ${darkMode ? 'text-yellow-400' : 'text-orange-700'}`
                        : `hover:${darkMode ? 'text-yellow-300' : 'text-orange-900'} font-semibold transition-colors`
                }
                to="/allClubs"
            >
                Clubs
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `font-bold ${darkMode ? 'text-yellow-400' : 'text-orange-700'}`
                        : `hover:${darkMode ? 'text-yellow-300' : 'text-orange-900'} font-semibold transition-colors`
                }
                to="/events"
            >
                Events
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `font-bold ${darkMode ? 'text-yellow-400' : 'text-orange-700'}`
                        : `hover:${darkMode ? 'text-yellow-300' : 'text-orange-900'} font-semibold transition-colors`
                }
                to="/blogs"
            >
                Blogs
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `font-bold ${darkMode ? 'text-yellow-400' : 'text-orange-700'}`
                        : `hover:${darkMode ? 'text-yellow-300' : 'text-orange-900'} font-semibold transition-colors`
                }
                to="/support"
            >
                Support
            </NavLink>

            {user && (
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? `font-bold ${darkMode ? 'text-yellow-400' : 'text-orange-700'}`
                            : `hover:${darkMode ? 'text-yellow-300' : 'text-orange-900'} font-semibold transition-colors`
                    }
                    to="/dashboard/myClubs"
                >
                    My Clubs
                </NavLink>
            )}
        </>
    );

    // Dark mode state
    const [darkMode, setDarkMode] = useState(false);


    // Apply/remove dark class to html
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`navbar section sticky top-0 z-50 w-full bg-[#FFAA6E] dark:bg-gray-800 shadow-sm text-white px-3 p-5 sm:px-6 transition-colors ${darkMode ? 'bg-gray-900 text-gray-100 hover:text-orange-50' : 'bg-[#FFAA6E] text-white'}`}>


            {/* LEFT */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-white dark:bg-gray-700 text-black dark:text-gray-100 shadow gap-3 p-4"
                    >
                        {links}
                    </ul>
                </div>

                <NavLink
                    to="/"
                    className={`btn btn-ghost text-lg sm:text-xl font-bold transition-colors
            ${darkMode ? 'text-yellow-400' : 'text-orange-800'}`}
                >
                    ClubSphere
                </NavLink>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-6 text-sm lg:text-base">
                    {links}
                </ul>
            </div>


            {/* RIGHT */}
            <div className="navbar-end flex items-center gap-2 sm:gap-3">

                {/* Dark mode toggle button */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* User / Login */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost flex items-center gap-1 px-2">
                            <span className="w-9 h-9 rounded-full overflow-hidden">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserIcon className="w-9 h-9 text-white" />
                                )}
                            </span>
                            <ChevronDown className="w-4 h-4 hidden sm:block" />
                        </label>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-white dark:bg-gray-700 text-black dark:text-gray-100 rounded-box w-44"
                        >
                            <li><NavLink to="/userProfile">Your Profile</NavLink></li>
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                            <li><NavLink to="/support">Support</NavLink></li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/auth/login" className="btn btn-sm sm:btn-md">
                        Login
                    </Link>
                )}
            </div>


        </div>
    );
};

export default Navbar;
