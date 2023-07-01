import React from 'react';
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import {GiGears} from "react-icons/gi";
import Search from "components/Shared/Input/Search.jsx";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";


const WithPageSidebar = ({children}) => {

    const dispatch = useDispatch()

    const {openSidebar} = useSelector(state => state.appState)


    return (
        <div>
            <div className="flex justify-between ">
                <Sidebar
                    className="white left-sidebar group-sidebar"
                    isOpen={openSidebar === "left-sidebar"}
                    onClose={() => dispatch(openSidebarAction(""))}>


                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium color_h2">Watch</h2>
                            <div className="rounded_circle color_p">
                                <GiGears/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Search placeholder="Search Videos"/>
                        </div>


                        <Link to="/watch" className="list-item mt-3 px-2">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_video  absolute z-30"/>
                                </div>
                                <span>Home</span>
                            </div>
                        </Link>


                        <Link to="/watch/reels" className="list-item mt-3 px-2">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_reels  absolute z-30"/>
                                </div>
                                <span>Reels</span>

                            </div>
                        </Link>

                        <Link to="/watch/saved" className="list-item mt-3 px-2">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_bookmark  absolute z-30"/>
                                </div>
                                <span>Saves Videos</span>
                            </div>
                        </Link>

                    </div>
                </Sidebar>


                {children}

            </div>
        </div>
    );
};

export default WithPageSidebar;