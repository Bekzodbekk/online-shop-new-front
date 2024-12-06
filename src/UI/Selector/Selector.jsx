import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Selector({ title = "Age", menuItems = ["Ten", "Twenty", "Thirty"], value, onChange, error = false }) {
  // Agar tashqaridan value va onChange propslar kelmasa, ichki state ishlatamiz
  const [innerValue, setInnerValue] = useState('');
  
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    } else {
      setInnerValue(event.target.value);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        error={error}
        size="small"
        sx={{ height: 40 }}
      >
        <InputLabel sx={{ fontSize: 14 }}>{title}</InputLabel>
        <Select
          value={onChange ? value : innerValue}
          label={title}
          onChange={handleChange}
          sx={{
            height: 40,
            fontSize: 14,
          }}
        >
          {menuItems.map((elem, idx) => (
            <MenuItem
              key={idx}
              value={elem}
              sx={{ fontSize: 14, padding: '4px 8px' }}
            >
              {elem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}