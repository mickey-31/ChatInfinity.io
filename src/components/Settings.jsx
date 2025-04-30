import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Sidebar from './settings/Sidebar';
import UserManagement from './settings/UserManagement';
import RoleManagement from './settings/RoleManagement';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('users'); // Default to users section
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  };

  // Render the active section content
  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'dashboard':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Dashboard</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Dashboard content will be implemented here.
            </Typography>
          </Box>
        );
      case 'settings':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">System Settings</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              System settings content will be implemented here.
            </Typography>
          </Box>
        );
      default:
        return <UserManagement />;
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      bgcolor: '#121212',
      color: 'white'
    }}>
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <IconButton 
            onClick={handleBack}
            sx={{ color: 'white', mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Settings</Typography>
        </Box>
        
        {/* Content Area */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          bgcolor: '#121212'
        }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
