import React, { useEffect, useRef } from "react";
import { useActionData, useNavigation, useSubmit, Form, redirect, useLoaderData } from "react-router-dom";
import PageTitle from './home/PageTitle';
import apiClient from ".././api/apiClient";
import { toast } from 'react-toastify';
import { saveContactData } from "../api-requests/receiver";
import { ContactDetailsElement } from "@stripe/react-stripe-js";

const Contact = () => {
  const actionData = useActionData();
  const contactDetails = useLoaderData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect (() => {
    if (actionData?.success) {
      formRef.current?.reset(); //reset inside actual DOM 
      toast.success("Your message has been submitted successfully!");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?"
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current); // Get form data
      submit(formData, { method: "post" }); // Proceed with form submission
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";

  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
  
  return (
    <div className="flex flex-col align-center text-center max-w-6xl min-h-213 mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
        {/* Page Title */}
        <PageTitle title="Contact Us" />

        {/* Contact Info */}
        <p className="max-w-3xl mx-auto mt-8 text-gray-600 dark:text-lighter mb-4 text-center">
            We’d love to hear from you! If you have any questions, feedback, or
            suggestions, please don’t hesitate to reach out.
        </p>
        {contactDetails && (
          <div className="flex justify-center space-x-4 mb-8">
            <p><strong className="text-blue-600">Phone: </strong>{contactDetails.phone}</p>
            <p><strong className="text-blue-600">Email: </strong>{contactDetails.email}</p>
            <p><strong className="text-blue-600">Address: </strong>{contactDetails.address}</p>
          </div>
        )}

        {/* Contact Form */}
        <Form
        method="POST"
        ref={formRef}
        onSubmit={ handleSubmit }
        className="space-y-6 max-w-3xl mx-auto"
        >
            {/* Name Field */}
            <div>
                <label htmlFor="name" className={ labelStyle }>
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className={ textFieldStyle }
                    required
                    minLength={5}
                    maxLength={30}
                />
                { actionData?.errors?.name && (
                    <p className="text-red-500 text-sm mt-1">
                    { actionData.errors.name }
                    </p>
                )}
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className={ labelStyle }>
                    Email
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className={ textFieldStyle }
                    required
                    />
                    {actionData?.errors?.email && (
                    <p className="text-red-500 text-sm mt-1">
                        { actionData.errors.email }
                    </p>
                    )}
                </div>

                {/* Mobile Field */}
                <div>
                    <label htmlFor="mobileNumber" className={ labelStyle }>
                    Mobile Number
                    </label>
                    <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    pattern="^\d{10}$"
                    title="Mobile number must be exactly 10 digits"
                    placeholder="Your Mobile Number"
                    className={ textFieldStyle }
                    />
                    {actionData?.errors?.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1">
                        { actionData.errors.mobileNumber }
                    </p>
                    )}
                </div>
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className={ labelStyle }>
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Your Message"
                    className={ textFieldStyle }
                    required
                    minLength={5}
                    maxLength={500}
                ></textarea>
                { actionData?.errors?.message && (
                    <p className="text-red-500 text-sm mt-1">
                    { actionData.errors.message }
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    disabled={ isSubmitting }
                    className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
                >
                    { isSubmitting ? "Submitting..." : "Submit" }
                </button>
            </div>
        </Form>
    </div>
  );
};
export default Contact;

export async function contactAction ({ request, params }) {
  const data = await request.formData();

  // Get the data in JSON format
  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message"),
  };

  const responseObj = await saveContactData(contactData);
  return responseObj;
}

export async function contactLoader () {
  try {
    const response = await apiClient.get("/contacts");
    return response.data;
  } catch (error) {
    throw new Response(
      error.message || "Failed to fetch profile details. Please try again.",
      {status:error.status || 500}
    );
  }
}