import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ButtonUI({ width, content, onClick, disabled }) {
  return (
    <Box sx={{ width: width || 'auto' }}>
      <Button
        variant="contained"
        size="large"
        onClick={onClick}
        disabled={disabled}
        fullWidth
      >
        {content}
      </Button>
    </Box>
  );
}