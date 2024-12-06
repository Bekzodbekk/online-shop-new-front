import React, { useEffect, useState } from 'react';
import "./debtInfo.scss";
import ButtonUI from '../../UI/Button/Button';
import DebtPaymentModal from '../DebtPage/DebtPaymentModal/DebtPaymanetModal';  // Adjust path according to your project structure
import { GetDebtByIdAPI } from '../../API/api';
import { useParams } from 'react-router-dom';

const DebtInfo = () => {
  const [openModal, setOpenModal] = useState(false);  // State to control modal visibility
  const [getDataAPI, setGetDataAPI] = useState([])
  const { id } = useParams("id")

  useEffect(() => {
    const fetchDebtAPI = async () => {
      try {
        const result = await GetDebtByIdAPI(id)
        setGetDataAPI(result.debt)
      } catch (e) {
        console.error(e)
      }
    }
    fetchDebtAPI()
  }, [id])


  // Handlers to open and close the modal
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  console.log(getDataAPI);

  return (
    <div className='debt_info'>
      <div className="debt_info_con">
        <div className="content">
          <h1>Ism: <span>{getDataAPI.first_name}</span></h1>
          <h1>Familiya: <span>{getDataAPI.last_name}</span></h1>
          <h1>Telefon Raqam: <span>{getDataAPI.phone_number}</span></h1>
          <h1>JSHSHIR: <span>{getDataAPI.jshshir}</span></h1>
          <h1>Narxi: <span>{getDataAPI.price - getDataAPI.price_paid}</span></h1>
          <h1>Address: <span>{getDataAPI.address}</span></h1>
          <h1>Tanishlari: <span>{getDataAPI.acquaintance || "Yo'q"}</span></h1>
          <h1>Garovga narsa: <span>{getDataAPI.collateral || "Yo'q"}</span></h1>
          <h1>Olgan vaqti:
            <span> {getDataAPI?.DebtCUD?.created_at?.slice(0, 10) || 'Ma’lumot yo‘q'}</span>
          </h1>
          <h1>Deadline:
            <span> {getDataAPI?.deadline?.slice(0, 10) || 'Ma’lumot yo‘q'}</span>
          </h1>
        </div>
        <div className="buttons">
          {/* Button to open the payment modal */}
          <ButtonUI content={"Qarzni to'lash"} width={"100%"} onClick={handleModalOpen} />
        </div>
      </div>
      {/* Modal component with open/close state */}
      <DebtPaymentModal
        id={getDataAPI.id}
        isOpen={openModal}
        onClose={handleModalClose} />
    </div>
  );
};

export default DebtInfo;
