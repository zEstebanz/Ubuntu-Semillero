import { Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <>
            <div>
                <ul>
                    <li><a href="/microemprendimientos">Micro</a></li>
                    <li><a href="/publicaciones">Public</a></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}