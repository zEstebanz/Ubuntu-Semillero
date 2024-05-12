import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

const PublicacionList = ({ busqueda }) => {
  // Datos ficticios de publicaciones
  const fakePostData = [
    {
      "id": 1,
      "titulo": "Inversiones Éticas: Más que ganancias",
      "descripcion": "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.",
      "isDeleted": false,
      "idUsuario": 1,
      "fechaCreacion": [
        2024,
        5,
        12
      ],
      "images": {
        "4": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1713370551/optghflzzfzi5vqobw6y.jpg",
        "5": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1714354431/vbeikylmygoguthj26xl.jpg"
      }
    },
    {
      "id": 2,
      "titulo": "Descubre el Poder de las Inversiones con Propósito",
      "descripcion": "En el mundo de las finanzas, las inversiones éticas están demostrando ser mucho más que simples decisiones financieras. Están marcando el comienzo de una nueva era, donde el propósito y los valores se entrelazan con el potencial de ganancias. Cada vez más inversores están reconociendo que sus decisiones pueden tener un impacto más allá de sus estados de cuenta. Optan por inversiones que no solo buscan rendimientos financieros, sino también contribuir al bienestar de la sociedad y del planeta.",
      "isDeleted": false,
      "idUsuario": 2,
      "fechaCreacion": [
        2024,
        5,
        12
      ],
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
      "isDeleted": false,
      "idUsuario": 1,
      "fechaCreacion": [
        2024,
        5,
        12
      ],
      "images": {
        "9": "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1712248639/qdtbn7hpmqo4ktyfpbgk.jpg"
      }
    }
  ];

  const [post, setPost] = useState(fakePostData);

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
              postId={post.id}
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