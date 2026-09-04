import React, { act, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useNavigation, useActionData, Form } from "react-router-dom";
import { getProfile } from "../../profileFetcher";
import { saveProfileData } from "../../saveProfileData";
import { useAuth } from "../../contexts/auth-context";
import PageTitle from "../home/PageTitle";
import { toast } from "react-toastify";
//import { useCart } from "../../contexts/cartContext";


const ProfileComponent = () => {

    //const { clearBasket } = useCart();
    const actionData = useActionData();
    const profileDetails = useLoaderData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const navigate = useNavigate();
    const { logout, getAuthItems } = useAuth();
    const [profile, setProfile] = useState(profileDetails.data);
    const address = getAuthItems()[0]?.user.addressDto;

    useEffect(() => {
        if(actionData?.success){
            if(actionData.profileData.emailUpdated){
                console.log("actionData.profileData.emailUpdated ", actionData.profileData.emailUpdated);
                sessionStorage.setItem("skipSavedPage", "true");               
                logout();
                toast.success(
                    "Logged out successfully! Login again with updated email"
                );
                navigate("/login");
                
            }else {
                toast.success(
                    "Your Profile details are saved successfully!"
                );         
                setProfile(actionData.profileData);            
                if(!address){sessionStorage.setItem("address", Object.values(actionData.profileData.addressDto));}               
            }
        }
    }, [actionData, address]);
    
    const labelStyle =
        "block text-lg font-semibold text-primary dark:text-light mb-2";
    const textFieldStyle =
        "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
   
    return (
            <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-6 font-primary">
                <div className="w-[25%] gap-6 mx-auto border bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
                    <div className="text-center py-4">
                        <PageTitle title="My Profile" />
                    </div>

                    <Form method="PUT" className="space-y-6">
                        <div>
                            <h2 className="font-bold">Personal Details</h2>
                            <div>
                                <label htmlFor="name" className={labelStyle}>
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    autoComplete="name"
                                    value={profile?.name}
                                    onChange={(e)=> setProfile((prev) => ({...prev, name: e.target.value}))}
                                    required
                                    className={textFieldStyle}
                                    minLength={5}
                                    maxLength={30}
                                />
                                {actionData?.errors?.name && (<p className="text-red-500 text-sm mt-1">{actionData.errors.name}</p>)}
                            </div>
                            <div className="flex font-semibold text-primary dark:text-light mb-2 space-x-4">  
                                <div>
                                    <label htmlFor="email" className={labelStyle}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        autoComplete="email"
                                        value={profile?.email}
                                        onChange={(e)=> setProfile((prev) => ({...prev, email: e.target.value}))}
                                        required                
                                        className={textFieldStyle}
                                    />
                                    {actionData?.errors?.email && (<p className="text-red-500 text-sm mt-1">{actionData.errors.email}</p>)}
                                </div>
                                <div>
                                    <label htmlFor="mobilenumber" className={labelStyle}>
                                        Mobile Number
                                    </label>
                                    <input
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        type="tel"
                                        placeholder="Your Mobile Number"
                                        autoComplete="mobilenumber"
                                        value={profile?.mobileNumber}
                                        onChange={(e)=> setProfile((prev) => ({...prev, mobileNumber: e.target.value}))}
                                        required
                                        className={textFieldStyle}
                                    />
                                    {actionData?.errors?.mobileNumber && (<p className="text-red-500 text-sm mt-1">{actionData.errors.mobileNumber}</p>)}
                                </div>
                            </div> 
                        </div>                 
                        <div>  
                            <h2 className="font-bold ">Address Details</h2>                         
                            <div>
                                <label htmlFor="street" className={labelStyle}>
                                    Street
                                </label>
                                <input
                                    id="street"
                                    type="text"
                                    name="street"
                                    placeholder="Your Street"
                                    autoComplete="street"
                                    value={profile.addressDto?.street}
                                    onChange={(e)=> setProfile((prev) => ({...prev.address, street: e.target.value}))}
                                    required
                                    className={textFieldStyle}                           
                                />
                                {actionData?.errors?.street && (<p className="text-red-500 text-sm mt-1">{actionData.errors.street}</p>)}
                            </div>
                            <div className="flex font-semibold text-primary dark:text-light mb-2 space-x-4">
                                <div>
                                    <label htmlFor="city" className={labelStyle}>
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        placeholder="Your City"
                                        autoComplete="city"
                                        value={profile.addressDto?.city}
                                        onChange={(e)=> setProfile((prev) => ({...prev.address, city: e.target.value}))}
                                        required
                                        className={textFieldStyle}                                  
                                    />
                                    {actionData?.errors?.city && (<p className="text-red-500 text-sm mt-1">{actionData.errors.city}</p>)}
                                </div>
                                <div>
                                    <label htmlFor="state" className={labelStyle}>
                                        State
                                    </label>
                                    <input
                                        id="state"
                                        type="text"
                                        name="state"
                                        placeholder="Your State"
                                        autoComplete="state"
                                        value={profile.addressDto?.state}
                                        onChange={(e)=> setProfile((prev) => ({...prev.address, state: e.target.value}))}
                                        required
                                        className={textFieldStyle}                                   
                                    />
                                    {actionData?.errors?.state && (<p className="text-red-500 text-sm mt-1">{actionData.errors.state}</p>)}
                                </div> 
                            </div>
                            <div className="flex font-semibold text-primary dark:text-light mb-2 space-x-4">
                                <div>
                                    <label htmlFor="postalcode" className={labelStyle}>
                                        Postal Code
                                    </label>
                                    <input
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        placeholder="Your Postal Code"
                                        autoComplete="postalcode"
                                        value={profile.addressDto?.postalCode}
                                        onChange={(e)=> setProfile((prev) => ({...prev.address, postalCode: e.target.value}))}
                                        required
                                        className={textFieldStyle}
                                    />
                                    {actionData?.errors?.postalCode && (<p className="text-red-500 text-sm mt-1">{actionData.errors.postalCode}</p>)}
                                </div>
                                <div>
                                    <label htmlFor="country" className={labelStyle}>
                                        Country
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        name="country"
                                        placeholder="Your Country"
                                        autoComplete="country"
                                        value={profile.addressDto?.country}
                                        onChange={(e)=> setProfile((prev) => ({...prev.address, country: e.target.value}))}
                                        required
                                        minLength={2} maxLength={2}
                                        className={textFieldStyle}                                        
                                    />
                                    {actionData?.errors?.country && (<p className="text-red-500 text-sm mt-1">{actionData.errors.country}</p>)}
                                </div>
                            </div>
                        </div>
        
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
                            >
                            {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </Form>
                </div>                    
            </div>
        );
};

export async function profileLoader() {
    const responseObj = await getProfile();
    return responseObj;
}

export async function profileAction({ request }) {
    const data = await request.formData();

    const profileData = {
        name: data.get("name"),
        email: data.get("email"),
        mobileNumber: data.get("mobileNumber"),
        street: data.get("street"),
        city: data.get("city"),
        state: data.get("state"),
        postalCode: data.get("postalCode"),
        country: data.get("country"),
    }
    const response = await saveProfileData(profileData);
    return response;
}

export default ProfileComponent;