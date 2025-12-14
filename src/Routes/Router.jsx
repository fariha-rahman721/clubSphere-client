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
import EventRegistrationCard from "../Components/Dashboard/EventRegistrationCard/EventRegistrationCard";
import MyEvents from "../Components/Dashboard/MyEvents/MyEvents";
import MembershipCard from "../Components/MembershipCard/MembershipCard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader:async () => {
                    const res = await fetch('http://localhost:3000/clubsCollection');
                    return res.json()
                }
                
            },
            
            {
                path: '/allClubs',
                element: <AllClubs></AllClubs>,
                loader:async () => {
                    const res = await fetch('http://localhost:3000/clubsCollection');
                    return res.json()
                }
            },
            {
                path: '/events',
                element: <Events></Events>,
                loader:async () => {
                    const res = await fetch('http://localhost:3000/events');
                    return res.json()
                }
            },
            {
                path: '/clubDetails/:id',
                element: <ClubDetails></ClubDetails>,
                loader:async () => {
                    const res = await fetch(`http://localhost:3000/clubsCollection`);
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
                path: '/membershipCard/:id',
                element: <MembershipCard></MembershipCard>
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
                        path: 'eventRegistration',
                        element: <EventRegistrationCard></EventRegistrationCard>
                    },
                    {
                        path: 'myEvents',
                        element: <MyEvents></MyEvents>
                    }
                    
                ]
            }
        ]}


    
])