import React, { useEffect } from "react";
//import { useCart } from "../contexts/cartContext";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "../contexts/contextusingRedux/cart-slice";


const CartTotalAmount = ({totalAmount, setTotalAmount}) => {
  
  //const { getCartTotal } = useCart();
  const cartTotalPrice = useSelector(selectTotalPrice);
  //const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  const storedCart = sessionStorage.getItem("cart");
  const totalP = storedCart ? JSON.parse(storedCart).totalPrice : 0;

  
  useEffect(() => {
    setTotalAmount(totalP);
    const timer = setInterval(() => {
      if(cartTotalPrice) {
        setTotalAmount(cartTotalPrice.toFixed(2)); // Notify parent
      }
      return totalAmount;   
    }, 500);
    return () => clearInterval(timer);
  }, [totalAmount, setTotalAmount, cartTotalPrice, totalP]); 
  
  return (
    <span className="mt-1 text- font-semibold text-grey-950 sm-hidden md:block">${totalAmount}</span>
  );    
};

export default React.memo(CartTotalAmount);