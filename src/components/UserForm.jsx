import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  CircularProgress,
  Alert
} from '@mui/material';

const UserForm = ({ open, onClose, user, roles, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    mobileNo: '',
    tenantCode: 'demo',
    company_id: 71417,
    password: '',
    confirmPassword: '',
    api_key: 'sk-abc1234',
    roles: []
  });

  // Initialize form with user data when editing
  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || '',
        email: user.email || '',
        mobileNo: user.mobileNo || '',
        tenantCode: user.tenantCode || 'demo',
        company_id: user.company_id || 71417,
        password: '',
        confirmPassword: '',
        api_key: user.api_key || 'sk-abc1234',
        roles: user.roles ? user.roles.split(',') : []
      });
    } else {
      // Reset form for new user
      setFormData({
        userName: '',
        email: '',
        mobileNo: '',
        tenantCode: 'demo',
        company_id: 71417,
        password: '',
        confirmPassword: '',
        api_key: 'sk-abc1234',
        roles: []
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRolesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      roles: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert roles array to comma-separated string
    const submitData = {
      ...formData,
      roles: formData.roles.join(',')
    };
    
    // If editing, add the uid
    if (user && user.uid) {
      submitData.uid = user.uid;
    }
    
    onSubmit(submitData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: '#1E1E1E',
          color: 'white',
          borderRadius: 1
        }
      }}
    >
      <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#f44336' }}>
              {error}
            </Alert>
          )}
          
          <TextField
            margin="dense"
            name="userName"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.userName}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
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
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          />
          
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
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
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          />
          
          <TextField
            margin="dense"
            name="mobileNo"
            label="Mobile Number"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.mobileNo}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
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
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          />
          
          <TextField
            margin="dense"
            name="tenantCode"
            label="Tenant Code"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.tenantCode}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
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
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          />
          
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required={!user}
            sx={{
              mb: 2,
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
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          />
          
          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={!user}
            sx={{
              mb: 2,
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
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          />
          
          <FormControl 
            fullWidth
            sx={{
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
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          >
            <InputLabel id="roles-label">Roles</InputLabel>
            <Select
              labelId="roles-label"
              id="roles"
              multiple
              name="roles"
              value={formData.roles}
              onChange={handleRolesChange}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const role = roles.find(r => r.id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={role ? role.name : value} 
                        sx={{ 
                          bgcolor: role?.color || '#757575',
                          color: 'white'
                        }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={onClose} 
            sx={{ color: 'white' }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ 
              bgcolor: '#4285F4',
              '&:hover': {
                bgcolor: '#3367d6',
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              user ? 'Update' : 'Create'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;