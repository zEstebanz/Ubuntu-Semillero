/* eslint-disable react/prop-types */
import { Menu } from "@mui/icons-material";
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
import { Link, useNavigate, useLocation } from "react-router-dom";
import DrawerList from "./DrawerList";
import CloseIcon from "@mui/icons-material/Close";
import OutsideClickHandler from "react-outside-click-handler";
import { useSession } from "./../hooks/useSession";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { deleteAccessToken } from "../utils/helpers/localStorage";

function NavBar({ setDrawerOpened }) {
  const [open, setOpen] = useState(false);
  const [displayAvatarMenu, setDisplayAvatarMenu] = useState(false);
  const navbarRef = useRef();
  const dispatch = useDispatch();
  const user = useSession();
  const navigate = useNavigate();
  const location = useLocation();

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
  const toggleAvatarMenu = () => {
    setDisplayAvatarMenu(!displayAvatarMenu);
  };
  const closeAvatarMenu = (event) => {
    if (!["Avatar", "Avatarr"].includes(event.target.id)) {
      if (displayAvatarMenu) {
        toggleAvatarMenu();
      }
    }
  };
  const getInitials = () => {
    const nameInitial = user.Nombre.substring(0, 1);
    const lastnameInitial = user.Apellido.substring(0, 1);
    return nameInitial + lastnameInitial;
  };
  const logOut = () => {
    console.log(location.pathname);
    if (location.pathname === "/") {
      navigate("/login");
    }
    setDisplayAvatarMenu(false);
    dispatch(logout());
    deleteAccessToken();
  };

  useEffect(() => {
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
      <AppBar position="static" color="transparent" sx={{ boxShadow: 0 }}>
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
              <div id="Avatar" onClick={toggleAvatarMenu}>
                <Avatar id="Avatarr" style={{ backgroundColor: "black" }}>
                  {getInitials()}
                </Avatar>
              </div>
              {displayAvatarMenu ? (
                <OutsideClickHandler
                  onOutsideClick={(e) => {
                    closeAvatarMenu(e);
                  }}
                >
                  <Box
                    position="absolute"
                    top="3.5rem"
                    right="0.4rem"
                    zIndex="2"
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
                        to="/dashboard-admin"
                        style={{
                          borderBottom: "0.5px solid",
                          borderColor: "black",
                        }}
                        onClick={closeAvatarMenu}
                      >
                        <Button style={{ border: "0" }}>Ir a mi perfil</Button>
                      </Link>
                      <Button
                        style={{
                          border: "0",
                          borderTop: "0.5px solid",
                          borderColor: "black",
                        }}
                        onClick={() => {
                          logOut();
                        }}
                      >
                        Cerrar sesion
                      </Button>
                    </ButtonGroup>
                  </Box>
                </OutsideClickHandler>
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
