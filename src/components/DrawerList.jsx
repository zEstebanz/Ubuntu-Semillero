import { List, ListItem, Typography } from "@mui/material";
import theme from "../theme/theme";
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";

function DrawerList({ toggleDrawer }) {
  const user = useSession();
  console.log(user);

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

      {/* Dashboards */}
      {
        user && (
          <>
            <ListItem>
              <Link
                onClick={handleClickLink}
                to="/dashboard-admin"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="subtitles">Dashboard Administrador</Typography>
              </Link>
            </ListItem>

            <ListItem>
              <Link
                onClick={handleClickLink}
                to="/dashboard-micro"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="subtitles">DashboardMicro</Typography>
              </Link>
            </ListItem>

            <ListItem>
              <Link
                onClick={handleClickLink}
                to="/dashboard-publications"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="subtitles">DashboardPublications</Typography>
              </Link>
            </ListItem>
          </>

        )
      }

    </List>
  );
}

export default DrawerList;
