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
            imageUrl: '../../../public/img/post.jpeg',
            imageUrl2: '../../../public/img/post1.jpeg',
            imageUrl3: '../../../public/img/post2.jpeg',
            date: '03-03-2024',
            entity: 'Finca agroecológica',
            categori: 'Agroecología/Orgánicos/Alimentación saludable',
            location: 'Tunuyán, Mendoza, Argentina',
            link: '',
            contact: ''
        },
        {
            id: 2,
            title: 'EcoSenda',
            imageUrl: '../../../public/img/post.jpeg',
            imageUrl2: '../../../public/img/post1.jpeg',
            imageUrl3: '../../../public/img/post2.jpeg',
            date: '03-03-2024',
            entity: 'Finca agroecológica',
            categori: 'Agroecología/Orgánicos/Alimentación saludable',
            location: 'Tunuyán, Mendoza, Argentina',
            link: '',
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
                            fontSize: "20px",
                            fontWeight: 600,
                            textAlign: "center"
                        }}
                        color="primary"
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
                            imageUrl2={microenterprises.imageUrl2}
                            imageUrl3={microenterprises.imageUrl3}
                            location={microenterprises.location}
                        />
                    ))
                }
            </section>
        </main>
    );
};

export default MicroList;