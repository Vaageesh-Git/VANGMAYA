'use client'

import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import axios from "axios"
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export default function FetchProducts(){
    const [products,setProducts] = useState([])
    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get(`${BACKEND_URL}/api/product`, {withCredentials : true})
            setProducts(response.data)
        }
        fetchProducts()
    },[])
    return (
        <div className="allproducts-page">
            {
                products.map((product) => <ProductCard product={product}/>)
            }
        </div>
    )
}