import React from 'react';
import {BiSearch} from "react-icons/bi";

import "./search.scss"

const Search = (props) => {

    const { ...attr} = props

    return (
        <div className="search-input flex items-center gap-x-2 bg-comment px-4 py-2.5 rounded-full text-light-600">
            <BiSearch />
            <input className="text-sm" {...attr} />
        </div>
    );
};

export default Search;