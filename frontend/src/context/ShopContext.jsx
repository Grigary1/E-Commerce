import { createContext } from "react";
import images from '../assets/assets'

export const shopContext=createContext();

const ShopContextProvider = (props) => {
    const products = [];

    const currency='$';
    const delivery_fee=10;

    const value={
        products,currency,delivery_fee
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default ShopContextProvider  