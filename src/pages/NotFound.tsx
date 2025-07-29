import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material'; // or your preferred UI library

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
        sx={{ px: 4, py: 2 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
}

export default NotFound;