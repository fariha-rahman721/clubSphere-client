import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { User as UserIcon, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);

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
                        ? "font-bold text-orange-700"
                        : "hover:text-orange-900 font-semibold transition"
                }
                to="/"
            >
                Home
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "font-bold text-orange-700"
                        : "hover:text-orange-900 font-semibold transition"
                }
                to="/allClubs"
            >
                Clubs
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "font-bold text-orange-700"
                        : "hover:text-orange-900 font-semibold transition"
                }
                to="/events"
            >
                Events
            </NavLink>
            
             {
            user && <>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "font-bold text-orange-700"
                        : "hover:text-orange-900 font-semibold transition"
                }
                to="/dashboard/myClubs"
            >
                My Clubs
            </NavLink>
            </>
        }
        </>
       
    );
    

    return (
        <div className="navbar sticky top-0 z-50 w-full bg-[#FFAA6E] shadow-sm text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content gap-4 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>

                <NavLink to='/dashboard' className="btn btn-ghost text-xl text-orange-800 font-bold">
                    ClubSphere
                </NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4">
                    {links}
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-3">
                {/* Dropdown before profile */}
                {user && (
                    <div className="dropdown dropdown-end">
                        
                        <label tabIndex={0} className="btn btn-ghost flex items-center gap-1">
                            <span className="w-9 h-9 rounded-full overflow-hidden">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-9 h-9 text-white" />
                                )}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-white text-black rounded-box w-40 mt-1"
                        >
                           <li><NavLink to='/userProfile'>Your Profile</NavLink></li>
                            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                            
                        </ul>
                    </div>
                )}

                {/* Login / Logout button */}
                {user ? (
                    <button onClick={handleLogout} className="btn">
                        Logout
                    </button>
                ) : (
                    <Link to="/auth/login" className="btn">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
