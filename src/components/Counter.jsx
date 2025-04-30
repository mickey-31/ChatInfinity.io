import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/counter/counterSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h5">Redux Counter</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <Typography variant="h6">{count}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}