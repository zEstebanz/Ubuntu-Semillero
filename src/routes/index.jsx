import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Landing } from "../pages/Landing";
import { Micro } from "../pages/Micro";
import { Publicaciones } from "../pages/Publicaciones";
import { Login } from "../pages/Login"
import { Contact } from "../pages/Contact";
import MicroList from "../components/Microenterprises/MicroList";

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
                element: <Micro />,
                children: [
                    {
                        path: ':id',
                        element: <MicroList />
                    }
                ]
            },
            {
                path: '/publicaciones',
                element: <Publicaciones />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/contacto',
                element: <Contact />
            },
        ]
    },

]);

export default router;