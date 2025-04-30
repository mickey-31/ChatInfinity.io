import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    tenantCode: 'demo',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/users/token`, 
        formData
      );
      
      const { data } = response.data;
      
      if (data && data.length > 0) {
        const userData = data[0];
        
        // Store user data in localStorage
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify({
          uid: userData.uid,
          tenantId: userData.tenantId,
          tenantCode: userData.tenantCode,
          email: userData.email,
          isAdmin: userData.isAdmin
        }));
        
        // Navigate to home page after successful login
        navigate('/home');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        'Failed to login. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      m: 0,
      p: 0
    }}>
      {/* Left Side - Banner */}
      {!isMobile && (
        <Box 
          sx={{ 
            flex: 1,
            position: 'relative',
            background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/src/assets/code-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 4,
            m: 0
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              mb: 2
            }}
          >
            chatInfinity
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'white',
              maxWidth: '80%'
            }}
          >
            Experience the future of AI conversation with unlimited possibilities
          </Typography>
        </Box>
      )}

      {/* Right Side - Login Form */}
      <Box 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#000000',
          color: 'white',
          m: 0,
          p: 0
        }}
      >
        <Container maxWidth="xs" sx={{ m: 0, py: 2 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="subtitle1" color="orange" gutterBottom>
              Login to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#f44336' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Organization
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="tenantCode"
              name="tenantCode"
              placeholder="Your organization"
              value={formData.tenantCode}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 2,
                mt: 0,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
              InputProps={{
                style: { color: 'white' }
              }}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Email
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 2,
                mt: 0,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                  color: 'white',
                },
              }}
              InputProps={{
                style: { color: 'white' }
              }}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Password
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 3,
                mt: 0,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                  color: 'white',
                },
              }}
              InputProps={{
                style: { color: 'white' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                bgcolor: '#FF6B00',
                '&:hover': {
                  bgcolor: '#E05E00',
                },
                borderRadius: 1
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;