import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";

export const Layout = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <>
      <NavBar setDrawerOpened={setDrawerOpened} />
      <ScrollRestoration />
      <div className={drawerOpened === true ? `outlet-inactive` : ""}>
        <Outlet />
      </div>
    </>
  );
};
