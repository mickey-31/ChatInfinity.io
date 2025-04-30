import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  People as PeopleIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  AssignmentInd as RolesIcon
} from '@mui/icons-material';

const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      sx={{
        width: collapsed ? 60 : 240,
        flexShrink: 0,
        bgcolor: '#1A1A1A',
        height: '100%',
        transition: 'width 0.2s',
        position: isMobile ? 'absolute' : 'relative',
        zIndex: 10,
        left: isMobile && collapsed ? -60 : 0,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      <List>
        <ListItem
          button
          selected={activeSection === 'dashboard'}
          onClick={() => setActiveSection('dashboard')}
          sx={{
            pl: collapsed ? 1 : 2,
            py: 1.5,
            '&.Mui-selected': {
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: collapsed ? 36 : 56 }}>
            <DashboardIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Dashboard" />}
        </ListItem>
        <ListItem
          button
          selected={activeSection === 'users'}
          onClick={() => setActiveSection('users')}
          sx={{
            pl: collapsed ? 1 : 2,
            py: 1.5,
            '&.Mui-selected': {
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: collapsed ? 36 : 56 }}>
            <PeopleIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Users" />}
        </ListItem>
        <ListItem
          button
          selected={activeSection === 'roles'}
          onClick={() => setActiveSection('roles')}
          sx={{
            pl: collapsed ? 1 : 2,
            py: 1.5,
            '&.Mui-selected': {
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: collapsed ? 36 : 56 }}>
            <RolesIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Roles" />}
        </ListItem>
        <ListItem
          button
          selected={activeSection === 'settings'}
          onClick={() => setActiveSection('settings')}
          sx={{
            pl: collapsed ? 1 : 2,
            py: 1.5,
            '&.Mui-selected': {
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: collapsed ? 36 : 56 }}>
            <SettingsIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Settings" />}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;