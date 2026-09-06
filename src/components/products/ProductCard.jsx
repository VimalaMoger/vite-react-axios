import PriceComponent from "./Price";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import { useCart } from "../../contexts/cartContext";
import ItemAddedPopup from "../ItemAddedPopup";
import { Link } from "react-router-dom";
import StockLevelUpdateComponent from "../StockLevel";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../contexts/contextusingRedux/cart-slice";
import { toast } from "react-toastify";

export default function ProductCardComponent({product}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const cartContext = useContext(CartContext);
    //const { addProduct } = useCart();
    const id = product.productId;
    const name = product.name;
    const price = product.price;
    const itemImg = product.imageUrl;
    const stockLevel = product.stockLevel;
    const [stockUpdate, setStockUpdate] = useState(stockLevel);
    const isOutOfStock = stockUpdate === 0; 
    const [showToast, setShowToast] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart({id, name, price, itemImg, stockLevel}));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1000);
    }; 

    return (
        <div className="grid grid-col-3 items-center justify-center border border-gray-300 p-1">
          
            <img src={product.imageUrl} alt={product.name} className="w-60 h-55 active:bg-voilet-700" />
            <div className="space-y-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-grey-200 text-[12px] hover:italic">
                    {product.description}
                </p>
                 <button className="font-medium text-black-700 hover:bg-sky-400 focus:outline-voilet-500 rounded" onClick={() => navigate(`/products/${product.productId}`)}>
                        View Product
                </button>
            </div>
            <div className="flex justify-between py-4">
                <PriceComponent currency="$" price={product.price} />
                <p className="border h-8 w-8 text-center top-2 right-2 hover:text-gray-800">
                    <StockLevelUpdateComponent id={id} stock={stockLevel} sUpdate={stockUpdate} setSUpdate={setStockUpdate} />
                </p>
        
                <button disabled={isOutOfStock} onClick={handleAddToCart} className="font-medium text-blue-700 hover:bg-sky-400 focus:outline-voilet-500 rounded" 
                         >{isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}</button>
          
                {showToast && (
                
                <div>
                  <ItemAddedPopup name={name} /> 
                </div>
                )}
            </div>
        </div>
    );
}