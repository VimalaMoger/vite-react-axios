import { React, useEffect, useRef } from "react";
import { saveRegisterData } from "../../registerdatareceiver";
import { Link, Form, useActionData, useNavigate, useNavigation, useSubmit } from "react-router-dom";
import PageTitle from "../home/PageTitle";
import { toast } from "react-toastify";

const Register = () => {

    const actionData = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === "submitting";
    const formRef = useRef();
    const submit = useSubmit();

    useEffect(() =>{
        if(actionData?.success){
            navigate("/login");
            toast.success("Registration completed successfully. Try login..");
        }
    }, [actionData]);

    const handleSubmit= (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        if(!validatePasswords(formData)){
            return;
        }
        submit(formData, {method: "post"});
    };

    const validatePasswords = (formData) => {
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmpassword");
        if(password !== confirmPassword){
            toast.error("Passwords do not match!");
            return false;
        }
        return true;
    };

    const labelStyle =
        "block text-lg font-semibold text-primary dark:text-light mb-2";
          
    const textFieldStyle =
        "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

    return (
        <div className="min-h-[550px] flex items-center justify-center font-primary dark:bg-darkbg">
            <div className="w-[25%] gap-6 mx-auto border bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
                  
                {/* Title */}
                <div className="text-center">
                    <PageTitle title="Register" />
                </div>
  
                {/* Form */}
                <Form method="POST" className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
                     {/* Name Field */}
                    <div>
                        <label htmlFor="name" className={labelStyle}>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            autoComplete="name"
                            required
                            minLength={5}
                            maxLength={30}
                            className={textFieldStyle}
                        />
                        {actionData?.errors?.name && (<p className="text-red-500 text-sm mt-1">{actionData.errors.name}</p>)}
                    </div>
  
                    {/* Email Field and Mobile Number Field*/}
                    <div className="flex font-semibold text-primary dark:text-light mb-2 space-x-4">                        
                        <div className ="basis-1/2">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Your Email"
                                autoComplete="email"
                                required
                                className={textFieldStyle}
                            />
                            {actionData?.errors?.email && (<p className="text-red-500 text-sm mt-1">{actionData.errors.email}</p>)}
                        </div>
                        <div className ="basis-1/2">
                            <label htmlFor="mobilenumber">
                                Mobile Number
                            </label>
                            <input
                                id="mobilenumber"
                                type="text"
                                name="mobilenumber"
                                placeholder="Your Mobile Number"
                                autoComplete="mobilenumber"
                                required
                                className={textFieldStyle}
                            />
                            {actionData?.errors?.mobileNumber && (<p className="text-red-500 text-sm mt-1">{actionData.errors.mobileNumber}</p>)}
                        </div>                        
                    </div>
  
                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className={labelStyle}>
                        Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            autoComplete="current-password"
                            required
                            minLength={4}
                            maxLength={20}
                            className={textFieldStyle}
                        />
                        {actionData?.errors?.password && (<p className="text-red-500 text-sm mt-1">{actionData.errors.password}</p>)}
                    </div>
                     {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="password" className={labelStyle}>
                        Confirm Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Your Password"
                            autoComplete="current-password"
                            required
                            minLength={4}
                            maxLength={20}
                            className={textFieldStyle}
                        />
                    </div>
  
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
                        >
                        {isSubmitting ? "Authenticating..." : "Register"}
                        </button>
                    </div>
                </Form>
  
                {/* Register Link */}
                <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary dark:text-light hover:text-dark dark:hover:text-primary transition duration-200">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    ); 
};

export async function registerAction ({ request }){
    const data = await request.formData();

    const registerData = {
        name: data.get("name"),
        email: data.get("email"),
        mobileNumber: data.get("mobilenumber"),
        password: data.get("password"),
    };
    const responseObj = await saveRegisterData(registerData);
    return responseObj;
}

export default Register;