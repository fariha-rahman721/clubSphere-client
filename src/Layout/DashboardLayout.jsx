import React from 'react';
import { NavLink, Link, Outlet } from 'react-router';
import { SiSamsclub } from "react-icons/si";
import { MdCreateNewFolder, MdEventAvailable, MdRememberMe } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import UseRole from '../Components/Hooks/Userole';
import Loading from '../Components/Loading';

const DashboardLayout = () => {
    const [role, isRoleLoading] = UseRole()

    const isAdmin = role === 'Admin'
    const isManager = role === 'Club Manager'
    const isMember = role === 'Member'

    if (isRoleLoading) {
        return <Loading />
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="size-4">
                            <path d="M4 4h16v16H4z" />
                            <path d="M9 4v16" />
                            <path d="M14 10l2 2-2 2" />
                        </svg>
                    </label>
                    <div className="px-4 text-orange-500 font-bold">
                        {role} Dashboard
                    </div>
                </nav>

                <Outlet />
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col bg-base-200 w-64">
                    <ul className="menu w-full grow">

                        {/* Home */}
                        <li>
                            <Link to="/" className="text-orange-600 font-semibold flex gap-2">
                                <SiSamsclub className="size-4" />
                                Homepage
                            </Link>
                        </li>

                        {/* ADMIN MENU */}
                        {
                            !isRoleLoading && isAdmin && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/adminStatistics" className="text-orange-600 font-semibold flex gap-2">
                                <SiSamsclub className="size-4" /> Statistics
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/manageUsers" className="text-orange-600 font-semibold flex gap-2">
                                <SiSamsclub className="size-4" />
                                            Manage Users
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/paymentHistory" className="text-orange-600 font-semibold flex gap-2">
                                            <FaRegCreditCard />
                                            Payment History
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }

                        {/* ✅ CLUB MANAGER MENU */}
                        {
                            !isRoleLoading && isManager && (
                                <li>
                                    <NavLink to="/dashboard/createEvent" className="text-orange-600 font-semibold flex gap-2">
                                        <MdCreateNewFolder />
                                        Create Events
                                    </NavLink>
                                </li>
                            )
                        }

                        {/* ✅ MEMBER MENU */}
                        {
                            !isRoleLoading && isMember && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/myClubs" className="text-orange-600 font-semibold flex gap-2">
                                <SiSamsclub className="size-4" />  My Clubs
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/myEvents" className="text-orange-600 font-semibold flex gap-2">
                                            <MdEventAvailable />
                                            My Events
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/becomeMember" className="text-orange-600 font-semibold flex gap-2">
                                            <MdRememberMe />
                                            Become A Member
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
