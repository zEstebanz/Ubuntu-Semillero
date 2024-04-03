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
            date={post.date}
            images={post.images}
          />
        ))}
      </section>
    </main>
  );
};

export default PublicacionList;