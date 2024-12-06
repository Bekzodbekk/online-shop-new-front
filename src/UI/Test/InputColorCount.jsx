import React from 'react';
import { Box, Input, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

const ColorInput = styled(Input)({
    width: '60px',
    height: '40px',
    padding: '0',
    '& input[type="color"]': {
        width: '100%',
        height: '100%',
        padding: '0',
        border: 'none',
        cursor: 'pointer',
        '&::-webkit-color-swatch-wrapper': {
            padding: '0',
        },
        '&::-webkit-color-swatch': {
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
        },
    },
});

const InputColorCount = ({ color, onCountChange }) => {
    const handleInputChange = (e) => {
        const count = parseInt(e.target.value) || 0;
        onCountChange(color, count);
    };

    return (
        <Box sx={{ minWidth: 120, margin: "10px 0" }}>
            <FormControl fullWidth size="small">
                <Box sx={{display: "flex", gap: "10px"}}>
                    <ColorInput
                        type="color"
                        value={color}
                        disableUnderline
                        disabled
                    />
                    <input 
                        defaultValue={0} 
                        type="number" 
                        style={{width: "100px"}}
                        onChange={handleInputChange}
                    />
                </Box>
            </FormControl>
        </Box>
    );
};

export default InputColorCount;