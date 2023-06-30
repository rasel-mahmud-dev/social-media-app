
import React, {useContext, useEffect} from 'react';

import {Outlet} from "react-router-dom";

const WatchLayout = ({children}) => {

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default WatchLayout