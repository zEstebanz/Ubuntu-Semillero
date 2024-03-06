import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import MicroCard from './MicroCard';

const MicroList = () => {

    const [expanded, setExpanded] = useState(false);
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
            link: '/post/1',
            contact: ''
        },
        {
            id: 2,
            title: 'EcoSenda',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            entity: 'Finca agroecológica',
            categori: 'Agroecología/Orgánicos/Alimentación saludable',
            location: 'Tunuyán, Mendoza, Argentina',
            link: '/post/2',
            contact: ''
        }, {
            id: 2,
            title: 'EcoSenda',
            imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '03-03-2024',
            entity: 'Finca agroecológica',
            categori: 'Agroecología/Orgánicos/Alimentación saludable',
            location: 'Tunuyán, Mendoza, Argentina',
            link: '/post/2',
            contact: ''
        },
    ];

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <main>
            <section>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 800,
                    margin: "auto",
                    paddingBottom: 3,
                    paddingLeft: 2,
                    paddingRight: 2
                }}>
                    <Typography
                        variant="h5"
                        color="common.black"
                        fontWeight="bold"
                        sx={{
                            paddingTop: 6
                        }}
                        marginBottom={3}>
                        Categorias
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: '16px', // Para dispositivos extra pequeños (teléfonos)
                                sm: '18px', // Para dispositivos pequeños (tablets)
                                md: '20px', // Para dispositivos medianos (laptops)
                                lg: '22px', // Para dispositivos grandes (monitores)
                            },
                            fontWeight: 500,
                            color: "#093C59",
                        }}
                    >
                        Agroecología/Orgánicos/Alimentación Saludable
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: "Lato",
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "25px",
                            letterSpacing: "0px",
                            textAlign: "center",
                            marginBottom: "16px",
                            marginTop: "16px"
                        }}
                    >
                        Conectate con Microemprendimientos que respetan la tierra y priorizan la salud, a través de prácticas agrícolas limpias y alimentos nutritivos.
                    </Typography>
                </Box>
            </section>

            <section>
                {
                    microenterprises.map(microenterprises => (
                        <MicroCard
                            key={microenterprises.id}
                            title={microenterprises.title}
                            entity={microenterprises.entity}
                            categori={microenterprises.categori}
                            imageUrl={microenterprises.imageUrl}
                            location={microenterprises.location}
                        />
                    ))
                }
            </section>
        </main>
    );
};

export default MicroList;