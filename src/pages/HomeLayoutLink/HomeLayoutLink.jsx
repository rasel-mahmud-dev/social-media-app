import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

const HomeLayoutLink = () => {

    const [activeIndex, setActiveIndex] = useState(-1)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        items.forEach((i, index)=>{
            let hhm = location.pathname.startsWith(i.path)
            if(hhm){

            setActiveIndex(index)
            }
        })
    }, [location.pathname])

    const items  = [
        {name: "Find Peoples", path: "/find-peoples"},
        {name: "My Friends", path: "/friends"},
        {name: "My Request send", path: "/friend-request-send"},
        {name: "Requested me", path: "/friend-request-received"},
    ]


    return (
        <div className="home-layout-link">
            <div className="flex items-center mb-4 gap-x-4">
                {items.map((it, i)=>(
                    <li key={i} className={`tab-button ${activeIndex === i ? "active" : ""} `} onClick={()=>navigate(it.path)}>{it.name}</li>
                ))}
            </div>
        </div>
    );
};

export default HomeLayoutLink;