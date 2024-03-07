import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "./NavBar";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <ScrollRestoration />
      <Outlet />
    </>
  );
};
