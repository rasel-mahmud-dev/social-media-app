import React, {useContext, useEffect} from 'react';
import Sidebar from "src/components/Sidebar/Sidebar.jsx"
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import {GiGears} from "react-icons/gi";
import Input from "components/Shared/Input/Input.jsx";
import Button from "components/Shared/Button/Button.jsx";
import GroupLayoutProvider, {GroupLayoutContext} from "src/store/GroupLayoutContext.jsx";
import {TiTimes} from "react-icons/ti";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import chooseImage from "src/utils/chooseImage.js";
import resizeImageByMaxWidth from "src/utils/resizeImage.js";
import {createGroupAction, fetchMyGroupsAction} from "src/store/actions/groupAction.js";
import staticImage from "src/utils/staticImage.js";
import InputGroup from "components/Shared/Input/InputGroup.jsx";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import Search from "components/Shared/Input/Search.jsx";


const GroupLayout = ({children}) => {

    const [state, setState] = useContext(GroupLayoutContext)


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

                    {

                        state.createNewGroup ? (

                            <div>
                                <div className="flex items-center justify-between">
                                    <h2 className="font-medium color_h2">Create Group</h2>
                                    <Link to="/groups">
                                        <div className="rounded_circle color_p">
                                            <TiTimes/>
                                        </div>
                                    </Link>
                                </div>

                                <div className="flex items-center gap-x-1 my-1 py-2  px-2  color_h1">
                                    <Avatar className="!w-8 !h-8" imgClass="!w-8 !h-8 text-xs" src={auth.avatar}
                                            username={auth.fullName}/>
                                    <div className="ml-2">
                                        <span className="font-medium text-base ">{auth.fullName}</span>
                                        <h5 className="text-xs color_p">Admin</h5>
                                    </div>
                                </div>

                                {/***** group inputs *****/}
                                <div>
                                    <InputGroup
                                        className="mt-2"
                                        inputClass="w-full"
                                        name="group-name"
                                        onChange={(e) => setState({name: e.target.value})}
                                        placeholder="Group Name"
                                    />


                                    <InputGroup
                                        as="textarea"
                                        className="mt-2"
                                        inputClass="w-full"
                                        onChange={(e) => setState({description: e.target.value})}
                                        placeholder="Group Description"
                                    />


                                    <InputGroup
                                        className="mt-2"
                                        as="select"
                                        inputClass="w-full"
                                        onChange={(e) => setState({isPublic: e.target.value === "1"})}
                                        // label="Group Name"
                                        defaultValue="1"
                                        renderOption={() => (
                                            <>
                                                <option value="1">Group Privacy</option>
                                                <option value="0">Private</option>
                                                <option value="1">Public</option>
                                            </>
                                        )}
                                    />

                                    <InputGroup
                                        as="select"
                                        className="mt-2"
                                        inputClass="w-full"
                                        onChange={(e) => setState({members: e.target.value})}
                                        placeholder="Add People"
                                        onClick={handleFetchPeople}
                                        multiple={true}
                                        keyField={"_id"}
                                        nameField={"fullName"}
                                        options={peoples}
                                        renderSelectedItem={(item, keyField, nameField, removeItem) => (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-x-2 text-sm color_p">
                                                    <Avatar className="!w-8 !h-8" username={item[nameField]}
                                                            imgClass="!w-8 !h-8" src={item["avatar"]}/>
                                                    <span>{item[nameField]}</span>
                                                </div>
                                                <span className="clear-icon" onClick={() => removeItem(item[keyField])}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                                                         viewBox="0 0 352 512"><path
                                                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                                </span>
                                            </div>
                                        )}
                                    />

                                    <Button onClick={handleChooseGroupCoverPhoto} className="mt-6 btn-primary">Choose
                                        Group Cover</Button>


                                </div>


                                <div className="left-0 px-4  w-full">
                                    <Button onClick={handleCreateGroup} className="btn-primary w-full ">Create</Button>
                                </div>

                            </div>
                        ) : (
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
                        )
                    }

                    {/*<div className=" !px-2">*/}
                    {/*    <Link to={`/profile/${auth._id}`}>*/}
                    {/*
                    {/*    </Link>*/}
                    {/*    {nav.map((item, index) => (*/}
                    {/*        item.to ? (*/}
                    {/*            <Link key={index} to={item.to}>*/}
                    {/*                <li key={index}*/}
                    {/*                    className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">*/}
                    {/*                    <img className="w-9 radius-100" src={item.img} alt=""/>*/}
                    {/*                    <h4 className="ml-2 text-[15px] color_li font-medium ">{item.label}</h4>*/}
                    {/*                </li>*/}
                    {/*                /!**!/*/}
                    {/*                /!*    <i className={`icon ${item.cls}`}></i>*!/*/}
                    {/*                /!*    <span className="font-medium text-sm text-neutral-600">{item.label}</span>*!/*/}
                    {/*                /!*</li>*!/*/}
                    {/*            </Link>*/}
                    {/*        ) : (*/}
                    {/*            <li key={index} onClick={() => item.onClick && item.onClick(item)}*/}
                    {/*                className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">*/}
                    {/*                <img className="w-9 radius-100" src={item.img} alt=""/>*/}
                    {/*                <h4 className="ml-2 text-[15px] color_li font-medium ">{item.label}</h4>*/}
                    {/*            </li>*/}
                    {/*        )*/}
                    {/*    ))}*/}

                    {/*</div>*/}


                </Sidebar>

                <div className="group-content">
                    <div className="content-full">
                        <Outlet/>
                    </div>
                </div>

                {/*<Sidebar*/}
                {/*    className="white right-sidebar"*/}
                {/*    isOpen={openSidebar === "right-sidebar"}*/}
                {/*    onClose={() => dispatch(openSidebarAction(""))}*/}
                {/*>*/}

                {/*<ActiveFriend*/}
                {/*    handleStartChat={handleStartChatHandler}*/}
                {/*    auth={auth}*/}
                {/*    friends={friends}*/}
                {/*/>*/}
                {/*<PendingFriendRequestCard className="mt-4" auth={auth} pendingFriends={pendingFriends} />*/}

                {/*</Sidebar>*/}

            </div>
        </div>
    );
};

export default GroupLayoutProvider(GroupLayout)