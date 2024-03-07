import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import logo from "../assets/logoUbuntu.png";
import { Link } from "react-router-dom";
import DrawerList from "./DrawerList";

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton
          edge="start"
          color="common.black"
          aria-label="menu"
          onClick={() => setOpen(open)}
        >
          <Menu />
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
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerList />
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
