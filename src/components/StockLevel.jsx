import React, { useEffect, useContext } from "react";
//import { useCart } from "../contexts/cartContext";
import { useSelector } from "react-redux";
import { selectCartItems } from "../contexts/contextusingRedux/cart-slice";


const StockLevelUpdateComponent = ( {id, stock, sUpdate, setSUpdate} ) => {

    //const { getCartItems } = useCart();
    const cart = useSelector(selectCartItems);

    useEffect(() => {  
        const timer = setInterval(() => {
            if (cart?.length > 0) { 
                cart?.map((p) => ( 
                    (p.id === id) ? setSUpdate(p.stockLevel): 0
                ));
            }
            return sUpdate; 
        }, 50);
        return () => clearInterval(timer);           
    }, [id, sUpdate, setSUpdate, cart]); 

    const isMatch = sUpdate < stock ;

    return (
        <>{isMatch ? sUpdate : stock}</>
    );

};

export default React.memo(StockLevelUpdateComponent);