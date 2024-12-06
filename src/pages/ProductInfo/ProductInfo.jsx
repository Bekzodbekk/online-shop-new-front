import React, { useState, useEffect, useCallback, useRef } from 'react';
import ColorBox from '../../UI/ColorBox/ColorBox';
import ButtonUI from '../../UI/Button/Button';
import SellModal from '../ProductPage/SellModal/SellModal';
import DebtModal from '../ProductPage/AddDebtModal/AddDebtModal';
import AddCountModal from '../ProductPage/AddCountModal/AddCountModal';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import "./productInfo.scss";

const ProductInfo = () => {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [isAddCountModalOpen, setIsAddCountModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [dataApi, setDataApi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const defaultColorSet = useRef(false);
  const userSelectedColor = useRef(false);
  const socketRef = useRef(null);

  const connectWebSocket = useCallback(() => {
    const connectWithRetry = () => {
      socketRef.current = new WebSocket(`wss://localhost:9000/products/${id}/ws`);

      socketRef.current.onopen = () => {
        console.log('WebSocket connection established');
        setIsLoading(true);
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setDataApi(data);

          if (data && data.product.colors && !defaultColorSet.current && !userSelectedColor.current) {
            const defaultColor = Object.keys(data.product.colors).find(color => data.product.colors[color] > 0);
            if (defaultColor) {
              setSelectedColor(defaultColor);
              defaultColorSet.current = true;
            }
          }

          setIsLoading(false);
        } catch (err) {
          console.error("Error parsing WebSocket message: ", err);
          setIsLoading(false);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error: ", error);
        setIsLoading(false);

        // Reconnect after 3 seconds
        setTimeout(connectWithRetry, 3000);
      };

      socketRef.current.onclose = (event) => {
        if (event.wasClean) {
          console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
          console.error('WebSocket connection abruptly closed');
          // Attempt reconnection
          setTimeout(connectWithRetry, 3000);
        }
      };
    };

    connectWithRetry();

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [id]);

  useEffect(() => {
    const cleanup = connectWebSocket();
    return () => cleanup();
  }, [connectWebSocket]);

  const handleColorSelection = (color) => {
    if (dataApi.product.colors[color] > 0) {
      setSelectedColor(color);
      userSelectedColor.current = true;
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!dataApi) {
    return (
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">
          Ma'lumotlar topilmadi
        </Typography>
      </Container>
    );
  }

  return (
    <div className='product_info'>
      <div className="product_info_con">
        <div className="product_image">
          <img src={dataApi.image || require("../../Assets/bag.png")} alt={dataApi.name} />
        </div>
        <div className="content">
          <h1>{dataApi.name}</h1>
          <h3>Uniq Number: <span>{dataApi.product.unique_number}</span></h3>
          <h3>Size: <span>{dataApi.product.size}</span></h3>
          <h3>Price: <span>{dataApi.product.price.toLocaleString()} so'm</span></h3>
          <h3>Count: <span>{dataApi.product.count}</span></h3>
          <div className="colors">
            {Object.entries(dataApi.product.colors).map(([color, count]) => (
              <ColorBox
                key={color}
                color={color}
                count={count}
                isSelected={selectedColor === color}
                onClick={() => handleColorSelection(color)}
              />
            ))}
          </div>
        </div>
        <div className="buttons">
          <ButtonUI width={"100%"} content={"Sell"} onClick={() => setIsSellModalOpen(true)} />
          <ButtonUI width={"100%"} content={"Add Debt"} onClick={() => setIsDebtModalOpen(true)} />
          <ButtonUI width={"100%"} content={"Add Count"} onClick={() => setIsAddCountModalOpen(true)} />
        </div>
      </div>
      <SellModal productColor={selectedColor} productID={dataApi.product.id} productPrice={dataApi.product.price} isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />
      <DebtModal
        bagID={dataApi.product.id}
        color={selectedColor}
        isOpen={isDebtModalOpen}
        onClose={() => setIsDebtModalOpen(false)}
      />
      <AddCountModal isOpen={isAddCountModalOpen} onClose={() => setIsAddCountModalOpen(false)} productName={dataApi.name} />
    </div>
  );
};

export default ProductInfo;