import { Box, Typography, Card, Button } from "@mui/material";

function LandingPosts() {
  const posts = [];
  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="paragraphs" fontWeight={600}>
        Publicaciones
      </Typography>
      <Typography variant="subtitles" fontWeight={600}>
        Finanzas con impacto
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center">
        {posts?.map((post) => (
          <Card key={post.id} />
        ))}
      </Box>

      <Button
        variant="contained"
        size="small"
        sx={{ borderRadius: 20, textTransform: "none" }}
      >
        <Typography
          variant="paragraphs"
          fontWeight={500}
          sx={{ textTransform: "none" }}
        >
          Ir a publicaciones
        </Typography>
      </Button>
    </Box>
  );
}

export default LandingPosts;
