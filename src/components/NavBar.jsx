import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logoUbuntu.png";
import { Link } from "react-router-dom";
import DrawerList from "./DrawerList";
import CloseIcon from "@mui/icons-material/Close";
import OutsideClickHandler from "react-outside-click-handler";
import { useSession } from "./../hooks/useSession";

function NavBar({ setDrawerOpened }) {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef();
  /*   const user = useSession(); */
  const user = false;
  const getNavbarHeight = () => {
    if (navbarRef.current) {
      return navbarRef.current.offsetHeight;
    }
    return 0;
  };
  const toggleDrawer = () => {
    setDrawerOpened(!open);
    setOpen(!open);
  };
  const closeDrawer = () => {
    if (open) {
      toggleDrawer();
    }
  };

  useEffect(() => {
    /*     window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; */
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div ref={navbarRef}>
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
            marginLeft={user ? "0.8rem" : ""}
            marginRight={!user ? "1.5rem" : ""}
            justifyContent="center"
          >
            <Link to="/">
              <img src={logo} alt="Logo" height="100%" />
            </Link>
          </Box>
          {user ? <Avatar>TG</Avatar> : null}
        </Toolbar>
      </AppBar>
      <OutsideClickHandler onOutsideClick={closeDrawer}>
        <SwipeableDrawer
          variant="persistent"
          open={open}
          onOpen={toggleDrawer}
          onClose={toggleDrawer}
          anchor="left"
          PaperProps={{
            style: {
              width: "70%",
              /* marginTop: "3.5rem", */
              position: "absolute",
              top: `${getNavbarHeight()}px`,
              backgroundColor: "#093C59",
            },
          }}
        >
          <DrawerList toggleDrawer={toggleDrawer} />
        </SwipeableDrawer>
      </OutsideClickHandler>
    </div>
  );
}

export default NavBar;
