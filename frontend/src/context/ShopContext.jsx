import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios'
import debounce, { head } from 'lodash';
import { toast } from "react-toastify";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
    let cartItems = [];
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([])
    const [productDetails, setProductDetails] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [cartData, setCartData] = useState(null);

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const fetchCartDetails = async () => {

        try {
            const res = await axios.get(`${backendUrl}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success) {
                setCartData(res.data.cartItems);
            }
            else {
                toast.error(res.data.message);
            }
            console.log("cart",res.data.cartItems);
        } catch (error) {
            toast.error("Something went wrong");
            console.log("Error : ", error.message);
        }
    }

    const getProductDetails = async (id) => {
        console.log("Detailing....")
        try {
            const url = `${backendUrl}/api/product/details/${id}`;
            const res = await axios.get(url);
            if (res.data.success) {
                setProductDetails(res.data.product);
                console.log("details", res.data);
            }
            else {
                console.log("fshj", res.data)
                //toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Fetch error: ", error.message);
        }
    }



    const getProductsData = async (page = 1, q = '', limit = 10) => {
        console.log("q :", q);
        try {
            const url = `${backendUrl}/api/product/list?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`;
            const response = await axios.get(url);
            if (response.data.success) {
                setProducts(response.data.products);
                console.log("Fetched products: ", response.data.products);
            } else {
                console.error("API Error: ", response.data);
                toast.error(response.data.message); // Optional
            }
        } catch (error) {
            console.error("Fetch error: ", error.message);
        }
    };
    const addToCart = async (itemId, size) => {
        const toastId = toast.loading("Adding product to cart");
        try {

            const res = await axios.post(
                `${backendUrl}/api/cart/add`, {
                itemId,
                size
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.data.success) {
                toast.update(toastId, {
                    render: "Product added to cart",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
            } else {
                console.log("Error ", res.data.message);
                toast.update(toastId, {
                    render: res.data.message || "Failed to add",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000
                });
            }
        } catch (error) {
            toast.update(toastId, {
                render: error.response?.data?.message || "Something went wrong",
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
            console.error("Error:", error.message);
        }

    };


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log("Error");
                }
            }
            console.log(totalCount);
        }
        console.log("cart count", totalCount);
        return totalCount;
    };
    useEffect(() => {
        getProductsData(1, search)
    }, [search])
    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, getCartCount, cartItems, backendUrl, getProductDetails, productDetails,
        loginModalVisible, setLoginModalVisible,cartData,fetchCartDetails
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}
export default ShopContextProvider;