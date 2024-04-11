import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import getPost from "../../api/publications/getPost";

const PublicacionList = ({ busqueda }) => {

  const [post, setPost] = useState([]);

  useEffect(() => {
    const obtenerPost = async () => {
      try {
        const postData = await getPost();
        setPost(postData)
      } catch (error) {
        console.error('Error al obtener los rubros:', error);
      }
    };

    obtenerPost();
  }, []);

  return (
    <main>
      <section>
        {post.map((post, index) => (
          <PostCard
            key={post.id}
            title={post.titulo}
            description={post.descripcion}
            date={`${post.fechaCreacion[2]}/${post.fechaCreacion[1] < 10 ? '0' : ''}${post.fechaCreacion[1]}/${post.fechaCreacion[0]}`}
            images={Object.values(post.images)}
          />
        ))}
      </section>
    </main>
  );
};

export default PublicacionList;