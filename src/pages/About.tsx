import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Avatar, 
  Grid, 
  Button, 
  Card, 
  CardContent,
  useTheme 
} from '@mui/material';
import { People, Code, BusinessCenter, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface GradientTextProps {
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({ children }) => (
  <Typography
    component="span"
    sx={{
      background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline",
      fontSize: 50
    }}
  >
    {children}
  </Typography>
);
function About() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/')}
          sx={{ 
            color: 'primary.main',
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              opacity: 0.8
            }
          }}
        >
          Back to Home
        </Button>
      </Box>

      <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 800 }}
          >
            <GradientText>Sada Innovations</GradientText>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="md"
            mx="auto"
            sx={{ lineHeight: 1.6 }}
          >
            Language-Agnostic Speaker Identification, Diarization, Transcription, and Translation
          </Typography>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'medium',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Our Focus
        </Typography>
        <Grid container spacing={4}>
          <Grid size={6}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <BusinessCenter sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>Product Excellence</Typography>
                <Typography variant="body1" color="text.secondary">
                  We specialize in creating detailed, user-centric products that solve real-world problems with cutting-edge technology.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Code sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>Technical Innovation</Typography>
                <Typography variant="body1" color="text.secondary">
                  Our development team builds robust, scalable solutions with the latest frameworks and methodologies.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <People sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>Leadership</Typography>
                <Typography variant="body1" color="text.secondary">
                  Guided by visionary CIOs who blend technical expertise with strategic business acumen.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'medium',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Our Leadership
        </Typography>
        <Grid container spacing={4}>
          <Grid size={6}>
            <Card sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                <Avatar sx={{ 
                  width: 100, 
                  height: 100, 
                  mr: { sm: 3 }, 
                  mb: { xs: 2, sm: 0 },
                  fontSize: '2.5rem'
                }}>
                  MS
                </Avatar>
                <Box textAlign={{ xs: 'center', sm: 'left' }}>
                  <Typography variant="h5">Mohammad Sabeel</Typography>
                  <Typography color="text.secondary" gutterBottom>Chief Information Officer</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Technology strategist with a focus on digital transformation and enterprise architecture.
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                <Avatar sx={{ 
                  width: 100, 
                  height: 100, 
                  mr: { sm: 3 }, 
                  mb: { xs: 2, sm: 0 },
                  fontSize: '2.5rem'
                }}>
                  DA
                </Avatar>
                <Box textAlign={{ xs: 'center', sm: 'left' }}>
                  <Typography variant="h5">Mohammad Danish Ali</Typography>
                  <Typography color="text.secondary" gutterBottom>Chief Information Officer</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Expert in cloud solutions and data-driven decision making systems.
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'medium',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Development Team
        </Typography>
        <Card sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
          <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
            <Avatar sx={{ 
              width: 100, 
              height: 100, 
              mr: { sm: 3 }, 
              mb: { xs: 2, sm: 0 },
              fontSize: '2.5rem'
            }}>
              SS
            </Avatar>
            <Box textAlign={{ xs: 'center', sm: 'left' }}>
              <Typography variant="h5">Sohail Sheikh</Typography>
              <Typography color="text.secondary" gutterBottom>Lead Developer</Typography>
              <Typography variant="body1" color="text.secondary">
                Full-stack developer specializing in creating seamless user experiences and high-performance applications.
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box sx={{ 
        mt: 10, 
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        p: 6,
        borderRadius: 2,
        boxShadow: theme.shadows[2]
      }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>
          Ready to experience our solutions?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Contact us to discover how our solutions can transform your business or try our demo now.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/demo')} // Update this path as needed
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 'bold'
            }}
          >
            Try Demo
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/contact')} // Update this path as needed
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 'bold'
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default About;