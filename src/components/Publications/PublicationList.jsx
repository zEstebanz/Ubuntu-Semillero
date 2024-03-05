import React from 'react';
import PostCard from './PostCard';

const PublicacionList = ({ busqueda }) => {

    // Datos de ejemplo para las publicaciones (reemplazar con tus datos reales)
    
    const publicaciones = [
        {
            id: 1,
            title: '1 Inversiones Éticas: Más que ganancias',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            description: 'Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.Las decisiones financieras han trascendido la mera maximización del rendimiento.',
            link: '/post/1'
        },
        {
            id: 2,
            title: '2 Inversiones Éticas: Más que ganancias',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            description: 'Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.',
            link: '/post/2'
        },
        {
            id: 3,
            title: '3 Inversiones Éticas: Más que ganancias',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            description: 'Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.',
            link: '/post/3'
        },
    ];

    // Filtrar publicaciones según el término de búsqueda
    const publicacionesFiltradas = publicaciones.filter(publicacion =>
        publicacion.title.toLowerCase().includes(busqueda.toLowerCase())
    ); 

    return (
        <main>
            <section>
                {
                    publicacionesFiltradas.map(publicacion => (
                        <PostCard
                            key={publicacion.id}
                            title={publicacion.title}
                            description={publicacion.description}
                            date={publicacion.date}
                            imageUrl={publicacion.imageUrl}
                            link={publicacion.link}
                        />
                    ))
                }
            </section>
        </main>
    );
};

export default PublicacionList;
