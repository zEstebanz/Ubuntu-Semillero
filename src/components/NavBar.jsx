/* eslint-disable react/prop-types */
import { Menu } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logoUbuntu.png";
import { Link, useNavigate } from "react-router-dom";
import DrawerList from "./DrawerList";
import CloseIcon from "@mui/icons-material/Close";
import OutsideClickHandler from "react-outside-click-handler";
import { useSession } from "./../hooks/useSession";
import { Typography } from "@mui/material";

function NavBar({ setDrawerOpened }) {
  const [open, setOpen] = useState(false);
  const [displayCloseSession, setDisplayCloseSession] = useState(false);
  const navbarRef = useRef();
  const navigate = useNavigate();
  const user = useSession();
  console.log(user);

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
  const getInitials = () => {
    const nameInitial = user.Nombre.substring(0, 1);
    const lastnameInitial = user.Apellido.substring(0, 1);
    return nameInitial + lastnameInitial;
  };
  const logOut = () => {};

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
      <AppBar position="static" color="transparent" className="nav-bar">
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
          {user ? (
            <div className="">
              <div onClick={() => setDisplayCloseSession(!displayCloseSession)}>
                <Avatar style={{ backgroundColor: "black" }}>
                  {getInitials()}
                </Avatar>
              </div>
              {displayCloseSession ? (
                <Box
                  position="absolute"
                  top="3.5rem"
                  right="0.4rem"
                  zIndex="1"
                  bgcolor="white"
                  borderRadius="0.1rem"
                >
                  <ButtonGroup
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
                    }}
                    orientation="vertical"
                  >
                    <Link
                      to="/dashbord-admin"
                      style={{
                        borderBottom: "1.5px solid",
                        borderColor: "black",
                      }}
                    >
                      <Button style={{ border: "0" }}>Ir a mi perfil</Button>
                    </Link>
                    <Button
                      style={{
                        border: "0",
                      }}
                      onClick={() => logOut()}
                    >
                      {/* <LogoutIcon color="black" /> */}
                      Cerrar sesion
                    </Button>
                  </ButtonGroup>
                </Box>
              ) : (
                ""
              )}
            </div>
          ) : null}
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
