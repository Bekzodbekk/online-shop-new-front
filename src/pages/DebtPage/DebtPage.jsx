import React, { useEffect, useState } from 'react'
import "./debtPage.scss"
import DebtItem from '../../components/DebtItem/DebtItem'
import { GetDebtsByFilterAPI } from '../../API/api'

const DebtPage = () => {
  const [getSearchInputValue, setGetSearchInputValue] = useState("")
  const [GetDataAPI, setGetDataAPI] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const result = await GetDebtsByFilterAPI(getSearchInputValue)
        console.log(result.debt);
        
        if (result && result.getCountResp > 0) {
          setGetDataAPI(result.debt)
          setErrorMessage("")
        } else {
          setGetDataAPI([])
          setErrorMessage("Bunday qarz topilmadi")
        }
      } catch (e) {
        console.error("Xatolik: ", e)
        setErrorMessage("Ma'lumotni yuklashda xatolik yuzaga keldi: ", e)
      }
    }
    fetchDebts();
  }, [getSearchInputValue]);
  console.log(GetDataAPI);
  return (
    <div className='debt_page'>
      <div className="debt_page_con">
        <div className="search">
          <input onChange={(e) => setGetSearchInputValue(e.target.value)} type="text" placeholder='Malumotni kiriting...' />
        </div>
        <div className="debt_items">
          {errorMessage ? (
            <p className="error_message">{errorMessage}</p> // Xatolik xabarini chiqarish
          ) : (
            GetDataAPI.map((item, idx) => (
              <DebtItem id={item.id} key={idx} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DebtPage