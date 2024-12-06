import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({
  label, 
  value, 
  onChange, 
  error, 
  helperText,
  required = false
}) {
  return (
    <Box sx={{ width: "100%", margin: "10px 0px" }}>
      <TextField 
      sx={
        {
          color: "#6B6B6B"
        }
      }
        fullWidth 
        label={label} 
        id="fullWidth"
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        required={required}
      />
    </Box>
  );
}