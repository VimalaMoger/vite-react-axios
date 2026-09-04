import React from "react";
import HeaderComponent from './Header';
import Footer from './footer/Footer';
import {useRouteError, Link} from "react-router-dom";
import PageTitle from './home/PageTitle';

const ErrorPage = () => {
    const routerErr = useRouteError();
    let errorTitle = "Oops! Something went wrong";
    let errorMessage = "An unexpected error occurred. Please try again later";
    if (routerErr) {
        errorTitle = routerErr.status;
        errorMessage = routerErr.data;
    }

    return (
        <div>
            <HeaderComponent />
            <div className="text-center text-grey-600 dark:text-lighter flex flex-col items-center py-12 gap-4">
                <div className="max-w-4xl mx-auto px-4">
                    <PageTitle title={errorTitle}/>
                </div>
                <p className="max-w-[576px] px-2 mx-auto leading-6 mb-4">{errorMessage}</p>
                <img src="/assets/images/error-img.gif" alt="Error" className="w-full max-w-[350px] mx-auto mb-6"/>
                <Link to="/home" className="py-8 px-6 text-blue-600 font-bold">GO TO HOMEPAGE</Link>
            </div> 
            <Footer />
        </div>
    );
};

export default ErrorPage;