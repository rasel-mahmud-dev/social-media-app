import React, {useContext, useEffect} from 'react';

import {Outlet} from "react-router-dom";

const FriendLayout = () => {
    return (
        <div className=" ">
            <Outlet/>
        </div>
    );
};

export default FriendLayout