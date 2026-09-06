import React, { useEffect, useState, useRef, useContext } from "react";
//import { useCart } from "../../contexts/cartContext";
import { useParams } from "react-router-dom";
import { getProductById } from "../../fetcher";
import PriceComponent from "./Price";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
//import ItemAddedPopup from "../ItemAddedPopup";
import StockLevelUpdateComponent from "../StockLevel";
import CartCounter from "../CartCounter";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectCartItems } from "../../contexts/contextusingRedux/cart-slice";


export default function ProductDetail() {
  
    //const cartContext = useContext(CartContext);
    //const { addProduct, getCartItems } = useCart();
    const dispatch = useDispatch();
    const [product,  setProduct] = useState({errorMessage: '', data: {} });
    const params = useParams();
    const navigate = useNavigate();
    const zoomRef = useRef(null);
    const [backgroundPosition, setBackgroundPosition] = useState("center");
    const [isHovering, setIsHovering] = useState(false);

    const id = product.data.productId;
    const name = product.data.name;
    const price = product.data.price;
    const itemImg = product.data.imageUrl;
    let stockLevel = product.data.stockLevel;

    const cartItems = useSelector(selectCartItems);   
    const itemQuantity = cartItems.find(item => item.name === product.data.name);
    
    const [stockUpdate, setStockUpdate] = useState(itemQuantity?.stockLevel);   
    const [userSelectQuantity, setUserSelectQuantity] = useState(itemQuantity?.quantity);
    const [qty, setQty] = useState(() => itemQuantity?.quantity || 0);

    const isOutOfStock = stockUpdate === 0;
    const backOrder = stockLevel === 0;
    const quantity = qty > 5;   
   
    useEffect(() => {
        const fetchData = async () => {
            const responseObj = await getProductById(params.productId);
            setProduct(responseObj);
        }
        fetchData();
    }, [params.productId]);

    useEffect(() => {
        if (itemQuantity !== undefined && itemQuantity !== null){
            setQty(itemQuantity?.quantity);
        }
    },[itemQuantity?.quantity]);

    useEffect(() => {
        setUserSelectQuantity(qty);
    }, [qty]);  

    console.log("qty userSelectQty ", qty, userSelectQuantity);
    const handleViewCart = () => navigate("/cart");

    const handleChange =(e) =>{
        const val = parseInt(e.target.value);
        setUserSelectQuantity(val);
        setQty(val);
    } 

    // Product image with zoom effect
    const handleMouseMove = (e) => {
        const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    }; 
    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
        setBackgroundPosition("center");
    };    

    return (
        <div className="min-h-213 flex items-center justify-center px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
            <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row md:space-x-8 px-6 p-8">
                {/* Product image with zoom effect */}
                <div 
                ref={zoomRef}
                onMouseMove={isHovering ? handleMouseMove : null}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-md shadow-xl/30 overflow-hidden bg-cover"
                style = {{
                    backgroundImage: `url(${product.data.imageUrl})`, backgroundSize: isHovering ? "200%" : "cover", backgroundPosition: backgroundPosition,
                }}
                >
                    <img src={product.data.imageUrl} alt={product.data.name} className="w-full h-full opacity-0" />
                </div>         
            
                <div className="w-full md:w-1/2 flex flex-col space-y-6 mt-8 md:mt-0">

                    <Link to="/home" className="inline-flex items-center text-blue-500 dark:text-light font-medium hover:text-dark dark:hover:text-lighter"
                    >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />BACK TO HOME</Link>
                    <h1 className="text-dark font-bold text-3xl font-lg pl-0.5">{product.data.name}</h1>
                    <p>
                        {product.data.description}
                    </p>
                    <PriceComponent currency="$" price={product.data.price} />
                    <p>Stock Level: 
                        <StockLevelUpdateComponent id={id} stock={product.data.stockLevel} sUpdate={stockUpdate} setSUpdate={setStockUpdate} />                 
                    </p> 
                    
                    <div className="flex flex-col space-y-4">   
                        <div>
                            <label htmlFor="quantity">QTY:</label>
                            <input type="number" id="qty" step="1"
                            placeholder="0" min="1" max ={product.data.stockLevel} value={qty} onChange={handleChange}/>
                        </div>     
                        <button disabled={isOutOfStock || backOrder} className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" onClick={() => 
                            dispatch(addToCart({id, name, price, itemImg, stockLevel, userSelectQuantity}))}>{isOutOfStock || backOrder || quantity ? "OUT OF STOCK" : "ADD TO CART"}</button>                 
                        <button onClick={handleViewCart} className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">VIEW CART</button>
                    </div>
                   {/* <ItemAddedPopup id={product.data.id} buttonId={buttonId} setButtonId={setButtonId} /> */}
                </div>
            </div>
        </div>
    );
}