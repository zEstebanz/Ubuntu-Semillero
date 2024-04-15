import { Box, Typography, Button } from "@mui/material";
import PostCard from "../Publications/PostCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getPostPublic from "../../api/publications/getPostPublic";

function LandingPosts() {

  const [posts, setPost] = useState([]);

  useEffect(() => {
    const obtenerMicro = async () => {
      try {
        const postData = await getPostPublic();
        // console.log('Datos de micro recibidos:', postData)
        setPost(postData);
      } catch (error) {
        console.error('Error al obtener los rubros:', error);
      }
    };

    obtenerMicro();
  }, []);


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
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            title={post.titulo}
            description={post.descripcion}
            date={`${post.fechaCreacion[2]}/${post.fechaCreacion[1] < 10 ? '0' : ''}${post.fechaCreacion[1]}/${post.fechaCreacion[0]}`}
            images={Object.values(post.images)}
          />
        ))}
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
