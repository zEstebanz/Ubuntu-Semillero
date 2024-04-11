import React from 'react';
import { Box, Divider, Typography, } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';

const Goals = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                m: "auto",
                p: 3,
                maxWidth: 600,
            }}>
                <Divider sx={{
                    bgcolor: 'green.dark'
                }} />
                <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    borderRadius: 1,
                }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        fontWeight="bold"
                        margin={2}>
                        Objetivos de Ubuntu</Typography>
                </Box>

                <Box sx={{
                    '& ul': {
                        listStylePosition: 'outside',
                        paddingInlineStart: 2,
                    },
                    '& ul li': {
                        margin: '0 0 1rem 0',
                    }
                }}>        <ul>
                        <li>Facilitar a productores o microemprendedores el acceso a microcréditos que les permitan desarrollar sus iniciativas empresariales.</li>
                        <li>Proporcionar financiación a empresas y organizaciones que ejecutan proyectos con objetivos sociales, ambientales y culturales.</li>
                        <li>Ofrecer a potenciales inversores la oportunidad de participar en proyectos con impacto significativo.</li>
                    </ul>
                </Box>
                <Divider sx={{
                    marginTop: 3,
                    bgcolor: 'green.dark'
                }} />
            </Box>
        </ThemeProvider>
    );

};

export default Goals;
