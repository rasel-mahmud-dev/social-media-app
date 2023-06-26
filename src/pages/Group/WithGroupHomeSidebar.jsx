import React, {useEffect} from 'react';
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

const WithGroupHomeSidebar = ({children}) => {


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
        dispatch(fetchMyGroupsAction())
    }, [])

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
                            <h2 className="font-medium color_h2">Groups</h2>
                            <div className="rounded_circle color_p">
                                <GiGears/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Search placeholder="Search group"/>
                        </div>


                        <Link to="/groups/feed" className="list-item mt-3">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_feed  absolute z-30"/>
                                </div>
                                <span>Your feed</span>

                            </div>
                        </Link>


                        <Link to="/groups/discover" className="list-item mt-3">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_discover  absolute z-30"/>
                                </div>
                                <span>Discover</span>
                            </div>
                        </Link>


                        <Link to="/groups/joins?ordering=viewer_added" className="list-item mt-3">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_group2  absolute z-30"/>
                                </div>
                                <span>Your Groups</span>

                            </div>
                        </Link>


                        <Button
                            className="btn btn-primary2 w-full justify-center flex items-center gap-x-1 font-medium mt-3"
                            onClick={() => navigate("/groups/create")}>
                            <i className="icon_plus_16 png_filter_primary"></i>
                            <span>
                                     Create Group
                                    </span>
                        </Button>


                        <div className="flex items-center justify-between mt-4">
                            <h4 className="font-medium color_h2 text-base">Groups you've joined</h4>
                            <span className="text-primary text-xs">See all</span>
                        </div>

                        <div className="mt-6">
                            {groups.map(group => (
                                <Link key={group._id} to={`/groups/${group?.slug}`}>
                                    <div className="flex items-center gap-x-2 my-2">
                                        <Avatar className="!w-12 !h-12"
                                                imgClass="object-cover !rounded-lg !w-12 !h-12"
                                                src={staticImage(group?.coverPhoto)}/>
                                        <h2 className="color_h2 text-sm">{group.name}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Sidebar>

                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default WithGroupHomeSidebar;