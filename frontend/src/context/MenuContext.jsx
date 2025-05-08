import React, {  useState } from "react"; 
import { product } from '../assets/assets'
import { createContext } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";




export const MenuContext = createContext()

const MenuContextProvider = ({ children }) => {
    const[products, setProducts] = useState(product)

    const getproductData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
         
        } catch (error) {
         
        }
      };
      useEffect(() => {
        getproductData()

      },[])

    return(
        <MenuContext.Provider value={{ products}}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider