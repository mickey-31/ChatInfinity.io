import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from '@mui/icons-material';
import UserTable from './UserTable';
import UserForm from '../UserForm';
import apiService from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="Search users..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
              color: 'white',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: 'white' }}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 1 }}>
            Page 1 of 1
          </Typography>
          <IconButton sx={{ color: 'white' }}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
      
      <UserTable 
        users={filteredUsers}
        roles={roles}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
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

export default UserManagement;