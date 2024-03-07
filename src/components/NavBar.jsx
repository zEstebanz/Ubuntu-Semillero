import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import logo from "../assets/logoUbuntu.png";

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    /*     <Box component="nav" display="flex" width="100%">
      <IconButton onClick={() => setOpen(open)}>
        <Menu height="6rem" />
      </IconButton>
      <Box right="-24%" position="relative">
        <img src={logo} alt="logo-ubuntu" />
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)}></Drawer>
    </Box> */

    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h6">
            <img src={logo} alt="Logo" height="40" />
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
