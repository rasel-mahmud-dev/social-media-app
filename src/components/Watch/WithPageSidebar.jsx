import React, {useEffect, useState} from 'react';
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import {GiGears} from "react-icons/gi";
import Search from "components/Shared/Input/Search.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Button from "components/Shared/Button/Button.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import staticImage from "src/utils/staticImage.js";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createGroupAction, fetchMyGroupsAction} from "src/store/actions/groupAction.js";
import chooseImage from "src/utils/chooseImage.js";
import resizeImageByMaxWidth from "src/utils/resizeImage.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import apis from "src/apis/index.js";

const WithPageSidebar = ({children, myPages = []}) => {


    const [state, setState] = useCustomReducer({
        name: "",
        description: "",
        groupCoverPhoto: null,
        createNewGroup: false,
        isPublic: true,
        members: []
    })


    const dispatch = useDispatch()
    const location = useLocation()

    const navigate = useNavigate()


    useEffect(() => {
        if (location.pathname === "/groups/create") {
            setState({
                createNewGroup: true
            })

        } else if (location.pathname === "/groups") {
            setState({
                createNewGroup: false
            })
        }
    }, [location.pathname])


    const {openSidebar} = useSelector(state => state.appState)
    const {auth, groups} = useSelector(state => state.authState)
    const {peoples} = useSelector(state => state.feedState)


    function handleCreateGroup() {
        const payload = new FormData()
        payload.append("name", state.name)
        payload.append("description", state?.description)
        if (state.groupCoverPhoto && state.groupCoverPhoto.blob) {
            payload.append("coverPhoto", state.groupCoverPhoto.blob, "group-cover")
        }
        if (state.members && state.members.length > 0) {
            payload.append("members", JSON.stringify(state.members.map(m => m._id)))
        }
        dispatch(createGroupAction(payload))
    }

    async function handleChooseGroupCoverPhoto() {
        let file = await chooseImage()
        if (!file || !file?.base64) return;
        let newFile = await resizeImageByMaxWidth(file.base64, 920)
        setState({
            groupCoverPhoto: newFile
        })
    }

    function handleFetchPeople() {
        dispatch(fetchPeoplesAction())
    }


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

                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default WithPageSidebar;