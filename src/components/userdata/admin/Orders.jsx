import React from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { getOrders } from "../../../adminOrderFetcher";
import PageTitle from "../../home/PageTitle";
import { performAdminAction } from "../../../adminOrderAction";
import { toast } from "react-toastify";


const AdminOrdersComponent = () => {

    const orders = useLoaderData();
    const revalidator = useRevalidator();

    function formatDate ( isoDate ) {
        if(!isoDate) return "N/A";
        return new Date(isoDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleConfirm = async (orderId) => {
        try {
            const response = await performAdminAction(`/${orderId}/confirm`);
            toast.success("Order cofirmed.");
            revalidator.revalidate(); //re-run loader
        }catch(error) {
            toast.error("Failed to confirm order.");
        }   
    }

     const handleCancel = async (orderId) => {
        try {
            const response = await performAdminAction(`/${orderId}/cancel`);
            toast.success("Order cancelled.");
            revalidator.revalidate(); //re-run loader
        }catch(error) {
            toast.error("Failed to cancel order.");
        }   
    }
    return (
            <div className="max-w-6xl mx-auto">
                  
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
                        {orders.length > 0 ? (
                            <div className="space-y-6 mt-4">
                                <PageTitle title="Admin Orders Management" /> 
                                {orders.map((order) => (                                      
                                    <div key={order.orderId} className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
                                        <div className="">
                                            <div>
                                                <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-lighter">
                                                    Order# {order.orderId}
                                                </h2>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Status: {" "}
                                                    <span className="font-medium text-gray-800 dark:text-lighter">{order.status}</span>
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Total Price: {" "}
                                                    <span className="font-medium text-gray-800 dark:text-lighter">${order.totalPrice}</span>
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Date: {" "}
                                                    <span className="font-medium text-gray-800 dark:text-lighter">{formatDate(order.createdAt)}</span>
                                                </p>
                                            </div>
                                            <div className="flex space-x-4 lg:mt-0">
                                                <button onClick={() => handleConfirm(order.orderId)} className="px-6 py-2 text-white dark:text-dark text-md rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter">Confirm</button>
                                                <button onClick={() => handleCancel(order.orderId)} className="px-6 py-2 text-white text-md rounded-md transition duration-200 bg-red-500 hover:bg-red-600">Cancel</button>
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            Items: {" "}                                       
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex items-center border-b pb-4">
                                                    <img 
                                                    src={item.imageUrl} 
                                                    alt={item.productName}
                                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                                    />
                                                    <div>
                                                        <h2 className="text-sm text-gray-600 dark:text-gray-400">{item.productName}</h2>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Quantity: {" "}
                                                            <span className="font-medium text-gray-800 dark:text-lighter">{item.quantity}</span>
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Price: {" "}
                                                            <span className="font-medium text-gray-800 dark:text-lighter">{item.price}</span>
                                                        </p>
                                                    </div>
                                                </div>                            
                                            ))}                                                                       
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ):(
                            <span className="justify-center text-center font-primary font-bold text-lg text-primary">
                                { orders.errMessage && <div> Error: {orders.errMessage}</div> }
                            </span>
                        )}
                    </div>
                </div>    
        );
};


export async function adminViewOrdersLoader() {
    const responseObj = getOrders();
    return responseObj;
}

export default AdminOrdersComponent;