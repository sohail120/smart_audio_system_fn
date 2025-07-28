// src/App.js
import { Button, Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: 100 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to MUI in React!
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
}

export default App;
