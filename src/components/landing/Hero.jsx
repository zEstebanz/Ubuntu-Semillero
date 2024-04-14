import { Box, Container, Typography } from "@mui/material";
/* import SearchBar from "../Publications/SearchBar" */
import styled from "@emotion/styled";

const SectionTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitles,
  textAlign: "left",
  fontWeight: 600,
  fontSize: "1.125rem",
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.titles,
  textAlign: "left",
  fontWeight: 500,
}));

export const Hero = () => {
  return (
    <Box
      sx={{
        height: "488px",
        mx: "auto",
        p: 0,
        backgroundImage: 'url("/img/landing-hero-bg.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      maxWidth="sm"
    >
      <Container
        sx={{
          width: 1,
          height: 1,
          pt: 10,
          px: 2,
          backdropFilter: "brightness(30%)",
        }}
      >
        {/*                 <SearchBar /> */}
        <SectionTitle
          color="common.white"
          variant="h2"
          sx={{
            mt: 5,
          }}
        >
          FINANCIAMIENTO SOSTENIBLE
        </SectionTitle>
        <Title
          color="common.white"
          variant="h1"
          width="15rem"
          sx={{
            pr: 10,
            mt: {
              xs: 1,
              md: 4,
            },
          }}
        >
          Impulsamos el desarrollo de finanzas de impacto, liderando la
          transición hacia un modelo financiero sostenible
        </Title>
      </Container>
    </Box>
  );
};
