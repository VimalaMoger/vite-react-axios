import React from "react";
//import { useContext, useEffect, useState } from "react";
//import { CartContext } from "../contexts/cartContext";
import { Link } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
//import { selectAddButtonId, clearAddButton } from "../contexts/contextusingRedux/cart-slice";

const ItemAddedPopup = React.memo(({name}) => {
    //const [visible, setIsVisible] = useState(true);
    //const { addButtonId, clearAddButton } = useContext(CartContext);
    /* const [visible, setIsVisible] = useState(false);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(() => {      
            setButtonId(useSelector(selectAddButtonId));
            setTimeout(() =>dispatch(clearAddButton()), 4000);  
        }, 500);  
        setIsVisible(true);    
        return () => clearInterval(timer);
    }, [buttonId, selectAddButtonId, id, clearAddButton]);
     
    const handleCloseMessage = () => {
        setIsVisible(false);
        setButtonId(dispatch(clearAddButton()));
    }; 
   */
    return (
            <div className="w-1/3 h-1/8 fixed inset-100 z-50 grid grid-rows-4 items-center justify-center border bg-sky-300 bg-opacity-50">
                
                  {/*   <button className="text-red-700 font-bold border h-8 w-8 absolute text-center top-2 right-2 hover:text-gray-800" onClick={handleCloseMessage}>
                        X
                    </button> */}
                
                {name} added to cart! ✅
                <img />
                <div>
                   {/*  <div className="border w-[50%] mx-auto">
                        <label htmlFor="quantity" className="font-semibold">QTY:</label>
                        <input type="number" id="quantity" min="1" value={qty}
                        onChange={(e)=> setQty((prev) => ({...prev, city: e.target.value}))}
                        />
                    </div> */}
                </div>
                <div className="text-blue-900 font-bold">
                    {/* <Link to="/home">CONTINUE SHOPPING</Link>  */}
                    <Link to="/cart">VIEW CART & CHECKOUT</Link>
                </div>
            </div>





     /*    <> 
            {(buttonId === id) & visible  ?
            (<div className="fixed inset-100 z-50 grid grid-rows-4 items-center justify-center border bg-sky-300 bg-opacity-50">
                <button className="text-red-700 font-bold border h-8 w-8 absolute text-center top-2 right-2 hover:text-gray-800" onClick={handleCloseMessage}>
                    X
                </button>
                ✅ Item added to cart!
                <img />
                <div>
                    <div className="border w-[50%] mx-auto">
                        <label htmlFor="quantity" className="font-semibold">QTY:</label>
                        <input type="number" id="quantity" min="1" value={qty}
                        onChange={(e)=> setQty((prev) => ({...prev, city: e.target.value}))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 space-x-25 text-blue-900 font-bold">
                    <Link to="/home">CONTINUE SHOPPING</Link> 
                    <Link to="/cart">VIEW CART & CHECKOUT</Link>
                </div>
            </div>): null
            }
        </> */
    );
});

export default ItemAddedPopup; 