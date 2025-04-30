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
  useMediaQuery
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
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

  const handleDelete = (uid) => {
    // Implement delete functionality
    console.log('Delete user with ID:', uid);
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

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: '#343541',
      color: 'white',
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" component="h1">
          User Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{ 
            bgcolor: '#4285F4',
            '&:hover': {
              bgcolor: '#3367d6',
            }
          }}
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#f44336' }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ 
        width: '100%', 
        overflow: 'hidden',
        bgcolor: '#202123',
        color: 'white',
        borderRadius: 1
      }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    bgcolor: '#2D2D30', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    Name
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      Email
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell sx={{ 
                      bgcolor: '#2D2D30', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      Mobile
                    </TableCell>
                  )}
                  <TableCell sx={{ 
                    bgcolor: '#2D2D30', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    Roles
                  </TableCell>
                  <TableCell sx={{ 
                    bgcolor: '#2D2D30', 
                    color: 'white',
                    fontWeight: 'bold',
                    width: '120px'
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
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
                        {user.userName}
                      </TableCell>
                      {!isMobile && (
                        <TableCell sx={{ color: 'white' }}>
                          {user.email}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell sx={{ color: 'white' }}>
                          {user.mobileNo}
                        </TableCell>
                      )}
                      <TableCell sx={{ color: 'white' }}>
                        {renderRoles(user.roles)}
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
                      colSpan={isMobile ? 3 : 5} 
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
        )}
      </Paper>

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