import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: '#2D2D2D'
    },
  },
};

// Mock data for pages and models - replace with actual data from API
const availablePages = [
  { id: '1', name: 'Dashboard' },
  { id: '2', name: 'Users' },
  { id: '3', name: 'Roles' },
  { id: '4', name: 'Settings' },
];

const availableModels = [
  { id: '1', name: 'GPT-3.5' },
  { id: '2', name: 'GPT-4' },
  { id: '3', name: 'Claude' },
  { id: '4', name: 'Gemini' },
];

const RoleForm = ({ open, onClose, role, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    roleName: '',
    roleDescr: '',
    pages: [],
    models: []
  });

  // Initialize form with role data when editing
  useEffect(() => {
    if (role) {
      setFormData({
        roleName: role.roleName || '',
        roleDescr: role.roleDescr || '',
        pages: role.pages ? role.pages.split(',') : [],
        models: role.models ? role.models.split(',') : []
      });
    } else {
      // Reset form for new role
      setFormData({
        roleName: '',
        roleDescr: '',
        pages: [],
        models: []
      });
    }
  }, [role, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePagesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      pages: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleModelsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      models: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert arrays to comma-separated strings
    const submitData = {
      ...formData,
      pages: formData.pages.join(','),
      models: formData.models.join(',')
    };
    
    // If editing, add the roleId
    if (role && role.roleId) {
      submitData.roleId = role.roleId;
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
      <DialogTitle>{role ? 'Edit Role' : 'Create Role'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#f44336' }}>
              {error}
            </Alert>
          )}
          
          <TextField
            margin="dense"
            name="roleName"
            label="Role Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.roleName}
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
            name="roleDescr"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.roleDescr}
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
          
          <FormControl 
            fullWidth 
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
          >
            <InputLabel id="pages-label">Pages Access</InputLabel>
            <Select
              labelId="pages-label"
              id="pages"
              multiple
              name="pages"
              value={formData.pages}
              onChange={handlePagesChange}
              input={<OutlinedInput id="select-pages" label="Pages Access" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const page = availablePages.find(p => p.id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={page ? page.name : value} 
                        sx={{ bgcolor: '#4285F4', color: 'white' }}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {availablePages.map((page) => (
                <MenuItem 
                  key={page.id} 
                  value={page.id}
                  sx={{ 
                    color: 'white',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(66, 133, 244, 0.2)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(66, 133, 244, 0.3)',
                    },
                  }}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl 
            fullWidth
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
          >
            <InputLabel id="models-label">Models Access</InputLabel>
            <Select
              labelId="models-label"
              id="models"
              multiple
              name="models"
              value={formData.models}
              onChange={handleModelsChange}
              input={<OutlinedInput id="select-models" label="Models Access" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const model = availableModels.find(m => m.id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={model ? model.name : value} 
                        sx={{ bgcolor: '#34A853', color: 'white' }}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {availableModels.map((model) => (
                <MenuItem 
                  key={model.id} 
                  value={model.id}
                  sx={{ 
                    color: 'white',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(52, 168, 83, 0.3)',
                    },
                  }}
                >
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} sx={{ color: 'white' }}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : (role ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RoleForm;