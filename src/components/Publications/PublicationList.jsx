import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import getPost from "../../api/publications/getPost";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

const PublicacionList = ({ busqueda }) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const obtenerPost = async () => {
      try {
        const postData = await getPost();
        setPost(postData);
      } catch (error) {
        console.error("Error al obtener los rubros:", error);
      }
    };

    obtenerPost();
  }, []);

  return (
    <main>
      <section>
        {post && post.length > 0 ? (
          post.map((post, index) => (
            <PostCard
              key={post.id}
              title={post.titulo}
              description={post.descripcion}
              date={`${post.fechaCreacion[2]}/${post.fechaCreacion[1] < 10 ? '0' : ''}${post.fechaCreacion[1]}/${post.fechaCreacion[0]}`}
              images={Object.values(post.images)}
            />
          ))
        ) : (
          <Box sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            textAlign: 'center',
            paddingX: '20px',
            paddingY: "50px",
            backgroundColor: '#093C59',
            borderRadius: '10px',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            width: '80%'
            }}>
            <Typography
              variant="subtitles"
              fontWeight={600}
              gutterBottom
              marginBottom={2.5}
              fontSize={"24px"}
              sx={{
                color: '#FFF',
              }}
            >
              No hay publicaciones por el momento...
            </Typography>
          </Box>
        )}
      </section>
    </main>
  );
};

export default PublicacionList;
