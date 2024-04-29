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
            width: '80%'
          }}>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              gutterBottom
              alignSelf="center"
              marginBottom={2.5}
              fontSize={"18px"}
              sx={{
                textAlign: "center",
                display: "block",
                paddingY: "50px",
                color: '#093C59',
                backgroundColor: '#FDFDFE',
                borderRadius: '28px',
                paddingX: '8px',
                boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.5)',
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
