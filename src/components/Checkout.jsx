import React, { useState } from "react";
import { useAuth } from "../contexts/auth-context";
//import { useCart } from "../contexts/cartContext";
import { CardNumberElement, useElements, useStripe, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { receivePaymentData } from "../api-requests/paymentReceiver";
import { receiveOrderData } from "../api-requests/orderReceiver";
import PageTitle from "./home/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectTotalPrice, clearBasket  } from "../contexts/contextusingRedux/cart-slice";

export default function Checkout() {
   // debugger;
    const dispatch = useDispatch();
    const cartTotalPrice = useSelector(selectTotalPrice);
    const cartItems = useSelector(selectCartItems);
    const { getAuthItems } = useAuth();
    //const { getCartCount, getCartTotal, getCartItems, clearBasket } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [elementError, setElementError] = useState(
        {
            cardNumber: "",
            cardExpiry: "",
            cardCvc: "",
        }
    );
    const user = getAuthItems()?.user;

    const isDarkMode = localStorage.getItem("theme") === "dark";

    const labelStyle =
        "block text-lg font-semibold text-primary dark:text-light mb-2";

    const textFieldStyle =
        "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
    
    const fieldErrorStyle = "border-red-400 dark:border-red-500 focus:ring-red-500 text-sm mt-1";
    const fieldValidStyle = "border-primary dark:border-light focus:ring-dark dark:focus:ring-lighter";

    const getClassForElement = (field) =>
    `${textFieldStyle} ${elementError[field] ? fieldErrorStyle : fieldValidStyle}`;

    const elementOptions = {
        style:{
            base: {
                fontSize: "16px",
                color: isDarkMode ? "E5E7EB": "#374152",
                backgroundColor: isDarkMode ? "#4B5563" : "#FFFFFF",
            },
            invalid: {
                color: "#F87171",
                backgroundColor: isDarkMode ? "#4B5563" : "#FFFFFF",
            },
        },
    };

    function handleCardChange(field, event) {
        setElementError((prev) => ({
            ...prev,
            [field]: event.error? event.error.message : "",
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements) {
            setErrorMessage("Stripe.js is not loaded yet.");
            return;
        }

        if(Object.values(elementError).some((error) => error)) {
            setErrorMessage("Please correct the hightlighted errors.");
            return;
        }
        setIsProcessing(true);

        const paymentData = {
            amount: cartTotalPrice * 100,
            currency: "usd",
        }
         
        try {
            //const { clientSecret } = response.data;
            const response = paymentProcessor(paymentData)
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                (await response).data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user?.name,
                            email: user?.email,
                            phone: user?.mobileNumber,
                            address: {
                                street: user?.street,
                                city: user?.city,
                                state: user?.name,
                                postal_code: user?.postalCode,
                                country: user?.country,
                            },
                        },
                    },
                }
            );
            if(error) {
                setErrorMessage(error.message || "Payment failed. Please try agian.");
            } else if(paymentIntent && paymentIntent.status === "succeeded"){
                toast.success("Payment successful!");
                try {
                    const orderData = {                        
                        totalPrice: cartTotalPrice,
                        paymentId: paymentIntent.id,
                        paymentStatus: paymentIntent.status,
                        items: cartItems?.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    }
                    const res = await receiveOrderData(orderData);
                    console.log("res ", res, res.data);
                    sessionStorage.setItem("skipRedirectPath", "true");
                    dispatch(clearBasket());
                    navigate("/order-success");
                } catch(error) {
                    setErrorMessage("Order creation failed. Please contact support.");
                }
            }
        }catch(error){
            setErrorMessage("Error processing payment. Please try again later.");       
        }finally{
            setIsProcessing(false);
        }       
    };
    return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
        <div
            className={
            isProcessing
                ? "visible  flex flex-col justify-center items-center my-[200px] "
                : "hidden"
            }
        >
        <p className="mt-4 text-2xl font-normal text-primary dark:text-light">
          Processing Payment.... Don't refresh the page
        </p>
        </div>
        <div
            className={
            isProcessing
                ? "hidden"
                : "visible bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6"
            }
        >
            <PageTitle title="Complete Your Payment" />

            <p className="text-center mt-8 text-lg text-gray-600 dark:text-lighter mb-8">
            Amount to be charged: <strong>${cartTotalPrice.toFixed(2)}</strong>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
                <div className="text-red-500 text-sm text-center">
                {errorMessage}
                </div>
            )}
            {/* Card Number */}
            <div>
                <label htmlFor="cardNumber" className={labelStyle}>
                Card Number
                </label>
                <div id="cardNumber" className={getClassForElement("cardNumber")}>
                <CardNumberElement
                    options={elementOptions}
                    onChange={(event) => handleCardChange("cardNumber", event)}
                />
                </div>
                {elementError.cardNumber && (
                <p className="text-red-500 text-sm mt-1">
                    {elementError.cardNumber}
                </p>
                )}
            </div>

            {/* Card Expiry */}
            <div>
                <label htmlFor="cardExpiry" className={labelStyle}>
                Expiry Date
                </label>
                <div id="cardExpiry" className={getClassForElement("cardExpiry")}>
                <CardExpiryElement
                    options={elementOptions}
                    onChange={(event) => handleCardChange("cardExpiry", event)}
                />
                </div>
                {elementError.cardExpiry && (
                <p className="text-red-500 text-sm mt-1">
                    {elementError.cardExpiry}
                </p>
                )}
            </div>

            {/* Card CVC */}
            <div>
                <label htmlFor="cardCvc" className={labelStyle}>
                CVC
                </label>
                <div id="cardCvc" className={getClassForElement("cardCvc")}>
                <CardCvcElement
                    options={elementOptions}
                    onChange={(event) => handleCardChange("cardCvc", event)}
                />
                </div>
                {elementError.cardCvc && (
                <p className="text-red-500 text-sm mt-1">
                    {elementError.cardCvc}
                </p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full px-6 py-2 mt-6 text-white dark:text-black text-xl bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md transition duration-200"
                >
                {isProcessing ? "Payment processing..." : "Pay Now"}
                </button>
            </div>
            </form>
        </div>
    </div>
    );
}

export async function paymentProcessor(paymentData) {
    const responseObj = await receivePaymentData(paymentData);
    return responseObj;
}