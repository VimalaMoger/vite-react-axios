import React from "react";
import { getOrders } from "../../orderFetcher";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../home/PageTitle";

const OrdersComponent = () => {
    const orders = useLoaderData();

    function formatDate(isoDate) {
        if(!isoDate) return "N/A";
        return new Date(isoDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    return (
            <div className="max-w-6xl mx-auto">
              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
                    {orders.length > 0 ? (
                        <div className="space-y-6 mt-4">
                            <PageTitle title="My Orders" /> 
                            {orders.map((order) => (                                      
                                <div key={order.orderId} className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
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
                                    <div className="mt-4 space-y-4">
                                        <h2 className="font-bold mb-2 text-blue-800 dark:text-lighter">Item Details: </h2>                                       
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
                        <p className="text-center font-bold text-xl dark:text-lighter">
                            No orders found.
                        </p>
                    )}
                </div>
            </div>    
    );
};

export async function ordersLoader() {
    const responseObj = getOrders();
    return responseObj;
}
export default OrdersComponent;