import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import MicroCard from './MicroCard';

const MicroList = () => {
    // Datos hardcodeados de microemprendimientos
    const hardcodedMicroData = [
        {
            "id": 1,
            "nombre": "EcoSenda",
            "rubro": {
                "id": 1,
                "nombre": "Economía social/Desarrollo local/Inclusión financiera"
            },
            "subrubro": "Finca agroecológica",
            "pais": {
                "id": 1,
                "nombre": "Argentina"
            },
            "provincia": {
                "id": 3,
                "nombre": "Mendoza"
            },
            "ciudad": "Tunuyán",
            "descripcion": "Promueven un modelo de agricultura sostenible, protegiendo el medio ambiente, el agua y las semillas autóctonas. Cultivan frutas, verduras, plantas medicinales y crean derivados. Editan también contenidos educativos, gestionando un banco de semillas y comercializan o intercambian excedentes.",
            "masInfo": "Nació del sueño de restaurar la salud y adoptar un estilo de vida ideal. Este proyecto familiar creció fundamentado en la permacultura, comprometiéndose con la soberanía alimentaria, el bienestar, el regreso al campo, la venta directa y la dignidad de la vida campesina.",
            "deleted": false,
            "gestionado": false,
            "images": [
                "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1711397426/f5ovc4dtqn00blpt7rx0.jpg",
                "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1711151306/hrj91ijz5kfnyxokrlsz.jpg",
                "https://res.cloudinary.com/dvoxzrkzs/image/upload/v1711151310/zo7xeqcvqvu3qtn7k7s7.jpg"
            ],
            "fechaCreacion": "2024-05-12"
        }
    ];

    const [micros, setMicros] = useState(hardcodedMicroData);
    const { id } = useParams();

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

                    {micros && micros.length > 0 && (
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                textAlign: "center"
                            }}
                            color="primary"
                        >
                            {micros[0].rubro.nombre || "Rubro no cargado"}
                        </Typography>
                    )}

                    {micros.length > 0 && (
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
                    )}
                </Box>
            </section>

            <section>
                {micros.length > 0 ? (
                    micros.map((micro, index) => (
                        <div key={index}>
                            <MicroCard
                                key={micro.id}
                                microId={micro.id}
                                title={micro.nombre}
                                entity={micro.rubro.nombre}
                                category={micro.subrubro}
                                location={`${micro.ciudad ? micro.ciudad + ', ' : ''}${micro.provincia.nombre}, ${micro.pais.nombre}`}
                                images={micro.images} // No es necesario procesar las URLs aquí
                                masInfo={micro.masInfo}
                                descripcion={micro.descripcion}
                            />
                        </div>
                    ))
                ) : (
                    <Typography
                        fontWeight={400}
                        gutterBottom
                        alignSelf="center"
                        marginBottom={2.5}
                        fontSize={"18px"}
                        sx={{
                            textAlign: "center",
                            display: "block",
                            paddingY: "50px",
                            paddingX: "6px",
                            color: '#093C59',
                            backgroundColor: '#FDFDFE',
                            marginX: '32px',
                            borderRadius: '28px',
                            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        No hay microemprendimientos cargados para esta categoría.
                    </Typography>
                )}
            </section>
        </main>
    );
};

export default MicroList;
