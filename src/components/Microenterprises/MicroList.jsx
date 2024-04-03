import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import MicroCard from './MicroCard';
import getMicro from '../../api/micros/getMicro';

const MicroList = () => {

    const [micros, setMicros] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const obtenerMicro = async () => {
            try {
                const microData = await getMicro(id);
                // console.log('Datos de micro recibidos:', microData)
                setMicros(microData);
            } catch (error) {
                console.error('Error al obtener los rubros:', error);
            }
        };

        obtenerMicro();
    }, [id]);

    const obtenerUrlsDeImagenes = (images) => {
        return images.map(image => {
            const regex = /secure_url=(.*?),/;
            const match = regex.exec(image);
            return match ? match[1] : '';
        });
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

                    {micros?.map((micro, index) => (
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                textAlign: "center"
                            }}
                            color="primary"
                        >
                            {micro.rubro.nombre}
                        </Typography>
                    ))}

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
                {micros?.map((micro, index) => (
                    <div key={index}>
                        <MicroCard
                            key={micro.id}
                            title={micro.nombre}
                            entity={micro.rubro.nombre}
                            category={micro.subrubro}
                            location={`${micro.ciudad ? micro.ciudad + ', ' : ''}${micro.provincia.nombre}, ${micro.pais.nombre}`}
                            images={obtenerUrlsDeImagenes(micro.images)}
                            masInfo={micro.masInfo}
                            descripcion={micro.descripcion}
                        />
                    </div>
                ))}
            </section>
        </main>
    );
};

export default MicroList;