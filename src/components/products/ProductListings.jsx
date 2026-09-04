import React, { useState, useMemo } from 'react';
import ProductCardComponent from "./ProductCard";
import SearchBoxComponent from "../search/SearchBox";
import DropdownComponent from '../searchfilter/Dropdown';

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

export default function ProductListingsComponent({products}) {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSort, setSelectedSort] = useState("Popularity");
    
    const filteredAndSortedProducts = useMemo(() => {
        if (!Array.isArray(products.data)){
            return [];
        }
        let filteredAndSortedProducts = products.data.filter(
            (product) => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredAndSortedProducts.slice().sort((a,b) => {
            switch( selectedSort ) {
                case "Price Low to High":
                    return parseFloat(a.price) - parseFloat(b.price);              
                case "Price High to Low":
                    return parseFloat(b.price) - parseFloat(a.price);           
                case "Popularity":
                default:
                    return parseInt(b.popularity) - parseInt(a.popularity);
            }
        });
    },[products, searchTerm, selectedSort]);

    const handleChange = (ev) => {
        setSearchTerm(ev.target.value);
    };
    
    const handleSortChange = (ev) => {
        setSelectedSort(ev.target.value);
    };

    return (
        <div className="max-w-6xl mx-auto">

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
                <SearchBoxComponent label="Search" placeholder="Search products..." value={searchTerm} handleSearch={handleChange}/>
                <DropdownComponent label="Sort by" options={sortList} selectedValue={selectedSort} handleSort={handleSortChange}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
                { filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((product) => (                                        
                        <ProductCardComponent key={product.productId} product={product} />                        
                    ))
                ):(
                    <span className="justify-center text-center font-primary font-bold text-lg text-primary">
                        {products.errMessage && <div> Error: {products.errMessage}</div>}
                    </span>
                )}
            </div>

        </div>
    );
}