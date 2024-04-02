import { Box, Typography, Button } from "@mui/material";
import img from "../../assets/Blog.jpg";
import PostCard from "../Publications/PostCard";
import { Link } from "react-router-dom";
import { ubuntuApi } from "../../utils/services/axiosConfig";

import { useSession } from "./../../hooks/useSession";

function LandingPosts() {
  /*   const session = useSession();
  console.log(session.user); */
  /*  const posts = ubuntuApi("/publicaciones/ultimasTres").then(
    (response) => response.data
  ); */

  /* [
    {
      id: 1,
      title: "Inversiones Éticas: Más que ganancias",
      imageUrl: img,
      date: "03-03-2024",
      description:
        "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.",
      link: "/post/1",
    },
    {
      id: 2,
      title: "Inversiones Éticas: Más que ganancias",
      imageUrl:
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "03-03-2024",
      description:
        "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.",
      link: "/post/2",
    },
    {
      id: 3,
      title: "Inversiones Éticas: Más que ganancias",
      imageUrl:
        "https://www.coliseugeek.com.br/wp-content/uploads/2023/01/d9f70-clickwallpapers-lion-4k-img2-scaled-1.jpg",
      date: "03-03-2024",
      description:
        "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento",
      link: "/post/3",
    },
  ] */
  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="1.5rem"
      width="100%"
    >
      <Typography variant="paragraphs" fontWeight={600} marginBottom={0.3}>
        Publicaciones
      </Typography>
      <Typography fontSize={22} fontWeight={600} marginBottom={3}>
        Finanzas con impacto
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        {/*         {posts?.map((post) => (
          <PostCard
            key={post.id}
            title={post.titulo}
            description={post.descripcion}
            date={post.fechaCreacion}
            imageUrl={post.imageUrl}
          />
        ))} */}
      </Box>
      <Link to="/publicaciones">
        <Button
          variant="contained"
          /*           size="small" */
          sx={{
            width: "10rem",
            borderRadius: "2rem",
            padding: "0.5rem 1.4rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            textTransform: "none",
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            Ir a Publicaciones
          </Typography>
        </Button>
      </Link>
    </Box>
  );
}

export default LandingPosts;
