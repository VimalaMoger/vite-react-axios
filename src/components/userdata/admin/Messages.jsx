import React from "react";
import { getMessages } from "../../../api-requests/adminMessageFetcher";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { closeMessage } from "../../../api-requests/adminOrderAction";
import { toast } from "react-toastify";
import PageTitle from "../../home/PageTitle";

const MessageComponent = () => {
    const messages = useLoaderData();
    const revalidator = useRevalidator();

    // Close message handler
    const handleClose = async (contactId) => {
        try {
            const response = await closeMessage(`/${contactId}/close`);
            toast.success("Message closed.");
            revalidator.revalidate(); //re-run loader
        }catch(error) {
            toast.error("Failed to close message.");
        }   
    }
    return (
                <div className="max-w-6xl mx-auto">
                  
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
                        {messages.length > 0 ? (
                            <div className="space-y-6 mt-4">
                                <PageTitle title="Admin Orders Management" /> 
                                {messages.map((message) => (                                      
                                    <div key={message.contactId} className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
                                        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-lighter">
                                            ID# {message.contactId}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Name: {" "}
                                            <span className="font-medium text-gray-800 dark:text-lighter">{message.name}</span>
                                        </p>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Email: {" "}
                                            <span className="font-medium text-gray-800 dark:text-lighter">{message.email}</span>
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Mobile Number: {" "}
                                            <span className="font-medium text-gray-800 dark:text-lighter">{message.mobileNumber}</span>
                                        </p>
                                         <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Message: {" "}
                                            <span className="font-medium text-gray-800 dark:text-lighter">{message.message}</span>
                                        </p>
                                         <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Status: {" "}
                                            <span className="font-medium text-gray-800 dark:text-lighter">{message.status}</span>
                                        </p>
                                        <div className="flex space-x-4 lg:mt-0">
                                            <button onClick={() => handleClose(message.contactId)} className="px-6 py-2 text-white dark:text-dark text-md rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter">Close</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ):(
                            <span className="justify-center text-center font-primary font-bold text-lg text-primary">
                                { messages.errMessage && <div> Error: {messages.errMessage}</div> }
                            </span>
                        )}
                    </div>
                </div>
    );
};

export async function adminMessageLoader() {
    const responseObj = getMessages();
    return responseObj;
}

export default MessageComponent;