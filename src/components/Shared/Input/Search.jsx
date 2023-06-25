import React from 'react';
import {BiSearch} from "react-icons/bi";

const Search = (props) => {

    const {placeholder} = props

    return (
        <div className="flex items-center gap-x-2 bg-comment px-4 py-2 rounded-full text-light-600">
            <BiSearch />
            <span className="text-sm">{placeholder}</span>
        </div>
    );
};

export default Search;