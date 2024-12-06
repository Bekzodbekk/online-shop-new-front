import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UpdateStockDebtAPI } from '../../../API/api';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '500px' },
  bgcolor: '#1e1e1e',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  color: '#fff',
  textAlign: 'center',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#555' },
    '&:hover fieldset': { borderColor: '#777' },
    '&.Mui-focused fieldset': { borderColor: '#007FFF' },
  },
};

const DebtPaymentModalContent = ({ isOpen, onClose, id }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validateAmount = (value) => {
    if (!value) return "Summa bo'sh bo'lmasligi kerak";
    if (isNaN(Number(value))) return "Faqat son kiritish mumkin";
    if (Number(value) <= 0) return "Summa musbat son bo'lishi kerak";
    return '';
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmount(value);
    setError(validateAmount(value));
  };

  const handlePayment = async () => {
    const validationError = validateAmount(amount);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const formData = {
        id: id,
        paid_price: amount
      };
      await UpdateStockDebtAPI(formData); // API chaqiruvi kutib ishlaydi
      enqueueSnackbar('Qarz muvaffaqiyatli to\'landi!', { variant: 'success' });
      
      // Modalni yopishdan oldin kechikish
      setTimeout(() => {
        onClose(); // Modalni yopish
        navigate("/debts"); // Qarzlar sahifasiga o'tish
      }, 1500); // 1.5 soniya kutish
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Xatolik yuz berdi!', { variant: 'error' });
    }
    setAmount('');
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="debt-payment-modal">
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom>
          Qarzni To'lash
        </Typography>
        <TextField
          label="To'lov Summasi"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
          InputLabelProps={{ style: { color: '#aaa' } }}
          InputProps={{ style: { color: '#fff', backgroundColor: '#2e2e2e' } }}
          type="number"
        />
        <Button
          variant="contained"
          onClick={handlePayment}
          sx={{ width: '100%', mt: 3, bgcolor: '#007FFF' }}
        >
          To'lash
        </Button>
      </Box>
    </Modal>
  );
};

// Asosiy komponent: SnackbarProvider bilan o'ralgan
export default function DebtPaymentModal({ isOpen, onClose, id }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <DebtPaymentModalContent
        id={id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </SnackbarProvider>
  );
}
