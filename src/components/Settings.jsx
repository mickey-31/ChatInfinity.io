import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Pagination,
  CircularProgress,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSettingTab, setActiveSettingTab] = useState(1); // 0: Dashboard, 1: User, 2: General
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const navigate = useNavigate();

  // Fetch users when component mounts or when search/pagination changes
  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the API
      // const response = await userService.getUsers({
      //   page,
      //   limit,
      //   search: searchTerm
      // });
      
      // For now, use mock data
      setTimeout(() => {
        const mockUsers = [
          {
            id: 1,
            name: 'Admin',
            email: 'admin@gmail.com',
            mobile: '1234567890',
            tenant: 'demo',
            roles: ['admin']
          },
          {
            id: 2,
            name: 'Yogesh Pandey',
            email: 'yogesh@gmail.com',
            mobile: '32526262',
            tenant: 'demo',
            roles: ['admin', 'finance']
          }
        ];
        
        setUsers(mockUsers);
        setTotal(mockUsers.length);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      setLoading(false);
      console.error('Error fetching users:', err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSettingTabChange = (tabIndex) => {
    setActiveSettingTab(tabIndex);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleBackToChat = () => {
    navigate('/home');
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      // In a real app, this would call the API
      // await userService.deleteUser(userToDelete.id);
      
      // For now, just update the UI
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
    // Navigate to edit user page or open edit dialog
  };

  const handleCreateUser = () => {
    console.log('Create new user');
    // Navigate to create user page or open create dialog
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(total / limit);

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      width: '100vw',
      bgcolor: '#121212',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Left Sidebar */}
      <Box sx={{ 
        width: 250, 
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <IconButton 
            color="inherit" 
            onClick={handleBackToChat}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Settings</Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ p: 2 }}>
          <Box 
            onClick={() => handleSettingTabChange(0)}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 1,
              mb: 1,
              cursor: 'pointer',
              bgcolor: activeSettingTab === 0 ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
            }}
          >
            <Box sx={{ 
              mr: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 24,
              height: 24
            }}>
              <span role="img" aria-label="dashboard">🎛️</span>
            </Box>
            <Typography>Dashboard</Typography>
          </Box>

          <Box 
            onClick={() => handleSettingTabChange(1)}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 1,
              mb: 1,
              cursor: 'pointer',
              bgcolor: activeSettingTab === 1 ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
            }}
          >
            <Box sx={{ 
              mr: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 24,
              height: 24
            }}>
              <span role="img" aria-label="users">👥</span>
            </Box>
            <Typography>Users</Typography>
          </Box>

          <Box 
            onClick={() => handleSettingTabChange(2)}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 1,
              mb: 1,
              cursor: 'pointer',
              bgcolor: activeSettingTab === 2 ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
            }}
          >
            <Box sx={{ 
              mr: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 24,
              height: 24
            }}>
              <span role="img" aria-label="roles">⚙️</span>
            </Box>
            <Typography>Roles</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Tabs */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          bgcolor: '#1E1E1E'
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ 
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
            }}
          >
            <Tab label="General Settings" />
            <Tab label="User Settings" />
            <Tab label="Dashboard" />
          </Tabs>
        </Box>

        {/* Content based on active tab */}
        <Box sx={{ 
          flex: 1, 
          p: 3,
          overflow: 'auto',
          bgcolor: '#1E1E1E'
        }}>
          {activeSettingTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Dashboard Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure your dashboard preferences here.
              </Typography>
            </Box>
          )}

          {activeSettingTab === 1 && (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="h6">
                  Users ({total})
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    placeholder="Search users..."
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                        },
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleCreateUser}
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'black',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                      }
                    }}
                  >
                    + Create User
                  </Button>
                </Box>
              </Box>

              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <TableContainer 
                component={Paper} 
                sx={{ 
                  bgcolor: '#1E1E1E', 
                  boxShadow: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 1
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>ROLE</TableCell>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>NAME</TableCell>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>EMAIL</TableCell>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>MOBILE</TableCell>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>TENANT</TableCell>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <CircularProgress size={24} sx={{ color: 'white' }} />
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <Typography color="text.secondary">
                            {searchTerm ? 'No users found matching your search.' : 'No users available.'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {user.roles.map((role, index) => (
                                <Chip 
                                  key={index} 
                                  label={role} 
                                  size="small"
                                  sx={{ 
                                    bgcolor: role === 'admin' ? '#4285F4' : '#34A853',
                                    color: 'white',
                                    borderRadius: '4px',
                                    height: '24px'
                                  }}
                                />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ 
                                  width: 28, 
                                  height: 28,
                                  bgcolor: '#5E5E5E',
                                  fontSize: '0.875rem',
                                  mr: 1
                                }}
                              >
                                {user.name.charAt(0)}
                              </Avatar>
                              {user.name}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{user.email}</TableCell>
                          <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{user.mobile}</TableCell>
                          <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{user.tenant}</TableCell>
                          <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton 
                                size="small" 
                                sx={{ color: 'white' }}
                                onClick={() => handleEditUser(user)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                sx={{ color: 'white' }}
                                onClick={() => handleDeleteClick(user)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total: {total} users
                </Typography>
                {totalPages > 1 && (
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: 'white',
                      },
                      '& .Mui-selected': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  />
                )}
              </Box>
            </Box>
          )}

          {activeSettingTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Roles Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage user roles and permissions here.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            bgcolor: '#1E1E1E',
            color: 'white',
            borderRadius: 1
          }
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Are you sure you want to delete user "{userToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} sx={{ color: 'white' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            sx={{ 
              bgcolor: '#f44336',
              color: 'white',
              '&:hover': {
                bgcolor: '#d32f2f',
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;