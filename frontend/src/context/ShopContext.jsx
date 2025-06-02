import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios'
import debounce from 'lodash';
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

    const getProductDetails = async (id) => {
        console.log("Detailing....")
        try {
            const url = `${backendUrl}/api/product/details/${id}`;
            const res = await axios.get(url);
            if (res.data.success) {
                setProductDetails(res.data.product);
                console.log("details",res.data);
            }
            else {
                console.log("fshj",res.data)
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

    const addToCart = (itemId, size) => {
        console.log("add cart",itemId)
        let item = cartItems.find(item => item.id === itemId);
        if (item) {
            item[size] = (item[size] || 0) + 1;
        }
        else {
            cartItems.push(
                {
                    id: itemId,
                    [size]: 1,
                }
            );
        }
        console.log("Cartitems",cartItems);
        toast.success("Item added to cart\n");
    }

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
        console.log("cart count",totalCount);
        return totalCount;
    };
    useEffect(() => {
        getProductsData(1, search)
    }, [search])
    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, getCartCount, cartItems, backendUrl,getProductDetails,productDetails
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}
export default ShopContextProvider;