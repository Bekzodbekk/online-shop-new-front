import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ColorPicker from "../ColorPicker/ColorPicker";
import { Alert, TextField, Button, FormHelperText } from '@mui/material';
import ButtonUI from '../../UI/Button/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Selector from '../../UI/Selector/Selector';
import InputColorCount from '../../UI/Test/InputColorCount';
import { CreateProduct } from '../../API/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    maxHeight: '90vh',
    overflowY: 'auto',
    pt: 2,
    px: 4,
    pb: 3,
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



const EnhancedInput = ({ label, value, onChange, error, helperText }) => {
    return (
        <Box sx={{ width: "100%", margin: "8px 0px" }}>
            <TextField
                fullWidth
                label={label}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                size="small"
                sx={{
                    '& .MuiInputBase-root': {
                        height: '40px'
                    },
                    '& .MuiInputLabel-root': {
                        transform: 'translate(14px, 8px) scale(1)'
                    },
                    '& .MuiInputLabel-shrink': {
                        transform: 'translate(14px, -9px) scale(0.75)'
                    },
                }}
            />
        </Box>
    );
};

const AddProductModalWindow = ({ open, onClose }) => {
    const initialFormState = {
        productName: '',
        productNumber: '',
        productID: '',
        productCount: '',
        productPrice: '',
        colorsCount: {},
        size: '',
        files: []
    };

    const [colorsArray, setColorsArray] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (colorsArray.length > 0 && errors.colorsCount) {
            setErrors(prev => ({
                ...prev,
                colorsCount: ''
            }));
            setShowError(false);
        }
    }, [colorsArray, errors.colorsCount]);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            files: uploadedFiles
        }));

        if (uploadedFiles.length > 0 && errors.files) {
            setErrors(prev => ({
                ...prev,
                files: ''
            }));
            setShowError(false);
        }
    }, [uploadedFiles, errors.files]);

    const resetForm = () => {
        setFormData(initialFormState);
        setColorsArray([]);
        setUploadedFiles([]);
        setErrors({});
        setShowError(false);
        setSubmitError('');

        if (document.querySelector('input[type="file"]')) {
            document.querySelector('input[type="file"]').value = '';
        }
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        console.log('Yuklangan fayllar:', files);
        setUploadedFiles(files);
    };

    const handleColorCountChange = (color, count) => {
        setFormData(prev => ({
            ...prev,
            colorsCount: {
                ...prev.colorsCount,
                [color]: parseInt(count) || 0
            }
        }));

        if (errors.colorsCount) {
            setErrors(prev => ({
                ...prev,
                colorsCount: ''
            }));
            setShowError(false);
        }
    };

    const getColorsArray = (colors) => {
        console.log('Kelgan ranglar:', colors);
        setColorsArray(colors);

        const newColorsCount = {};
        colors.forEach(color => {
            newColorsCount[color] = formData.colorsCount[color] || 0;
        });

        setFormData(prev => ({
            ...prev,
            colorsCount: newColorsCount
        }));
    };

    const handleSizeChange = (selectedSize) => {
        console.log('Tanlangan o\'lcham:', selectedSize);
        setFormData(prev => ({
            ...prev,
            size: selectedSize
        }));

        if (errors.size) {
            setErrors(prev => ({
                ...prev,
                size: ''
            }));
            setShowError(false);
        }
    };

    const handleInputChange = (field) => (event) => {
        const newValue = event.target.value;
        console.log(`${field} o'zgartirildi:`, newValue);

        setFormData(prev => ({
            ...prev,
            [field]: newValue
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
            setShowError(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.productName.trim()) {
            newErrors.productName = 'Mahsulot nomi kiritilishi shart';
            isValid = false;
        }

        if (!formData.productCount.trim()) {
            newErrors.productCount = 'Mahsulot soni kiritilishi shart';
            isValid = false;
        } else if (isNaN(formData.productCount) || parseInt(formData.productCount) <= 0) {
            newErrors.productCount = 'Mahsulot soni musbat son bo\'lishi kerak';
            isValid = false;
        }

        if (!formData.productPrice.trim()) {
            newErrors.productPrice = 'Mahsulot narxi kiritilishi shart';
            isValid = false;
        } else if (isNaN(formData.productPrice) || parseFloat(formData.productPrice) <= 0) {
            newErrors.productPrice = 'Mahsulot narxi musbat son bo\'lishi kerak';
            isValid = false;
        }

        if (!formData.productID.trim()) {
            newErrors.productID = 'Mahsulot ID kiritilishi shart';
            isValid = false;
        } else if (isNaN(formData.productID) || parseInt(formData.productID) <= 0) {
            newErrors.productID = 'Mahsulot ID musbat son bo\'lishi kerak';
            isValid = false;
        }

        if (!formData.size) {
            newErrors.size = 'O\'lcham tanlanishi shart';
            isValid = false;
        }

        const totalColorsCount = Object.values(formData.colorsCount).reduce((sum, count) =>
            sum + (parseInt(count) || 0), 0);

        if (totalColorsCount === 0 || colorsArray.length === 0) {
            newErrors.colorsCount = 'Kamida bitta rang va miqdor kiritilishi shart';
            isValid = false;
        }

        if (!formData.files || formData.files.length === 0) {
            newErrors.files = 'Kamida bitta fayl yuklash kerak';
            isValid = false;
        }

        setErrors(newErrors);
        setShowError(Object.keys(newErrors).length > 0);
        return isValid;
    };

    const handleSubmit = async () => {
        setSubmitError('');

        if (validateForm()) {
            setIsLoading(true);
            try {
                const submitFormData = new FormData();

                // File upload
                if (formData.files && formData.files.length > 0) {
                    submitFormData.append('file', formData.files[0]);
                }

                // Create product request object according to proto schema
                const productData = {
                    name: formData.productName,
                    unique_number: formData.productNumber,
                    bag_id: formData.productID,
                    price: parseInt(formData.productPrice),
                    size: formData.size,
                    colors: formData.colorsCount,
                    count: parseInt(formData.productCount)
                };

                // Add product data as JSON string
                submitFormData.append('product', JSON.stringify(productData));

                const response = CreateProduct(submitFormData)
                console.log('Mahsulot muvaffaqiyatli qo\'shildi:', response);
                // const response = await fetch(`${API_ADDPRODUCT_ENDPOINT}`, {
                //     method: 'POST',
                //     body: submitFormData
                // });

                // if (!response.ok) {
                //     const errorData = await response.json();
                //     throw new Error(errorData.error || 'Server xatosi yuz berdi');
                // }

                // const result = await response.json();
                
                resetForm();
                onClose();
            } catch (error) {
                console.error('Xatolik yuz berdi:', error);
                setSubmitError(error.message || 'Mahsulotni qo\'shishda xatolik yuz berdi');
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{
                ...style,
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                },
            }}>
                {(showError && Object.keys(errors).length > 0) && (
                    <Alert severity="error" sx={{ mb: 1 }}>
                        Iltimos, barcha maydonlarni to'g'ri to'ldiring
                    </Alert>
                )}

                {submitError && (
                    <Alert severity="error" sx={{ mb: 1 }}>
                        {submitError}
                    </Alert>
                )}

                <EnhancedInput
                    label="Mahsulot nomi"
                    value={formData.productName}
                    onChange={handleInputChange('productName')}
                    error={!!errors.productName}
                    helperText={errors.productName}
                />

                <EnhancedInput
                    label="Mahsulot unikal raqami"
                    value={formData.productNumber}
                    onChange={handleInputChange('productNumber')}
                    error={!!errors.productNumber}
                    helperText={errors.productNumber}
                />

                <EnhancedInput
                    label="Mahsulot ID"
                    value={formData.productID}
                    onChange={handleInputChange('productID')}
                    error={!!errors.productID}
                    helperText={errors.productID}
                />

                <Box sx={{ width: "100%", margin: "8px 0px" }}>
                    <Selector
                        title="O'lcham"
                        menuItems={["L", "M", "S"]}
                        value={formData.size}
                        onChange={handleSizeChange}
                        error={!!errors.size}
                    />
                    {errors.size && (
                        <FormHelperText error>
                            {errors.size}
                        </FormHelperText>
                    )}
                </Box>

                <EnhancedInput
                    label="Mahsulot soni"
                    value={formData.productCount}
                    onChange={handleInputChange('productCount')}
                    error={!!errors.productCount}
                    helperText={errors.productCount}
                />

                <EnhancedInput
                    label="Mahsulot narxi"
                    value={formData.productPrice}
                    onChange={handleInputChange('productPrice')}
                    error={!!errors.productPrice}
                    helperText={errors.productPrice}
                />

                <Box sx={{ width: "100%", margin: "8px 0px" }}>
                    <ColorPicker
                        getColorsHandleFunc={getColorsArray}
                    />
                    {errors.colorsCount && (
                        <FormHelperText error>
                            {errors.colorsCount}
                        </FormHelperText>
                    )}
                </Box>

                {colorsArray.map((elm, idx) => (
                    <InputColorCount
                        key={idx}
                        color={elm}
                        onCountChange={handleColorCountChange}
                    />
                ))}

                <Box sx={{ mt: 1, mb: 1 }}>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{ marginRight: 2, height: '40px' }}
                        disabled={isLoading}
                    >
                        Fayl yuklash
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileUpload}
                            multiple
                        />
                    </Button>
                    {uploadedFiles.length > 0 && (
                        <span>{uploadedFiles.length} ta fayl yuklandi</span>
                    )}
                    {errors.files && (
                        <FormHelperText error>
                            {errors.files}
                        </FormHelperText>
                    )}
                </Box>

                <Box sx={{ mt: 1 }}>
                    <ButtonUI
                        content={isLoading ? "Yuklanmoqda..." : "Yangi mahsulot qo'shish"}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default AddProductModalWindow