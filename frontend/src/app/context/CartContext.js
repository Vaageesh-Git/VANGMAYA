'use client'

import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function CartProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [cartList, setCartList] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  async function refetchCart() {
    try {
        const res = await axios.get(`${BACKEND_URL}/api/cart`, {
        withCredentials: true,
        });
        setCartList(res.data);
    } catch (err) {
        console.error("Refetch cart failed", err);
    }
   }

  useEffect(() => {
    async function fetchCart() {
      try {
        if (!isLoggedIn) {
          setCartList([]);
          return;
        }

        const res = await axios.get(`${BACKEND_URL}/api/cart`, {
          withCredentials: true,
        });

        setCartList(res.data);
      } catch (err) {
        console.error("Fetch cart failed", err);
        setCartList([]);
      } finally {
        setCartLoaded(true);
      }
    }

    fetchCart();
  }, [isLoggedIn]);


    async function addToCart(productId, quantity = 1) {
        if (!isLoggedIn) {
            alert("Please login to add items to cart");
            return;
        }

        try {
            await axios.post(
            `${BACKEND_URL}/api/cart/add`,
            { productId, quantity },
            { withCredentials: true }
            );

            await refetchCart(); 
        } catch (err) {
            console.error("Add to cart failed", err);
        }
    }


  async function removeFromCart(productId) {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/cart/delete/${productId}`,
        { withCredentials: true }
      );

      setCartList(prev =>
        prev.filter(item => item.productId !== productId)
      );
        await refetchCart();

    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  }

  async function increment(productId) {
    try {
        const currentQty = getQuantity(productId);
        const newQty = currentQty + 1;

        await axios.patch(
            `${BACKEND_URL}/api/cart/quantity`,
            { productId, quantity: newQty },
            { withCredentials: true }
        );

        setCartList(prev =>
        prev.map(item =>
            item.product.id === productId
            ? { ...item, quantity: newQty }
            : item
        )
        
        );
        await refetchCart();
  } catch (err) {
    console.error("Increment failed", err);
  }
}

async function decrement(productId) {
  try {
    const currentQty = getQuantity(productId);

    if (currentQty <= 1) {
      await removeFromCart(productId);
      return;
    }

    const newQty = currentQty - 1;

        await axios.patch(
            `${BACKEND_URL}/api/cart/quantity`,
            { productId, quantity: newQty },
            { withCredentials: true }
        );

        setCartList(prev =>
            prev.map(item =>
                item.product.id === productId
                ? { ...item, quantity: newQty }
                : item
            )
        );
        await refetchCart();
        } catch (err) {
            console.error("Decrement failed", err);
        }
    }


    const isInCart = productId =>
    cartList.some(item => item.product.id === productId);


  const cartCount = cartList.length;

    const getQuantity = (productId) => {
    const item = cartList.find(
        item => item.product.id === productId
    );
    return item ? item.quantity : 0;
    };

  return (
    <CartContext.Provider
      value={{
        cartList,
        cartLoaded,
        cartCount,
        setCartList,
        addToCart,
        removeFromCart,
        isInCart,
        getQuantity,
        increment,
        decrement
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
