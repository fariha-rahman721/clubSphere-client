import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Events from "../Pages/Events/Events";

import MainLayout from "../Layout/MainLayout";
import Error from "../Pages/Error/Error";
import ClubDetails from "../Components/Clubs/ClubDetails";
import AllClubs from "../Pages/AllClubs/AllClubs";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import UserProfile from "../Components/UserProfile";

import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "../Provider/PrivateRoute";
import MyClubs from "../Components/Dashboard/MyClubs/MyClubs";
import Loading from "../Components/Loading";

import MyEvents from "../Components/Dashboard/MyEvents/MyEvents";

import EventDetails from "../Pages/EventDetails/EventDetails";
import CreateEvent from "../Components/Dashboard/CreateEvent/CreateEvent";
import Payment from "../Components/Dashboard/Payment/Payment";
import PaymentSuccess from "../Components/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Components/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Components/Dashboard/PaymentHistory/PaymentHistory";
import AdminStatistics from "../Components/Dashboard/Statistics/AdminStatistics";
import ManageUsers from "../Components/Dashboard/Admin/ManageUsers";
import BecomeMember from "../Components/Dashboard/BecomeMember/BecomeMember";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: async () => {
                    const res = await fetch('https://clubsphere-theta.vercel.app/clubsCollection');
                    return res.json()
                }

            },

            {
                path: '/allClubs',
                element: <AllClubs></AllClubs>,
                loader: async () => {
                    const res = await fetch('https://clubsphere-theta.vercel.app/clubsCollection');
                    return res.json()
                }
            },
            {
                path: '/events',
                element: <Events></Events>,
                loader: async () => {
                    const res = await fetch('https://clubsphere-theta.vercel.app/events');
                    return res.json()
                }
            },
            {
                path: '/clubDetails/:id',
                element: <ClubDetails></ClubDetails>,
                loader: async () => {
                    const res = await fetch(`https://clubsphere-theta.vercel.app/clubsCollection`);
                    return res.json()
                }
            },
            {
                path: '/loading',
                element: <Loading></Loading>
            },
            {
                path: "/userProfile",
                element: <UserProfile></UserProfile>
            },


            {
                path: '/eventDetails/:id',
                element: <EventDetails></EventDetails>
            },



            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            },
            {
                path: '/auth/forgetPassword',
                element: <ForgetPassword></ForgetPassword>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute>
                    <DashboardLayout></DashboardLayout>
                </PrivateRoute>,
                children:
                    [
                        {
                            path: "myClubs",
                            element: <MyClubs></MyClubs>
                        },

                        {
                            path: 'myEvents',
                            element: <MyEvents></MyEvents>
                        },
                        {
                            path: 'createEvent',
                            element: <CreateEvent></CreateEvent>
                        },
                        {
                            path: 'payment',
                            element: <Payment></Payment>
                        },
                        {
                            path: 'paymentHistory',
                            element: <PaymentHistory></PaymentHistory>
                        }
                        ,
                        {
                            path: 'payment-success',
                            element: <PaymentSuccess></PaymentSuccess>
                        },
                        {
                            path: 'payment-cancel',
                            element: <PaymentCancelled></PaymentCancelled>
                        },
                        {
                            path: 'adminStatistics',
                            element: <AdminStatistics></AdminStatistics>
                        },
                        {
                            path: 'manageUsers',
                            element: <ManageUsers></ManageUsers>
                        },
                        {
                            path: 'becomeMember',
                            element: <BecomeMember></BecomeMember>
                        },

                    ]
            }
        ]
    }



])