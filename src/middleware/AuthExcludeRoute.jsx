import React from 'react';
import {MoonLoader} from "react-spinners";

import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const AuthExcludeRoute = ({children}) => {
    const {authLoaded, auth} = useSelector(state=>state.authState)

    if (!authLoaded) return (
        <div className="py-24 w-full flex justify-center  items-center flex-col">
            <MoonLoader/>
            <h4 className="text-xs font-semibold mt-2">Auth Loading...</h4>
        </div>
    )

    if (authLoaded && !auth) {
        return children
    }

    return <Navigate to="/" />
};

export default AuthExcludeRoute;

