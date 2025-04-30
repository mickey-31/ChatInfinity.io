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
  Search as SearchIcon
} from '@mui/icons-material';
import RoleTable from './RoleTable';
import RoleForm from './RoleForm';
import roleService from '../../services/roleService';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await roleService.getRoles();
      
      if (response.isSuccess && response.data) {
        setRoles(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch roles');
      }
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError(err.message || 'An error occurred while fetching roles');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (roleId) => {
    setFormLoading(true);
    setFormError(null);
    
    try {
      const response = await roleService.getRoleById(roleId);
      
      if (response.isSuccess && response.data && response.data.length > 0) {
        setSelectedRole(response.data[0]);
        setFormOpen(true);
      } else {
        throw new Error(response.message || 'Failed to fetch role details');
      }
    } catch (err) {
      console.error('Error fetching role details:', err);
      setFormError(err.message || 'An error occurred while fetching role details');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        const response = await roleService.deleteRole(roleId);
        
        if (response.isSuccess) {
          // Show success message or notification
          alert('Role deleted successfully');
          // Refresh the role list
          fetchRoles();
        } else {
          throw new Error(response.message || 'Failed to delete role');
        }
      } catch (err) {
        console.error('Error deleting role:', err);
        alert(err.message || 'An error occurred while deleting the role');
      }
    }
  };

  const handleAddRole = () => {
    setSelectedRole(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setFormError(null);
  };

  const handleFormSubmit = async (roleData) => {
    setFormLoading(true);
    setFormError(null);
    
    try {
      let response;
      
      if (roleData.roleId) {
        // Update existing role
        response = await roleService.updateRole(roleData.roleId, roleData);
      } else {
        // Create new role
        response = await roleService.createRole(roleData);
      }
      
      if (response.isSuccess) {
        setFormOpen(false);
        fetchRoles(); // Refresh role list
      } else {
        throw new Error(response.message || 'Failed to save role');
      }
    } catch (err) {
      console.error('Error saving role:', err);
      setFormError(err.message || 'An error occurred while saving role');
    } finally {
      setFormLoading(false);
    }
  };

  // Filter roles based on search query
  const filteredRoles = roles.filter(role => 
    role.roleName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.roleDescr?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Role Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddRole}
        >
          Add Role
        </Button>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="Search roles..."
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
      </Box>
      
      <RoleTable
        roles={filteredRoles}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <RoleForm
        open={formOpen}
        onClose={handleFormClose}
        role={selectedRole}
        onSubmit={handleFormSubmit}
        isLoading={formLoading}
        error={formError}
      />
    </Box>
  );
};

export default RoleManagement;