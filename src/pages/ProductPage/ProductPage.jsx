import React, { useEffect, useState } from 'react';
import "./ProductPage.scss";
import Button from '../../components/Button/Button';
import ProductItem from '../../components/ProductItem/ProductItem';
import AddProductModalWindow from '../../components/AddProductModalWindow/AddProductModalWindow';
import { FilterProduct } from '../../API/api';

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getSearchInputValue, setGetSearchInputValue] = useState("");
  const [getDataAPI, setGetDataAPI] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // Xatolarni saqlash uchun state

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await FilterProduct(getSearchInputValue);
        if (result && result.length > 0) {
          setGetDataAPI(result);
          setErrorMessage(""); // Xatolik yo'q bo'lsa, xabarni tozalash
        } else {
          setGetDataAPI([]);
          setErrorMessage("Bunday mahsulot topilmadi"); // Xatolik xabari
        }
      } catch (error) {
        console.error('Xatolik:', error);
        setErrorMessage("Ma'lumotni yuklashda xatolik yuz berdi");
      }
    };

    fetchProducts();
  }, [getSearchInputValue]);

  const getSearchInputValueHandle = (e) => {
    setGetSearchInputValue(e.target.value);
  };

  return (
    <div className='product_page'>
      <div className="product_page_con">
        <div className="search">
          <input
            onChange={getSearchInputValueHandle}
            placeholder={"Ma'lumotni kiriting..."}
            type="text" />
          <Button label={"Add Product"} openModalWindow={handleOpenModal} />
        </div>
        <div className="product_items">
          {errorMessage ? (
            <p className="error_message">{errorMessage}</p> // Xatolik xabarini chiqarish
          ) : (
            getDataAPI.map((item, idx) => (
              <ProductItem id={item.id} key={idx} item={item} />
            ))
          )}
        </div>
      </div>
      <AddProductModalWindow open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductPage;
