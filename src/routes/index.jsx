import { createBrowserRouter } from "react-router-dom";

import { Layout } from "../components/Layout";
import { Landing } from "../pages/Landing";
import { Micro } from "../pages/Micro";
import { Publicaciones } from "../pages/Publicaciones";
import { Login } from "../pages/Login"
import { Contact } from "../pages/Contact";
import MicroList from "../components/Microenterprises/MicroList";
import DashboardMicro from "../pages/Dashboard/DashboardMicro";
import DashboardPublications from "../pages/Dashboard/DashboardPublications";
import DashboardAdmin from "../pages/Dashboard/DashboardAdmin";
import MicroFormEdit from "../components/Dashboard/MicroFormEdit";
import MicroForm from "../components/Dashboard/MicroForm";
import PublicationsForm from "../components/Dashboard/PublicationsForm";
import PublicationsFormEdit from "../components/Dashboard/PublicationsFormEdit";
import MicroView from "../components/Dashboard/MicroView";
import { ProtectedRoute } from "./ProtectedRoute";
import DashboardSolicitudes from "../pages/Dashboard/DashboardSolicitudes";
import Formulario from "../pages/Dashboard/SolicitudesForm";

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
                path: '/contacto/:title/:id',
                element: <Contact />
            },
            //dashboard
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/dashboard-micro',
                        element: <DashboardMicro />,
                        children: [
                            {
                                path: '/dashboard-micro/form',
                                element: <MicroForm />
                            }
                        ]
                    },
                    {
                        path: '/dashboard-micro/form-edit/:id',
                        element: <MicroFormEdit />
                    },
                    {
                        path: '/dashboard-micro/view/:id',
                        element: <MicroView />
                    },
                    {
                        path: '/dashboard-admin',
                        element: <DashboardAdmin />
                    },
                    {
                        path: '/dashboard-publications',
                        element: <DashboardPublications />,
                        children: [
                            {
                                path: '/dashboard-publications/form',
                                element: <PublicationsForm />
                            },
                            {
                                path: '/dashboard-publications/form-edit',
                                element: <PublicationsFormEdit />
                            }
                        ]
                    },
                    {
                        path: "/solicitudes-contacto",
                        element: <DashboardSolicitudes />
                    },
                    {
                        path: "/formulario/:id",
                        element: <Formulario />
                    },
                ]
            },
        ]
    },

]);

export default router;  