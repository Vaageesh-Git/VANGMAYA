'use client'

import axios from "axios";

const { createContext, useState, useContext, useEffect } = require("react");
const CartContext = createContext();
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function CartProvider({children}){
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        async function fetchCart() {
            const response = await axios.get(`${BACKEND_URL}/api/cart`, {withCredentials : true});
            setCartList(response.data)
        }
        fetchCart()
    },[])

    return (
        <CartContext.Provider value={{cartList, setCartList}}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext);