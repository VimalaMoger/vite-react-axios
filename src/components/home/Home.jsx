import PageHeading from "./PageHeading";
import ProductListingsComponent from "../products/ProductListings";
import React, { useState, useEffect } from 'react';
import { getProducts } from "../../fetcher";
import { useLoaderData } from "react-router-dom";

export default function HomeComponent() {
    const products = useLoaderData();
    let description =`Add a touch of creativity to your space with our unique sticker collection! Whether you're looking to personalize your laptop, water bottle, product packaging, personalized gifts, or labeling personal items, 
                our stickers are the perfect way to express yourself and make your space truly one-of-a-kind.`;
     
    const [showFullDescription, setShowFullDescription] = useState(false);
    if(!showFullDescription) {
        description = description.substring(0, 90) + '...';
    }
    
    return (
        <div className="items-center text-center">
            <PageHeading title="Explore Eazy Stickers!">
                {description}
            </PageHeading> 
            <button onClick={() => setShowFullDescription((prevState) => !prevState)} className="text-indigo-500 mb-5 hover:text-indigo-600">
                {showFullDescription ? 'Less' : 'More'}
            </button>
            <ProductListingsComponent products={products} />
        </div>
    );
}

export async function productLoader() {
    const responseObj = await getProducts();
    return responseObj;
}