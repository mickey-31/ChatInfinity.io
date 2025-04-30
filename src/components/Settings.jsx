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
  Tabs,
  Tab
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AdminPanelSettings as RolesIcon
} from '@mui/icons-material';
import UserForm from './UserForm';
import apiService from '../services/api';

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tabValue, setTabValue] = useState(0); // State for active tab
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  // User Management Tab Content
  const renderUserManagementTab = () => {
    return (
      <>
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
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddUser}
          >
            ADD USER
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#f44336' }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ bgcolor: '#1E1E1E', color: 'white' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mobile</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Roles</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell sx={{ color: 'white' }}>{user.userName}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{user.mobileNo}</TableCell>
                    <TableCell>{renderRoles(user.roles)}</TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(user.uid)}
                        sx={{ color: '#4285F4' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(user.uid)}
                        sx={{ color: '#EA4335' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
  };

  // Roles Tab Content
  const renderRolesTab = () => {
    return (
      <Box>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Roles Management
        </Typography>
        <Typography variant="body1">
          Role management functionality will be implemented here. This section will allow you to create, edit, and delete roles.
        </Typography>
      </Box>
    );
  };

  // Dashboard Tab Content
  const renderDashboardTab = () => {
    return (
      <Box>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Dashboard Settings
        </Typography>
        <Typography variant="body1">
          Dashboard configuration options will be displayed here. You'll be able to customize your dashboard view and preferences.
        </Typography>
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
      {/* Tabs Navigation */}
      <Paper sx={{ 
        width: '100%', 
        bgcolor: '#1E1E1E', 
        color: 'white',
        mb: 3
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="inherit"
          indicatorColor="primary"
          aria-label="settings tabs"
        >
          <Tab 
            icon={<PeopleIcon />} 
            label="User Management" 
            id="settings-tab-0"
            aria-controls="settings-tabpanel-0"
            sx={{ color: 'white' }}
          />
          <Tab 
            icon={<RolesIcon />} 
            label="Roles" 
            id="settings-tab-1"
            aria-controls="settings-tabpanel-1"
            sx={{ color: 'white' }}
          />
          <Tab 
            icon={<DashboardIcon />} 
            label="Dashboard" 
            id="settings-tab-2"
            aria-controls="settings-tabpanel-2"
            sx={{ color: 'white' }}
          />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {renderUserManagementTab()}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderRolesTab()}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderDashboardTab()}
      </TabPanel>

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