import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Chip,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const UserTable = ({ users, roles, loading, error, onEdit, onDelete }) => {
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
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
                  onClick={() => onEdit(user.uid)}
                  sx={{ color: '#4285F4' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(user.uid)}
                  sx={{ color: '#EA4335' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;