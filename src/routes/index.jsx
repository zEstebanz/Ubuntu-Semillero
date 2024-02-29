import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Landing } from "../pages/Landing";
import { Micro } from "../pages/Micro";
import { Publicaciones } from "../pages/Publicaciones";
import { Login } from "../pages/Login"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Landing />
            },
            {
                path: '/microemprendimientos',
                element: <Micro />
            },
            {
                path: '/publicaciones',
                element: <Publicaciones />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
]);

export default router;