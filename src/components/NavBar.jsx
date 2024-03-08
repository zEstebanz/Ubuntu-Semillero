import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  Grid,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import logo from "../assets/logoUbuntu.png";
import { Link } from "react-router-dom";
import DrawerList from "./DrawerList";
import CloseIcon from "@mui/icons-material/Close";

import "../assets/styles/NavBarWithDrawer.css";

function NavBar() {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef();
  const getNavbarHeight = () => {
    if (navbarRef.current) {
      return navbarRef.current.offsetHeight;
    }
    return 0; // Valor predeterminado si no se puede obtener la altura del Navbar
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div ref={navbarRef} className={`navbar ${open ? "drawer-open" : ""}`}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            color="common.black"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            {open === true ? <CloseIcon /> : <Menu />}
          </IconButton>
          <Box
            display="flex"
            width="100%"
            marginRight="1.5rem"
            justifyContent="center"
          >
            <Link to="/">
              <img src={logo} alt="Logo" height="50" />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        variant="persistent"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        anchor="left"
        PaperProps={{
          style: {
            width: "70%",
            top: `${getNavbarHeight()}px`,
            backgroundColor: "#093C59",
          },
        }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </div>
  );
}

export default NavBar;
