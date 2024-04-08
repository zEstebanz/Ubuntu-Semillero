import React, { useEffect, useState } from "react";
import PostCardAdmin from "./PostCardAdmin";
import getPostAdmin from "../../api/publications/getPostAdmin.js";

const PublicacionList = ({ }) => {

  const [post, setPost] = useState([]);

  useEffect(() => {
    const obtenerPost = async () => {
      try {
        const postData = await getPostAdmin();
        setPost(postData)
        console.log(postData)
      } catch (error) {
        console.error('Error al obtener las Publicaciones:', error);
      }
    };

    obtenerPost();
  }, []);

  return (
    <main>
      <section>
        {post.map((post, index) => (
          <PostCardAdmin
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