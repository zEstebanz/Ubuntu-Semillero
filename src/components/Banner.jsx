import { Box, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";

import SearchBar from "./Publications/SearchBar";

const SectionTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitles,
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '1.125rem',
}));

const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.titles,
    textAlign: 'left',
    fontWeight: 500,
}));

const defaultSectionTitle = 'TITULO DE SECCIÓN';
const defaultTitle = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
const defaultImageURL = '/img/landing-hero-bg.jpeg';

export const Banner = ({
    sectionTitle = defaultSectionTitle,
    title = defaultTitle,
    imageURL = defaultImageURL
}) => {
    return (
        <Box
            sx={{
                height: '488px',
                mx: 'auto',
                p: 0,
                backgroundImage: `url("${imageURL}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
            maxWidth='sm'
        >
            <Container
                sx={{
                    width: 1,
                    height: 1,
                    pt: 3,
                    px: 2,
                    backdropFilter: 'brightness(30%)'
                }}
            >
                <SearchBar />
                <SectionTitle
                    color='common.white'
                    variant="h2"
                    sx={{
                        mt: 5
                    }}
                >
                    {sectionTitle.toUpperCase()}
                </SectionTitle>
                <Title
                    color='common.white'
                    variant="h1"
                    sx={{
                        pr: 10,
                        mt: {
                            xs: 1,
                            md: 4
                        },
                    }}
                >
                    {title}
                </Title>
            </Container>
        </Box>
    )
}