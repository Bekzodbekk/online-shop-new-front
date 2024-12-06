import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function ColorBox({ color, count, isSelected, onClick }) {
  // Create a theme with custom primary color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#007FFF',
      },
    },
  });

  const handleClick = (e) => {
    if (count === 0) return; // If count is 0, do nothing
    e.stopPropagation();
    onClick(color);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: count === 0 ? "not-allowed" : "pointer",
          width: 40,
          height: 40,
          borderRadius: 1,
          bgcolor: color,
          border: isSelected
            ? `2px solid red`
            : `1px solid ${color}`,
          boxShadow: isSelected
            ? '0 0 0 1px white, 0 0 0 1px red'
            : 'none',
          opacity: count === 0 ? 0.5 : 1,
          pointerEvents: count === 0 ? 'none' : 'auto',
          transition: 'all 0.2s ease',
          '&:hover': {
            opacity: count === 0 ? 0.5 : 0.8,
            transform: count === 0 ? 'none' : 'scale(1.05)',
          },
        }}
      >
        <p style={{
          color: "#fff",
          margin: 0,
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}>
          {count}
        </p>
      </Box>
    </ThemeProvider>
  );
}