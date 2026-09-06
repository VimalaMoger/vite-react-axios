import React, { useEffect, useState, useMemo} from "react";
import PageTitle from './home/PageTitle';
import { Link, useNavigate } from 'react-router-dom';
//import { useCart } from "../contexts/cartContext";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/auth-context";
import { selectCartItems, removeProduct, addToCart, clearBasket, decreaseQty, increaseQty } from "../contexts/contextusingRedux/cart-slice";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {

   //const { getCartItems, removeProduct, increaseQty, decreaseQty, clearBasket } = useCart();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const { getAuthItems } = useAuth();
    //const [items, setItems] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);

    const [items, setItems] = useState(() => {
        try {
        const storedCart = sessionStorage.getItem("cart");
        if (storedCart) {
            const parsed = JSON.parse(storedCart);
            return Array.isArray(parsed.items) ? parsed.items : [];
        }
        } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        }
        return [];
    });    
    
    useEffect(() => {
        setItems(cartItems);
    }, [setItems, cartItems]);

    const handleClick =() => {
        navigate("/home");
    }

    const isCartEmpty = useMemo(() => items.length === 0, [items.length]);
    
    const isAuthenticated = getAuthItems()[0]?.isAuthenticated;
    const address = sessionStorage.getItem("address");
    const isAddressIncomplete = useMemo(() => {
        if(!isAuthenticated) return false;        
        if(!address) return true;
        //return !address.street || !address.city || !address.state || !address.postalCode || !address.country;        
    }, [isAuthenticated, address]);

    const renderCart = () => {
        if (items?.length > 0) {
            return items.map((p) => (
                <React.Fragment key={p.id}>
                    <div>
                        <Link to={`/products/${p.id}`} className="flex font-semibold text-blue-950 space-x-4">
                        <img src={p.itemImg} alt={p.name} className="w-6 h-6"/>
                        <span className="text-blue-500 dark:text-light hover:underline hover:scale-110 transition-transform">{p.name}</span>
                        </Link>
                    </div>
                    <h3>
                        {p.quantity}
   
                        <FontAwesomeIcon icon={faPlus} width={20} onClick={() => dispatch(increaseQty({id: p.id}))} className="ml-2"/>
                        <FontAwesomeIcon icon={faMinus} width={20} onClick={() => dispatch(decreaseQty({id: p.id}))} className="ml-1"/>
                        <FontAwesomeIcon icon={faTimes} width={20} onClick={() => dispatch(removeProduct({id: p.id}))} className="px-4" />
                    </h3>
                    <h3 className="font-semibold">${p.price}</h3>
                </React.Fragment>
            ));
        }
    };

   const renderTotal = () => {
        //const cartItems = getCartItems();      
        if (!Array.isArray(items)) return 0;
        const total = items?.reduce(
            (total, item) => (total += item.price * item.quantity),
            0
        ); 
        return total.toFixed(2);
    };    
    
    return ( 
        <>             
            {isCartEmpty ?
                (                
                <div className="grid-rows-3 text-center align-center justify-center">
                    <p className="max-w-xl px-2 mx-auto text-base mb-4 text-center space-y-2 py-8">
                        Oops... Your cart is empty. Continue shopping
                    </p>
                    <img
                        src="/assets/images/emptycart.png"
                        alt="Empty Cart"
                        className="max-w-75 mx-auto mb-6 dark:bg-light dark:rounded-md"
                    />            
                    <button
                        onClick={handleClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mb-8">
                        START SHOPPING
                    </button>
                </div>
                ):(
                <>
                    {isAddressIncomplete && (
                        <p className="text-red-500 text-lg mt-2 text-center">
                        Please update your address in your profile to proceed with checkout.</p>
                    )}

                    <div className="min-h-80 max-w-4xl md:w-1/2 p-1.5 mx-auto mt-10">
                        <div className="mt-10 border border-amber-200 shadow-xl">
                            <div className="grid grid-rows-[0.50fr_1fr_0.8fr]">
                                <h2 className="w-full grid-col-1 col-span-3 text-xl font-bold text-center mb-4">Your Cart</h2>
                                <div className="grid-col col-span-3 grid-rows-[0.25fr_1fr_0.25fr_0.25fr] gap-1.25 pl-[0.625] mb-4">                                  
                                        <div className="grid grid-cols-[1fr_1fr_auto] items-baseline-last font-primary font-semibold py-2">
                                            <h4>Item</h4>
                                            <h4>Quantity</h4>
                                            <h4>Price</h4>
                                        </div>
                                        <hr className="mb-[1.25] border-[0.0625] text-grey-900"/>
                                        <div className="grid grid-cols-[1fr_1fr_auto] items-baseline-last py-2">{renderCart()}</div>
                                        <hr className="mb-[1.25] border-[0.0625] text-grey-900"/>
                                        <h2 className="float-right"><span className="font-medium text-blue-500">SUBTOTAL: </span> ${renderTotal()}</h2>                                    
                                </div>

                            </div>
                            <div className="flex justify-between mt-8 space-x-4 text-white">
                                <button className="bg-blue-400 hover:bg-sky-600 py-2 px-4 rounded" onClick={() => dispatch(clearBasket())}>CLEAR</button>                   
                                <Link to={isAddressIncomplete ? "#" : "/checkout"} 
                                    className={`bg-blue-400 hover:bg-sky-600 py-2 px-4 rounded"
                                        ${isAddressIncomplete ? "bg-grey-400 cursor-not-allowed" : "bg-blue-950 dark:bg-light hover:bg-dark dark:hover:bg-lighter"}
                                        text-white dark:text-black`} onClick={(e) => {
                                            if(isAddressIncomplete){
                                                e.preventDefault();
                                            }
                                        }}>PROCEED TO CHECKOUT</Link>
                            </div>
                        </div>
                        <div className="grid grid-rows-[0.25fr_0.25fr] mx-auto mt-8 space-y-4 justify-center font-bold text-white">
                                    <button
                                        onClick={handleClick}
                                        className="bg-blue-400 hover:bg-sky-600 py-2 px-4 rounded-xl mb-8">
                                        START SHOPPING
                                    </button>
                        </div>
                    </div>
                </>
                )
            }             
    </> 
  );
};

export default Cart;