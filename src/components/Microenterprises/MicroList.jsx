import React from 'react';
import MicroCard from './MicroCard';
import { useParams } from 'react-router-dom';
import { Height } from '@mui/icons-material';

const MicroList = ({ search, caracteristica }) => {

    const { id } = useParams();

    const microenterprises = [
        {
            id: 1,
            title: 'EcoSenda',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            entity: 'Finca agroecológica',
            categori: 'Agroecología/Orgánicos/Alimentación saludable',
            location: 'Tunuyán, Mendoza, Argentina',
            descriptionOne: '',
            descriptionTwo: '',
            link: '/post/1',
            contact: ''
        },
    ];

    // Filter posts according to search term and characteristic
    const filteredMicroenterprises = microenterprises.filter(microenterprise =>
        (typeof search === 'string' && microenterprise.title.toLowerCase().includes(search.toLowerCase())) &&
        (!caracteristica || (typeof caracteristica === 'string' && microenterprise.caracteristicas.includes(caracteristica)))
    );

    return (
        <main>
            <section>
                <MicroCard />
            </section>

            <section className='section-micro'>
                {filteredMicroenterprises.map(microenterprise => (
                    <MicroCard
                        key={microenterprise.id}
                        title={microenterprise.title}
                        entity={microenterprise.entity}
                        categori={microenterprise.categori}
                        imageUrl={microenterprise.imageUrl}
                        link={microenterprise.link}
                        location={microenterprise.location}
                        contact={microenterprise.contact}
                    />
                ))}
            </section>
        </main>
    );
};

export default MicroList;