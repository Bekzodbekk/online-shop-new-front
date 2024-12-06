import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',   
    sm: '550px', 
  },
  maxHeight: '90vh', 
  overflow: 'hidden',
  bgcolor: '#1e1e1e',
  borderRadius: '8px',
  boxShadow: 24,
  padding: "15px 30px",
  color: '#fff',
  textAlign: 'center',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#555',
    },
    '&:hover fieldset': {
      borderColor: '#777',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#007FFF',
    },
  },
};

export default function AddCountModal({ productName, isOpen, onClose }) {
  const [count, setCount] = React.useState('');
  const [error, setError] = React.useState('');

  const validateCount = (value) => {
    // Check if count is a positive number
    if (value === '' || value === null) {
      return 'Miqdor bo\'sh bo\'lmasligi kerak';
    }
    
    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      return 'Faqat son kiritish mumkin';
    }
    
    if (numValue <= 0) {
      return 'Miqdor noldan katta bo\'lishi kerak';
    }
    
    return '';
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCount(value);
    setError(validateCount(value));
  };

  const handleAddCount = () => {
    // Validate count before submission
    const validationError = validateCount(count);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    // If validation passes
    console.log('Added Count:', count);
    
    // Reset fields
    setCount('');
    setError('');
    
    // Close modal
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-count-modal-title"
      sx={{
        '& .MuiModal-backdrop': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        }
      }}
    >
      <Box 
        sx={style} 
        component="form" 
        noValidate 
        autoComplete="off"
      >
        <Typography 
          id="add-count-modal-title" 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ mb: 3 }}
        >
          {productName} mahsulotidan qo'shish
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2,
        }}>
          <TextField
            name="count"
            label="Miqdor"
            variant="outlined"
            fullWidth
            type="number"
            value={count}
            onChange={handleInputChange}
            error={!!error}
            helperText={error}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
        </Box>
        
        <Button
          variant="contained"
          onClick={handleAddCount}
          sx={{ 
            width: "100%", 
            mt: 3,
            bgcolor: '#007FFF'
          }}
        >
          Qo'shish
        </Button>
      </Box>
    </Modal>
  );
}