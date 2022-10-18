import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import Post from './Post';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Home, { homeLoader } from './Home';

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/post",
        element: <Post />,
    },
    {
        path: "/home",
        element: <Home />,
        loader: homeLoader,
    },
    {
        path: "*",
        element: <p>page not found</p>,
        loader: homeLoader,
    },
]);

const App = () => {
    return <RouterProvider router={router} />
}

export default App