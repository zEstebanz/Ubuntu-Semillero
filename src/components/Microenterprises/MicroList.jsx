import React from 'react';
import MicroCard from './MicroCard';

const MicroList = ({ search, caracteristica }) => {

    const microenterprises = [
        {
            id: 1,
            title: '1 Ethical Investments: More than Profits',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            description: 'Financial decisions have transcended mere profit maximization. Nowadays, many investors want their decisions to reflect their ethical and moral values, giving rise to ethical or sustainable investments. Financial decisions have transcended mere profit maximization.',
            link: '/post/1',
            caracteristicas: ['Ética', 'Sostenibilidad']
        },
        {
            id: 2,
            title: '2 Ethical Investments: More than Profits',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            description: 'Financial decisions have transcended mere profit maximization. Nowadays, many investors want their decisions to reflect their ethical and moral values, giving rise to ethical or sustainable investments. Financial decisions have transcended mere profit maximization.',
            link: '/post/2',
            caracteristicas: ['Innovación', 'Tecnología']
        },
        // Agrega más publicaciones con diferentes características si es necesario
    ];

    // Filter posts according to search term and characteristic
    const filteredMicroenterprises = microenterprises.filter(microenterprise =>
        (typeof search === 'string' && microenterprise.title.toLowerCase().includes(search.toLowerCase())) &&
        (!caracteristica || (typeof caracteristica === 'string' && microenterprise.caracteristicas.includes(caracteristica)))
    );

    return (
        <main>
            <section>
                {filteredMicroenterprises.map(microenterprise => (
                    <MicroCard
                        key={microenterprise.id}
                        title={microenterprise.title}
                        description={microenterprise.description}
                        date={microenterprise.date}
                        imageUrl={microenterprise.imageUrl}
                        link={microenterprise.link}
                    />
                ))}
            </section>
        </main>
    );
};

export default MicroList;