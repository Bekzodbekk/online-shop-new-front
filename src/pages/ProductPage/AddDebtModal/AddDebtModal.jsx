import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { CreateDebtAPI } from '../../../API/api';
import { useNavigate } from 'react-router-dom';

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
  overflow: 'hidden',  // Changed from 'auto' to 'hidden'
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

export default function DebtModal({ isOpen, onClose, bagID, color}) {
  const [deadline, setDeadline] = useState("")
  const navigate = useNavigate()
  
  const [debtDetails, setDebtDetails] = React.useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    jshshir: '',
    address: '',
    acquaintance: '',
    collateral: '',
    price: '',
    deadline: '',
    bag_id: bagID,
    color: color
  });
  

  const [errors, setErrors] = React.useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'first_name':
        return value.trim().length < 2 
          ? 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak' 
          : '';
      case 'last_name':
        return value.trim().length < 2 
          ? 'Familiya kamida 2 ta belgidan iborat bo\'lishi kerak' 
          : '';
      case 'phone_number':
        const phoneRegex = /^(\+?998)?[0-9]{9}$/;
        return !phoneRegex.test(value) 
          ? 'Telefon raqam noto\'g\'ri formatda' 
          : '';
      case 'jshshir':
        const jshshirRegex = /^\d{14}$/;
        return !jshshirRegex.test(value) 
          ? 'JSHSHIR 14 ta raqamdan iborat bo\'lishi kerak' 
          : '';
      case 'address':
        return value.trim() === '' 
          ? 'Manzil bo\'sh bo\'lmasligi kerak' 
          : '';
      case 'price':
        return value <= 0 
          ? 'Qarz miqdori noldan katta bo\'lishi kerak' 
          : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDebtDetails(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate individual field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleAddDebt = () => {
    // Validate all fields before submission
    
    const newErrors = {};
    Object.keys(debtDetails).forEach(key => {
      if (key !== 'acquaintance' && key !== 'collateral') {
        const error = validateField(key, debtDetails[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    // If there are any errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    debtDetails.deadline = deadline
    
    const response = CreateDebtAPI(debtDetails)
    console.log(response);
    
    // If all validations pass
    console.log('Debt Details:', debtDetails);
    
    
    // Reset fields
    setDebtDetails({
      first_name: '',
      last_name: '',
      phone_number: '',
      jshshir: '',
      address: '',
      acquaintance: '',
      collateral: '',
      price: '',
    });
    navigate("/products")
    // Reset errors
    setErrors({});
    
    // Close modal
    onClose();
  };
  
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="debt-modal-title"
      aria-describedby="debt-modal-description"
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
          id="debt-modal-title" 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ mb: 3 }}
        >
          Qarzni qo'shish
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2,
          maxHeight: 'calc(90vh - 200px)', 
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',  // IE and Edge
          scrollbarWidth: 'none'  // Firefox
        }}>
          <TextField
            name="first_name"
            label="Ism"
            variant="outlined"
            fullWidth
            value={debtDetails.first_name}
            onChange={handleInputChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          
          <TextField
            name="last_name"
            label="Familiya"
            variant="outlined"
            fullWidth
            value={debtDetails.last_name}
            onChange={handleInputChange}
            error={!!errors.last_name}
            helperText={errors.last_name}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          
          <TextField
            name="phone_number"
            label="Telefon raqam"
            variant="outlined"
            fullWidth
            value={debtDetails.phone_number}
            onChange={handleInputChange}
            error={!!errors.phone_number}
            helperText={errors.phone_number}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          
          <TextField
            name="jshshir"
            label="JSHSHIR"
            variant="outlined"
            fullWidth
            value={debtDetails.jshshir}
            onChange={handleInputChange}
            error={!!errors.jshshir}
            helperText={errors.jshshir}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          
          <TextField
            name="address"
            label="Manzil"
            variant="outlined"
            fullWidth
            value={debtDetails.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          
          <TextField
            name="acquaintance"
            label="Tanishi"
            variant="outlined"
            fullWidth
            value={debtDetails.acquaintance}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          
          <TextField
            name="collateral"
            label="Gavorga bergan narsasi"
            variant="outlined"
            fullWidth
            value={debtDetails.collateral}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          
          <TextField
            name="price"
            label="Qarz miqdori"
            variant="outlined"
            fullWidth
            type="number"
            value={debtDetails.price}
            onChange={handleInputChange}
            error={!!errors.price}
            helperText={errors.price}
            InputLabelProps={{ style: { color: '#aaa' } }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#2e2e2e' },
            }}
          />
          <input 
          type="date" 
          onChange={(e) => setDeadline(e.target.value)}
          style={{
            padding: "15px 10px",
            border: "2px solid #555555",
            background: "#2E2E2E",
            borderRadius: 3,
            color: "#939393",
            fontSize: "15px"
          }} />
        </Box>
        
        <Button
          variant="contained"
          onClick={handleAddDebt}
          sx={{ 
            width: "100%", 
            mt: 3,
            bgcolor: '#007FFF'
          }}
        >
          Qarz qo'shish
        </Button>
      </Box>
    </Modal>
  );
}