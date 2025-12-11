import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    const links = <>
    <NavLink  className={({ isActive }) =>
                    isActive
                        ? "font-bold text-orange-700"
                        : "hover:text-orange-900 font-semibold transition"
                } to='/'>Home</NavLink>
    <NavLink  className={({ isActive }) =>
                    isActive
                        ? "font-bold text-orange-700"
                        : "hover:text-orange-900 font-semibold transition"
                } to='/allClubs'>Clubs</NavLink>
    <NavLink  className={({ isActive }) =>
                    isActive
                        ? "font-bold text-orange-700"
                        : "hover:text-orange-900 font-semibold transition"
                } to='/events'>Events</NavLink>
    </>
    return (
        <div className="navbar sticky top-0 z-50 w-full bg-[#FFAA6E] shadow-sm text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content gap-4 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-orange-800 font-bold">Clubshere</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;