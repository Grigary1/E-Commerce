import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios'
import debounce, { head } from 'lodash';
import { toast } from "react-toastify";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
    let cartItems = [];
    const currency = '₹';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([])
    const [productDetails, setProductDetails] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [cartData, setCartData] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const [myOrders, setMyOrders] = useState('');
    const [loading, setLoading] = useState(true);
    const [latestCollections, setLatestCollections] = useState(null);
    const [bestsellers, setBestsellers] = useState(null);
    const [trending, setTrending] = useState(null);
    const [brand, setBrand] = useState(null);
    const [totalPages,setTotalPages]=useState(1);


    const MAX_CACHE_SIZE = 50;
    const brandCache = new Map();
    const fetchTrending = async (page = 1, category = '', limit = 10) => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/trending`, {
                params: {
                    page,
                    limit,
                    q: category,
                    brand,
                },
            });

            if (res.data.success) {
                setTrending(res.data.trending);
            }
        } catch (error) {
            console.error("Error:", error.message);
            setLoading(false);
        }
    };

    const fetchBrand = async (page = 1, brand, limit = 10) => {
        const cacheKey = `${brand?.toLowerCase() || 'all'}-p${page}-l${limit}`;
        if (brandCache.has(cacheKey)) {
            setBrand(brandCache.get(cacheKey));
            return;
        }
        try {
            const res = await axios.get(`${backendUrl}/api/product/brand`, {
                params: {
                    page,
                    limit,
                    brand,
                },
            });

            if (res.data.success) {
                setBrand(res.data.brands);
                if (brandCache.size >= MAX_CACHE_SIZE) {
                    const firstKey = brandCache.keys().next().value;
                    brandCache.delete(firstKey);
                }

                brandCache.set(cacheKey, res.data.brands);
            }
            console.log("Res : ", res.data);
        } catch (error) {
            console.error("Error:", error.message);
            setLoading(false);
        }
    };

    const fetchBestSellers = async (page = 1, limit = 10) => {
        try {
            const res = await axios.get(`${backendUrl}/api/bestsellers?page=${page}&limit=${limit}`);
            if (res.data.success) {
                setBestsellers(res.data.bestsellers);
            }
        } catch (error) {
            console.log("Error : ", error.message);
            setLoading(false)

        }
    }

    const fetchLatestCollections = async () => {

        try {
            setLoading(true);
            const res = await axios.get(`${backendUrl}/api/products/latestcollections`);
            if (res.data.success) {
                setLatestCollections(res.data.latestCollections);
            }
            setLoading(false);
        } catch (error) {
            console.log("Error : ", error.message);
            setLoading(false)
        }
    }

    const updateFlagVariable = () => {
        if (cartData != null) {
            setOrderPlaced(true);
        }
    }
    const fetchOrderDetails = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/orders/view`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success) {
                setMyOrders(res.data.orders);
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("Error : ", error.message);
        }
    }
    const placeOrder = async (orderDetails) => {
        try {
            const res = await axios.post(`${backendUrl}/api/orders/place`, orderDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            if (res.data.success) {
                return true
            }
            toast.error(res.data.message);
            return false
        } catch (error) {
            toast.error(error.message);
        }
    }

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
            console.log("cart", res.data.cartItems);
        } catch (error) {
            toast.error("Something went wrong");
            console.log("Error : ", error.message);
        }
    }

    const getProductDetails = async (id) => {
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

    const productCache = new Map();

    const getProductsData = async (page = 1, q = '', limit = 10) => {
        const cacheKey = `${page}_${q}_${limit}`
        if (productCache.has(cacheKey)) {
            console.log('✅ Loaded from cache');
            const { products, totalPages } = productCache.get(cacheKey);
            setProducts(products);
            setTotalPages(totalPages);
            return;
        }

        try {
            setLoading(true);
            const url = `${backendUrl}/api/product/list?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`;
            const response = await axios.get(url);
            console.log("Product details  : ", response.data);
            if (response.data.success) {
                const { products, totalPages } = response.data;
                setProducts(products);
                setTotalPages(totalPages);
                productCache.set(cacheKey, { products, totalPages });
            } else {
                console.error("API Error: ", response.data);
            }
        } catch (error) {
            setLoading(true)
            console.error("Fetch error: ", error.message);
        }
    };
    const addToCart = async (itemId, size, variantId) => {

        const toastId = toast.loading("Adding product to cart");
        try {

            const res = await axios.post(
                `${backendUrl}/api/cart/add`, {
                itemId,
                variantId
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("added : ", res.data)
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
        loginModalVisible, setLoginModalVisible, cartData, fetchCartDetails, placeOrder, orderPlaced, setOrderPlaced, myOrders, fetchOrderDetails, updateFlagVariable, loading, setLoading,
        latestCollections, fetchLatestCollections, getProductsData, fetchBestSellers, fetchTrending, trending, brand, fetchBrand,totalPages
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}
export default ShopContextProvider;