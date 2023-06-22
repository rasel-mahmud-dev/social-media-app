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


const GroupLayout = ({children}) => {

    const [state, setState] = useContext(GroupLayoutContext)


    const dispatch = useDispatch()
    const location = useLocation()

    const navigate = useNavigate()

    useEffect(()=>{
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


    function handleCreateGroup() {
        const payload = new FormData()
        payload.append("name", state.name)
        payload.append("description", state?.description)
        payload.append("coverPhoto", state.groupCoverPhoto.blob, "group-cover")

        dispatch(createGroupAction(payload))
    }

    async function handleChooseGroupCoverPhoto(){
        let file = await chooseImage()
        if(!file || !file?.base64) return;
        let newFile = await resizeImageByMaxWidth(file.base64, 920)
        setState({
            groupCoverPhoto: newFile
        })
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
                                    <Input onChange={(e)=>setState({name: e.target.value})} placeholder="Group Name"/>
                                    <Button onClick={handleChooseGroupCoverPhoto} className="btn-primary">Choose Group Cover</Button>
                                </div>


                                <div className="left-0 px-4 absolute bottom-2 w-full">
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

                                <div>
                                    <Input placeholder="Search group"/>
                                </div>

                                <div>
                                    <Link to="/groups/create">
                                        <Button  className="btn-primary w-full block">Create
                                            Group</Button>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <h4 className="font-medium color_h2 text-base">Groups you've joined</h4>
                                    <span className="text-primary text-xs">See all</span>
                                </div>

                                <div className="mt-6">
                                    {groups.map(group=>(
                                        <div key={group._id} className="flex items-center gap-x-2 my-2">
                                            <Avatar className="!w-12 !h-12" imgClass="object-cover !rounded-lg !w-12 !h-12" src={staticImage(group?.coverPhoto)} />
                                            <h2 className="color_h2 text-sm">{group.name}</h2>
                                        </div>
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

                <div className="w-full ">
                    <div className="content">
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