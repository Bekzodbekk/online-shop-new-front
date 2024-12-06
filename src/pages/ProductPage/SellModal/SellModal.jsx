import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { UpdateStock } from '../../../API/api';
import { useSnackbar } from 'notistack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1e1e1e',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    color: '#fff',
    textAlign: 'center',
};

export default function SellModal({ isOpen, onClose, productPrice, productColor, productID }) {
    const [price, setPrice] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleSell = () => {
        const formData = {
            product_id: productID,
            product_color: productColor,
            cost_price: productPrice,
            selling_price: parseInt(price)
        }
        const response = UpdateStock(formData)
        enqueueSnackbar("Mahsulot muvaffaqiyatli sotildi!", { variant: "success" })
        console.log('data: ', response);
        setPrice('');
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="sell-modal-title"
            aria-describedby="sell-modal-description"
        >
            <Box sx={style}>
                <Typography id="sell-modal-title" variant="h5" component="h2" gutterBottom>
                    Mahsulotni sotish
                </Typography>
                <TextField
                    label="Narxni kiriting"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    InputProps={{
                        style: { color: '#fff', backgroundColor: '#2e2e2e' },
                    }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSell}
                    disabled={price === ''}
                    sx={{ width: "100%" }}
                >
                    Sotish
                </Button>
            </Box>
        </Modal>
    );
}