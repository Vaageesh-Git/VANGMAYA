'use client'

import axios from "axios";
import { useAuth } from './AuthContext';

const { createContext, useState, useContext, useEffect } = require("react");
const CartContext = createContext();
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function CartProvider({children}){
    const { isLoggedIn } = useAuth();
    const [cartList, setCartList] = useState([]);
    const [cartLoaded , setCartLoaded] = useState(false);

    useEffect(() => {
        async function fetchCart() {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/cart`, {withCredentials : true});
                setCartList(response.data)
            } catch(err){
                setCartList([])
            } finally {
                setCartLoaded(true)
            }
        }
        fetchCart()
    },[isLoggedIn])

    return (
        <CartContext.Provider value={{cartList, setCartList, cartLoaded}}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext);