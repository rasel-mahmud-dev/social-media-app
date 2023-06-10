import React, {useEffect, useRef} from 'react';

import "./style.scss";
import {BiGlobe, BiHome, BiInfoSquare, BiMessage, BiNotification, BiUser, BiVideo} from "react-icons/bi";
import {GiBigGear} from "react-icons/gi";
import MenuDropdown from "../Dropdown/MenuDropdown.jsx";
import Avatar from "../Shared/Avatar/Avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {FaSignInAlt} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {logoutAction} from "src/store/slices/authSlice.js";
import {HiBars3} from "react-icons/hi2";
import {openSidebarAction} from "src/store/slices/appSlice.js";

const Header = () => {

    const dispatch = useDispatch()

    const headerRef = useRef(null)
    const navigate = useNavigate()

    const {auth} = useSelector(state=>state.authState)

    useEffect(()=>{
        if (headerRef.current) {
            document.documentElement.style.setProperty(`--header-height`, headerRef.current.offsetHeight + "px");
        }
    }, [])


    function handleLogout() {
        dispatch(logoutAction())
    }

    function handleOpenSidebar(){
        dispatch(openSidebarAction("left-sidebar"))
    }

    return (
        <>
        <div className="header" ref={headerRef}>
            <nav className=" border-gray-200 dark:bg-gray-900">

                <div className="flex  items-center justify-between mx-auto p-4">


                    <div className="flex items-center  gap-x-2">

                        <div className="flex md:hidden icon-box bg-transparent">
                            <HiBars3 onClick={handleOpenSidebar} className="text-2xl" />
                        </div>

                        <Link to="/" className="flex items-center bg-transparent">
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="h-8 mr-3 hidden md:flex"
                                alt=""
                            />
                            <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kotha</span>
                        </Link>
                    </div>

                           {/*<div className="flex-1 hidden md:block">*/}
                           {/*    <Input type="text" placeholder="Search content"  className="w-full text-sm bg-neutral-100  border-none  rounded-full"/>*/}
                           {/*</div>*/}





                        {/*search Input*/}

                    {auth && (
                        <div className="flex items-center gap-x-4">
                            <Link to="/"><li className="list-none icon-box"><BiHome/></li></Link>
                            <Link to="/find-peoples"><li className="list-none icon-box"><BiUser/></li></Link>
                            <Link to="/watch"><li className="list-none icon-box"><BiVideo/></li></Link>
                            <li className="list-none icon-box hidden md:flex"><BiInfoSquare/></li>
                            <Link className="flex md:hidden" to="/online-friend"><li className="list-none  icon-box"><BiGlobe/></li></Link>
                        </div>
                    )}


                    <div>


                        <div className="flex items-center justify-end ">
                            {auth && ( <div className=" items-center gap-x-4 hidden md:flex">
                                <li className="list-none icon-box bg-transparent"><BiNotification/></li>
                                <li className="list-none icon-box bg-transparent"><BiMessage/></li>
                                <li className="list-none icon-box bg-transparent"><GiBigGear/></li>
                            </div>) }


                            <li className="list-none ">
                                {auth ? <MenuDropdown contentClass="right-0 w-40" render={()=>(
                                    <div className="">
                                        <li  className="list-none " onClick={()=>handleLogout()}>Logout</li>
                                        <li onClick={()=>navigate(`/profile/${auth._id}`)} className="list-none">Profile</li>
                                    </div>
                                )}>
                                    <Avatar className="!h-9 !w-9" src={auth?.avatar} imgClass="!h-9 !w-9 !text-xs" username={auth.fullName}/>
                                </MenuDropdown> : (
                                    <li>
                                        <Link to="/login">
                                            <FaSignInAlt />
                                        </Link>
                                    </li>
                                ) }
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