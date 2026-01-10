"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AddressContext = createContext();
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function AddressProvider({ children }) {
  const { isLoggedIn, authLoaded } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [addressLoaded, setAddressLoaded] = useState(false);

  useEffect(() => {
    if (!authLoaded) return;

    if (!isLoggedIn) {
      setAddresses([]);
      setAddressLoaded(true);
      return;
    }

    async function fetchAddresses() {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/addresses`,
          { withCredentials: true }
        );
        setAddresses(res.data);
      } catch {
        setAddresses([]);
      } finally {
        setAddressLoaded(true);
      }
    }

    fetchAddresses();
  }, [authLoaded, isLoggedIn]);

  return (
    <AddressContext.Provider
      value={{ addresses, setAddresses, addressLoaded }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
