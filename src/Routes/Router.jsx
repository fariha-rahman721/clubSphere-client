import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Events from "../Pages/Events/Events";
import Clubs from "../Pages/Clubs/Clubs";
import MainLayout from "../Layout/MainLayout";
import Error from "../Pages/Error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/events',
                element: <Events></Events>
            },
            {
                path: '/clubs',
                element: <Clubs></Clubs>
            }
        ]}


    
])