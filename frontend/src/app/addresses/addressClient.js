"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddressesClient() {
  const { isLoggedIn, authLoaded } = useAuth();
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddAddress = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/addresses`,
        form,
        { withCredentials: true }
      );

      setAddresses(prev => [res.data, ...prev]);
      setShowModal(false);

      setForm({
        name: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: ""
      });
    } catch {
      alert("Failed to add address");
    }
  };



  useEffect(() => {
    if (!authLoaded) return;
    if (!isLoggedIn) router.replace("/login");
  }, [authLoaded, isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) return;

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
        setLoading(false);
      }
    }

    fetchAddresses();
  }, [isLoggedIn]);

  if (!authLoaded || !isLoggedIn || loading) return null;

  return (
    <main className="addresses-page container">
      <h1>My Addresses</h1>

      {addresses.length === 0 ? (
        <div className="addresses-empty">
          <p>You haven’t added any addresses yet.</p>
          <button
              className="btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add New Address
          </button>

        </div>
      ) : (
        <div className="address-list">
          {addresses.map(addr => (
            <div key={addr.id} className="address-card">
              {addr.isDefault && (
                <span className="address-default">Default</span>
              )}

              <p className="address-name">{addr.name}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>
                {addr.city}, {addr.state} – {addr.pincode}
              </p>
              <p className="address-phone">📞 {addr.phone}</p>

              <div className="address-actions">
                <button>Edit</button>
                <button
                  onClick={() =>
                    setAddresses(prev =>
                      prev.filter(a => a.id !== addr.id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Add New Address</h2>

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              name="line1"
              placeholder="Address Line 1"
              value={form.line1}
              onChange={handleChange}
            />

            <input
              name="line2"
              placeholder="Address Line 2 (optional)"
              value={form.line2}
              onChange={handleChange}
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAddAddress}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
