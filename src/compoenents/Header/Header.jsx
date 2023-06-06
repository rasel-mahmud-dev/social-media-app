import React from 'react';

import "./style.scss";
import {HiOutlineMenu} from "react-icons/hi";
import {BiHome, BiMessage, BiNotification, BiUser, BiVideo} from "react-icons/bi";
import {GiBigGear} from "react-icons/gi";

const Header = () => {
    return (
        <>
        <div className="header">
            <nav className=" border-gray-200 dark:bg-gray-900">

                <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">

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
                        <div>
                            <input type="text" placeholder="Search content"  className="text-sm bg-white rounded-full"/>
                        </div>

                        <div className="flex items-center gap-x-4">
                            <li className="list-none icon-box"><BiHome/></li>
                            <li className="list-none icon-box"><BiUser/></li>
                            <li className="list-none icon-box"><BiVideo/></li>
                        </div>
                    </div>


                    <div className="flex items-center md:order-2">
                        <div className="flex items-center gap-x-4">
                            <li className="list-none icon-box bg-transparent"><BiNotification/></li>
                            <li className="list-none icon-box bg-transparent"><BiMessage/></li>
                            <li className="list-none icon-box bg-transparent"><GiBigGear/></li>

                            <li

                                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="/docs/images/people/profile-picture-3.jpg"
                                    alt="user photo"
                                />
                            </li>
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