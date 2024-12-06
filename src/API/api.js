import axios from "axios"
import { CreateDebt, CreateProductAPI, GetDebtById, ProductGetByFilterAPI, UpdateStockAPI, UpdateStockDebt } from "../config/api"
import { GetDebtsByFilter } from "../config/api"
export const CreateProduct = async (formData) => {
    try {
        console.log(CreateProductAPI)
        const response = await axios.post(`${CreateProductAPI}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // FormData uchun kerakli header
            }
        })
        return response.data
    }catch(e){
        console.error(e)
    }
}

export const FilterProduct = async (search) => {
    try{
        const response = await axios.get(`${ProductGetByFilterAPI}?search=${search}`)
        return response.data.products
    }catch(e){
        throw e
    }
}

export const UpdateStock = async (formData) => {
    try{
        const response = await axios.put(`${UpdateStockAPI}`, formData, {
            headers: {
                'Content-Type': 'application/json' 
            }
        })

        return response.data
    }catch(e){
        throw e
    }
}

export const GetDebtsByFilterAPI = async (search) => {
    try{
        const response = await axios.get(`${GetDebtsByFilter}?search=${search}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    }catch(e){
        throw e
    }
}
  
export const GetDebtByIdAPI = async (id) => {
    try{
        const response = await axios.get(`${GetDebtById}/${id}`)
        return response.data
    }catch(e){
        throw e
    }

}

export const UpdateStockDebtAPI = async (formData) => {
    try{
        const response = await axios.put(`${UpdateStockDebt}`, formData, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        return response
    }catch(e){
        throw e
    }
}

export const CreateDebtAPI = async (formData) => {
    try{
        const response = await axios.post(`${CreateDebt}`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response
    }catch(e){
        throw e
    }
}