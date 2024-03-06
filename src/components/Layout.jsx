import { Outlet, ScrollRestoration } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <h1>Navbar</h1>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};
