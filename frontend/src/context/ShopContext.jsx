import { createContext, useState } from "react";
import {products} from '../assets/assets'

export const shopContext=createContext();

const ShopContextProvider = (props) => {
    let cartItems=[];
    const currency='$';
    const delivery_fee=10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const addToCart=(itemId,size)=>{
        let item=cartItems.find(item=>item.id===itemId);
        if(item){
            item[size]=(item[size]||0)+1;
        }
        else{
            cartItems.push(
                {
                    id:itemId,
                    [size]:1,
                }
            );
        }
        console.log(cartItems);
    }
    const value={
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,addToCart
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default ShopContextProvider;