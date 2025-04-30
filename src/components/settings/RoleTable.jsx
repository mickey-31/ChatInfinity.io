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
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const RoleTable = ({ roles, loading, error, onEdit, onDelete }) => {
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
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.roleId}>
              <TableCell sx={{ color: 'white' }}>{role.roleName}</TableCell>
              <TableCell sx={{ color: 'white' }}>{role.roleDescr}</TableCell>
              <TableCell>
                <IconButton 
                  size="small" 
                  onClick={() => onEdit(role.roleId)}
                  sx={{ color: '#4285F4' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(role.roleId)}
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

export default RoleTable;