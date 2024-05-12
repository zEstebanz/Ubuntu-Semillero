import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import PostCard from "../Publications/PostCard";
import { Link } from "react-router-dom";

function LandingPosts() {
  // Datos de publicaciones hardcodeados
  const hardcodedPostData = [
    {
      "id": 1,
      "titulo": "Inversiones Éticas: Más que ganancias",
      "descripcion": "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.",
      "fechaCreacion": [2024, 5, 12],
      "images": {
        "4": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1713370551/optghflzzfzi5vqobw6y.jpg",
        "5": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1714354431/vbeikylmygoguthj26xl.jpg"
      }
    },
    {
      "id": 2,
      "titulo": "Descubre el Poder de las Inversiones con Propósito",
      "descripcion": "En el mundo de las finanzas, las inversiones éticas están demostrando ser mucho más que simples decisiones financieras. Están marcando el comienzo de una nueva era, donde el propósito y los valores se entrelazan con el potencial de ganancias. Cada vez más inversores están reconociendo que sus decisiones pueden tener un impacto más allá de sus estados de cuenta. Optan por inversiones que no solo buscan rendimientos financieros, sino también contribuir al bienestar de la sociedad y del planeta.",
      "fechaCreacion": [2024, 5, 12],
      "images": {
        "6": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1712248452/yrucybwgamam4wtxj3mn.jpg",
        "7": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1712248526/vusloil5ybdi0tc3jas4.jpg",
        "8": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1714354431/vbeikylmygoguthj26xl.jpg"
      }
    },
    {
      "id": 3,
      "titulo": "Cómo las inversiones éticas están cambiando el mundo",
      "descripcion": "Las finanzas serán verdes o no serán. O dicho de otra manera, la sociedad empieza a tener claro que las inversiones éticas o sostenibles son las mejores opciones para buscar oportunidades de rentabilidad a largo plazo conforme a principios de responsabilidad social y protección medioambiental. En la década de los 70, aparecieron los primeros fondos de inversión sostenible, y hoy representan una demanda creciente en el mercado. Su importancia no responde únicamente a cuestiones individuales o de rentabilidad, sino que pone en valor la conciencia de comunidad y el deseo de dejar un mundo mejor a las futuras generaciones.",
      "fechaCreacion": [2024, 5, 12],
      "images": {
        "9": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1712248639/qdtbn7hpmqo4ktyfpbgk.jpg"
      }
    }
  ];

  const [posts, setPosts] = useState(hardcodedPostData);

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
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.titulo}
              description={post.descripcion}
              date={`${post.fechaCreacion[2]}/${post.fechaCreacion[1] < 10 ? '0' : ''}${post.fechaCreacion[1]}/${post.fechaCreacion[0]}`}
              images={Object.values(post.images)}
              postId={post.id}
            />
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{marginBottom: '50px'}}>
            No hay publicaciones por el momento...
          </Typography>
        )}
      </Box>
      
      {/* Renderizar el botón solo si hay publicaciones disponibles */}
      {posts && posts.length > 0 && (
        <Link to="/publicaciones">
          <Button
            variant="contained"
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
      )}
    </Box>
  );
}

export default LandingPosts;