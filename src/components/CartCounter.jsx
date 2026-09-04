import React, { useEffect, useContext } from "react";
//import { useCart } from "../contexts/cartContext";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../contexts/contextusingRedux/cart-slice";

const CartCounter = ({totalCount, setTotalCount}) => {
 
  //const { getCartCount } = useCart();
  const totalQuantity = useSelector(selectTotalQuantity);
  //const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const storedCart = sessionStorage.getItem("cart");
  const totalItems = storedCart ? JSON.parse(storedCart).totalQuantity : 0;
   
  useEffect(() => {
    setTotalCount(totalItems);
    const timer = setInterval(() => {
      if(totalQuantity){
        setTotalCount(totalQuantity); // Notify parent
      }
      return totalCount;   
    }, 500);
    return () => clearInterval(timer);
  }, [totalCount, setTotalCount, totalQuantity, totalItems]); 
  
  return (
    <span className="absolute bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{totalCount}</span>
  );
    
};

export default React.memo(CartCounter);
