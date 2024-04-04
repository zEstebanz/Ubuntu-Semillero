/* eslint-disable react/prop-types */
import { List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function DrawerList({ toggleDrawer }) {
  const handleClickLink = () => {
    toggleDrawer();
  };
  return (
    <List>
      <ListItem>
        <Link
          onClick={handleClickLink}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography variant="subtitles">Inicio</Typography>
        </Link>
      </ListItem>
      <ListItem>
        <Link
          onClick={handleClickLink}
          to="/microemprendimientos"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography variant="subtitles">Microemprendimientos</Typography>
        </Link>
      </ListItem>
      <ListItem>
        <Link
          onClick={handleClickLink}
          to="publicaciones"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography variant="subtitles">Publicaciones</Typography>
        </Link>
      </ListItem>
    </List>
  );
}

export default DrawerList;
