import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from '@mui/icons-material';
import UserForm from './UserForm';
import apiService from '../services/api';

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeSection, setActiveSection] = useState('users'); // Default to users section
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Fetch users and roles on component mount
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.get('/api/v1/users');
      
      if (response.isSuccess && response.data) {
        setUsers(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await apiService.get('/api/v1/roles');
      
      if (response.isSuccess && response.data) {
        // Map roles to include colors for display
        const mappedRoles = response.data.map((role, index) => {
          const colors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#673AB7', '#FF5722'];
          return {
            id: role.roleId.toString(),
            name: role.roleName,
            description: role.roleDescr,
            color: colors[index % colors.length]
          };
        });
        setRoles(mappedRoles);
      }
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  const handleEdit = async (uid) => {
    setFormLoading(true);
    setFormError(null);
    
    try {
      const response = await apiService.get(`/api/v1/users/${uid}`);
      
      if (response.isSuccess && response.data && response.data.length > 0) {
        setSelectedUser(response.data[0]);
        setFormOpen(true);
      } else {
        throw new Error(response.message || 'Failed to fetch user details');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      setFormError(err.message || 'An error occurred while fetching user details');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (uid) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await apiService.delete(`/api/v1/users/${uid}`);
        
        if (response.isSuccess) {
          // Show success message or notification
          alert('User deleted successfully');
          // Refresh the user list
          fetchUsers();
        } else {
          throw new Error(response.message || 'Failed to delete user');
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        alert(err.message || 'An error occurred while deleting the user');
      }
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setFormError(null);
  };

  const handleFormSubmit = async (userData) => {
    setFormLoading(true);
    setFormError(null);
    
    try {
      const response = await apiService.post('/api/v1/users', userData);
      
      if (response.isSuccess) {
        setFormOpen(false);
        fetchUsers(); // Refresh user list
      } else {
        throw new Error(response.message || 'Failed to save user');
      }
    } catch (err) {
      console.error('Error saving user:', err);
      setFormError(err.message || 'An error occurred while saving user');
    } finally {
      setFormLoading(false);
    }
  };

  // Render roles as chips
  const renderRoles = (rolesString) => {
    if (!rolesString) return null;
    
    const roleIds = rolesString.split(',');
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {roleIds.map(roleId => {
          const role = roles.find(r => r.id === roleId);
          return (
            <Chip 
              key={roleId} 
              label={role ? role.name : roleId} 
              size="small"
              sx={{ 
                bgcolor: role?.color || '#757575',
                color: 'white',
                fontSize: '0.75rem'
              }}
            />
          );
        })}
      </Box>
    );
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      user.userName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.mobileNo?.toLowerCase().includes(query)
    );
  });

  // Sidebar component
  const renderSidebar = () => {
    return (
      <Box
        sx={{
          width: sidebarCollapsed ? '60px' : '220px',
          height: '100vh',
          bgcolor: '#1E1E1E',
          color: 'white',
          borderRight: '1px solid #333',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 100
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid #333'
          }}
        >
          {!sidebarCollapsed && (
            <Typography variant="h6" component="div">
              Settings
            </Typography>
          )}
          <IconButton
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            sx={{ color: 'white' }}
          >
            {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
        
        <List sx={{ mt: 2 }}>
          <ListItem
            button
            selected={activeSection === 'dashboard'}
            onClick={() => setActiveSection('dashboard')}
            sx={{
              pl: sidebarCollapsed ? 1 : 2,
              pr: sidebarCollapsed ? 1 : 2,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: sidebarCollapsed ? 24 : 40 }}>
              <DashboardIcon />
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Dashboard" />}
          </ListItem>
          
          <ListItem
            button
            selected={activeSection === 'users'}
            onClick={() => setActiveSection('users')}
            sx={{
              pl: sidebarCollapsed ? 1 : 2,
              pr: sidebarCollapsed ? 1 : 2,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: sidebarCollapsed ? 24 : 40 }}>
              <PeopleIcon />
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Users" />}
          </ListItem>
          
          <ListItem
            button
            selected={activeSection === 'general'}
            onClick={() => setActiveSection('general')}
            sx={{
              pl: sidebarCollapsed ? 1 : 2,
              pr: sidebarCollapsed ? 1 : 2,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: sidebarCollapsed ? 24 : 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="General" />}
          </ListItem>
        </List>
      </Box>
    );
  };

  // Dashboard content
  const renderDashboardContent = () => {
    return (
      <Box>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Dashboard Settings
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#202123', color: 'white' }}>
          <Typography variant="body1">
            Dashboard configuration options will be displayed here. You'll be able to customize your dashboard view and preferences.
          </Typography>
        </Paper>
      </Box>
    );
  };

  // Users content
  const renderUsersContent = () => {
    return (
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Box>
            <Typography variant="h5" component="h1">
              Users ({filteredUsers.length})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search users..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
                sx: { 
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  }
                }
              }}
              sx={{ 
                width: 250,
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'white',
                },
              }}
            />
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddUser}
              sx={{ 
                bgcolor: '#4285F4',
                '&:hover': {
                  bgcolor: '#3367d6',
                },
                textTransform: 'none'
              }}
            >
              Create User
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#f44336' }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : (
          <Paper sx={{ 
            width: '100%', 
            overflow: 'hidden',
            bgcolor: '#202123',
            color: 'white',
            borderRadius: 1
          }}>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      ROLE
                    </TableCell>
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      NAME
                    </TableCell>
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      EMAIL
                    </TableCell>
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      MOBILE
                    </TableCell>
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      TENANT
                    </TableCell>
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold',
                      width: '100px'
                    }}>
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow 
                        key={user.uid}
                        hover
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'rgba(255,255,255,0.05)' 
                          }
                        }}
                      >
                        <TableCell sx={{ color: 'white' }}>
                          {renderRoles(user.roles)}
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          {user.userName}
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          {user.email}
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          {user.mobileNo}
                        </TableCell>
                        <TableCell sx={{ color: 'white' }}>
                          {user.tenantCode}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleEdit(user.uid)}
                              sx={{ color: '#4285F4' }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleDelete(user.uid)}
                              sx={{ color: '#EA4335' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell 
                        colSpan={6} 
                        align="center"
                        sx={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            {/* Pagination */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              p: 2,
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total: {filteredUsers.length} users
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button 
                  size="small" 
                  startIcon={<KeyboardArrowLeftIcon />}
                  sx={{ color: 'white', minWidth: 'auto' }}
                >
                  Previous
                </Button>
                <Typography variant="body2" sx={{ color: 'white', mx: 1 }}>
                  1
                </Typography>
                <Button 
                  size="small" 
                  endIcon={<KeyboardArrowRightIcon />}
                  sx={{ color: 'white', minWidth: 'auto' }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    );
  };

  // General content
  const renderGeneralContent = () => {
    return (
      <Box>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          General Settings
        </Typography>
        <Paper sx={{ p: 3, bgcolor: '#202123', color: 'white' }}>
          <Typography variant="body1">
            General application settings will be displayed here. You'll be able to configure global preferences.
          </Typography>
        </Paper>
      </Box>
    );
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboardContent();
      case 'users':
        return renderUsersContent();
      case 'general':
        return renderGeneralContent();
      default:
        return renderUsersContent();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      bgcolor: '#343541',
      color: 'white',
      minHeight: '100vh'
    }}>
      {/* Sidebar */}
      {renderSidebar()}
      
      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        ml: sidebarCollapsed ? '60px' : '220px',
        transition: 'margin-left 0.3s ease',
        width: `calc(100% - ${sidebarCollapsed ? '60px' : '220px'})`,
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          gap: 1
        }}>
          <IconButton 
            onClick={() => window.history.back()}
            sx={{ color: 'white' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1">
            Settings
          </Typography>
        </Box>
        
        {/* Content Area */}
        <Box sx={{ mt: 2 }}>
          {renderContent()}
        </Box>
      </Box>

      {/* User Form Dialog */}
      <UserForm
        open={formOpen}
        onClose={handleFormClose}
        user={selectedUser}
        roles={roles}
        onSubmit={handleFormSubmit}
        isLoading={formLoading}
        error={formError}
      />
    </Box>
  );
};

export default Settings;