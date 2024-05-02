import { List, ListItem, Typography, Divider } from "@mui/material";
import theme from "../theme/theme";
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";

function DrawerList({ toggleDrawer }) {
  const user = useSession();

  const handleClickLink = () => {
    toggleDrawer();
  };
  return (
    <List>
      {/* Dashboards */}
      {!user ? (
        <>
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">Inicio</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/microemprendimientos"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">Microemprendimientos</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="publicaciones"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">Publicaciones</Typography>
            </Link>
          </ListItem>
          <Divider
            variant="middle"
            sx={{ mt: 1, mb: 1, background: "#DDDDDD" }}
          />
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/login"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">Ingreso Administrador</Typography>
            </Link>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem>
            <Typography
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "24px",
              }}
              variant="subtitles"
            >
              Administrador
            </Typography>
          </ListItem>
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/dashboard-admin"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography
                style={{ textDecoration: "none", color: "white" }}
                variant="subtitles"
              >
                Dashboard Administrador
              </Typography>
            </Link>
          </ListItem>

          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/dashboard-micro"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">Microemprendimientos</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/solicitudes-contacto"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">
                Solicitudes de Contacto
              </Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/dashboard-publications"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">Publicaciones</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={handleClickLink}
              to="/chatbot"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Typography variant="subtitles">ChatBot</Typography>
            </Link>
          </ListItem>
        </>
      )}
    </List>
  );
}

export default DrawerList;
