import React from 'react';

import "./style.scss";
import {HiOutlineMenu} from "react-icons/hi";
import {BiGlobe, BiHome, BiInfoSquare, BiMessage, BiNotification, BiUser, BiVideo} from "react-icons/bi";
import {GiBigGear} from "react-icons/gi";
import MenuDropdown from "../Dropdown/MenuDropdown.jsx";
import Avatar from "../Avatar/Avatar.jsx";

const Header = () => {
    return (
        <>
        <div className="header">
            <nav className=" border-gray-200 dark:bg-gray-900">

                <div className="grid grid-cols-2 items-center justify-between mx-auto p-4">

                    <div className=" flex flex-wrap items-center justify-between  p-4 gap-x-10">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="h-8 mr-3"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>


                        {/*search input*/}
                        <div className="flex-1">
                            <input type="text" placeholder="Search content"  className="w-full text-sm bg-neutral-100  border-none  rounded-full"/>
                        </div>

                        <div className="flex items-center gap-x-4">
                            <li className="list-none icon-box"><BiHome/></li>
                            <li className="list-none icon-box"><BiUser/></li>
                            <li className="list-none icon-box"><BiVideo/></li>
                            <li className="list-none icon-box"><BiInfoSquare/></li>
                            <li className="list-none icon-box"><BiGlobe/></li>
                        </div>
                    </div>


                    <div className="flex items-center justify-end md:order-2">
                        <div className="flex items-center gap-x-4">
                            <li className="list-none icon-box bg-transparent"><BiNotification/></li>
                            <li className="list-none icon-box bg-transparent"><BiMessage/></li>
                            <li className="list-none icon-box bg-transparent"><GiBigGear/></li>

                            <MenuDropdown render={()=>(
                                <div>
                                    sdfsdf
                                    sdf
                                </div>
                            )}>
                                <Avatar className="!h-9 !w-9" imgClass="!h-9 !w-9 !text-xs" username={"Rasel Mahmhd"}/>
                            </MenuDropdown>
                    </div>
                    </div>
                </div>
            </nav>

        </div>
            <div className="header-space"></div>
            </>
    );
};

export default Header;