import React from "react";
import PostCard from "./PostCard";

const PublicacionList = ({ busqueda }) => {
  // Datos de ejemplo para las publicaciones (reemplazar con tus datos reales)

  const publicaciones = [
    {
      id: 1,
      title: "1 Inversiones Éticas: Más que ganancias",
      imageUrl:
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "03-03-2024",
      description: `Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.

Estas no solo evitan sectores polémicos como el tabaco o las armas; buscan respaldar empresas y proyectos que beneficien positivamente a la sociedad y al medio ambiente. Estas empresas suelen adherirse a altos estándares de responsabilidad social, considerando tanto a accionistas como a las comunidades en las que operan.

El atractivo de las inversiones éticas radica en la posibilidad de generar un impacto positivo con el dinero invertido. Apoyando a empresas pioneras en energías renovables, que fomentan la igualdad de género o que practican la equidad laboral, los inversores no solo buscan ganancias, sino también cambios beneficiosos en el mundo.

Contrario a lo que algunos podrían pensar, las inversiones éticas pueden ofrecer rendimientos competitivos. La demanda de soluciones sostenibles está en aumento, y las empresas que lideran en este ámbito suelen tener una ventaja competitiva a largo plazo.

No obstante, es esencial investigar adecuadamente. No todas las empresas que se promocionan como "sostenibles" cumplen con estos criterios. Certificaciones, como los Principios de Inversión Responsable de las Naciones Unidas, son útiles para discernir el compromiso real de una empresa con la sostenibilidad.

En conclusión, las inversiones éticas ofrecen la oportunidad de unir capital y valores. Al buscar un impacto positivo más allá de los rendimientos, contribuimos a un futuro más equitativo y sostenible.`,
      link: "/post/1",
    },
    {
      id: 2,
      title: "2 Inversiones Éticas: Más que ganancias",
      imageUrl:
        "https://www.coliseugeek.com.br/wp-content/uploads/2023/01/d9f70-clickwallpapers-lion-4k-img2-scaled-1.jpg",
      date: "03-03-2024",
      description:
        "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.",
      link: "/post/2",
    },
    {
      id: 3,
      title: "3 Inversiones Éticas: Más que ganancias",
      imageUrl:
        "https://www.coliseugeek.com.br/wp-content/uploads/2023/01/d9f70-clickwallpapers-lion-4k-img2-scaled-1.jpg",
      date: "03-03-2024",
      description:
        "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.",
      link: "/post/3",
    },
  ];

  // Filtrar publicaciones según el término de búsqueda
  const publicacionesFiltradas = publicaciones.filter((publicacion) =>
    publicacion.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main>
      <section>
        {publicacionesFiltradas.map((publicacion) => (
          <PostCard
            key={publicacion.id}
            title={publicacion.title}
            description={publicacion.description}
            date={publicacion.date}
            imageUrl={publicacion.imageUrl}
            link={publicacion.link}
          />
        ))}
      </section>
    </main>
  );
};

export default PublicacionList;
