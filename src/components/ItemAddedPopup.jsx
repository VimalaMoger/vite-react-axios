import React from "react";

import { Link } from "react-router-dom";


const ItemAddedPopup = React.memo(({name}) => {

    return (
            <div className="w-1/3 h-1/8 fixed inset-100 z-50 grid grid-rows-2 items-center justify-center border bg-sky-300 bg-opacity-50">
                     
                {name} added to cart! ✅
                
                <div className="text-blue-900 font-bold">                   
                    <Link to="/cart">VIEW CART & CHECKOUT</Link>
                </div>
            </div>
    );
});

export default ItemAddedPopup; 