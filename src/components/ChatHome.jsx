import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Send as SendIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Archive as ArchiveIcon,
  Mic as MicIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const ChatHome = () => {
  const [message, setMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Get user data from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      // Redirect to login if not authenticated
      navigate('/');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/');
    }
  }, [navigate]);
  
  // Auto-close drawer on mobile
  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/');
  };

  const drawerWidth = 250;

  const suggestions = [
    { title: 'Tell me a fun fact', description: 'Tell me a fun fact about the Roman Empire' },
    { title: 'Grammar check', description: 'rewrite it for better readability' },
    { title: 'Give me ideas', description: 'for what to do with my kid\'s art' }
  ];

  // Get first letter of user's email for avatar
  const getInitial = () => {
    if (!user || !user.email) return '?';
    return user.email.charAt(0).toUpperCase();
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
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#202123',
            color: 'white',
            border: 'none'
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton 
            sx={{ 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.2)', 
              borderRadius: 1,
              p: 1,
              width: '100%',
              justifyContent: 'flex-start'
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            <Typography variant="body2">New Chat</Typography>
          </IconButton>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>
            Today
          </Typography>
          <List>
            <ListItem button sx={{ borderRadius: 1, mb: 1 }}>
              <ListItemText primary="New Chat" />
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ mt: 'auto', p: 2 }}>
          <List>
            <ListItem button>
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Workspace" />
            </ListItem>
            
            <ListItem button component={Link} to="/settings">
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Archived Chats" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 1 }} />
          <ListItem sx={{ px: 1 }}>
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <Avatar sx={{ width: 30, height: 30, bgcolor: '#5E5E5E' }}>
                {getInitial()}
              </Avatar>
            </ListItemIcon>
            <ListItemText 
              primary={user?.email || 'User'} 
              secondary={user?.tenantCode || 'Guest'}
              secondaryTypographyProps={{ color: 'rgba(255,255,255,0.5)' }}
            />
          </ListItem>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#343541',
        color: 'white',
        position: 'relative',
        m: 0,
        p: 0,
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 1, 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          justifyContent: 'space-between'
        }}>
          {isMobile && (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', mx: 'auto' }}>
            <Typography variant="body1">OpenAI Model</Typography>
          </Box>
          <IconButton color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Chat area */}
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Avatar 
            sx={{ 
              width: 60, 
              height: 60, 
              bgcolor: '#10A37F',
              mb: 2
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" gutterBottom>
            Hello, {user?.email?.split('@')[0] || 'User'}
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.7)" gutterBottom>
            Welcome to chatInfinity. How can I help you today?
          </Typography>
          
          {/* Suggestions */}
          <Box sx={{ mt: 4, width: '100%', maxWidth: 600 }}>
            <Typography variant="body2" color="rgba(255,255,255,0.5)" align="center" gutterBottom>
              Hide suggestions
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2,
              justifyContent: 'center',
              mt: 2
            }}>
              {suggestions.map((suggestion, index) => (
                <Paper 
                  key={index}
                  sx={{ 
                    p: 2, 
                    bgcolor: 'rgba(32,33,35,0.8)', 
                    borderRadius: 2,
                    width: { xs: '100%', sm: 'calc(33% - 16px)' },
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(52,53,65,1)' },
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    {suggestion.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    {suggestion.description}
                  </Typography>
                  <Typography variant="caption" color="rgba(255,255,255,0.5)" sx={{ mt: 1, display: 'block' }}>
                    Prompt
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Message input */}
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Box 
            component="form" 
            onSubmit={handleSendMessage}
            sx={{ 
              display: 'flex', 
              width: '100%', 
              maxWidth: 768,
              position: 'relative'
            }}
          >
            <TextField
              fullWidth
              placeholder="Send a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#40414F',
                  color: 'white',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="inherit" size="small">
                      <MicIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      color="inherit" 
                      type="submit"
                      disabled={!message.trim()}
                      size="small"
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ),
              }}
            />
          </Box>
        </Box>
        
        {/* Footer */}
        <Box sx={{ 
          p: 1, 
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.5)'
        }}>
          AI responds in the same language you chat in
        </Box>
      </Box>
    </Box>
  );
};

export default ChatHome;