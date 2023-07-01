import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useFetchFriendsQuery, useRemoveFriendCacheMutation} from "src/store/features/friendsApi.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import staticImage from "src/utils/staticImage.js";
import {FaEllipsisH} from "react-icons/fa";
import Search from "components/Shared/Input/Search.jsx";
import RenderProfile from "pages/Profile/RenderProfile.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import apis from "src/apis/index.js";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import {BsHeartbreakFill} from "react-icons/bs";
import {removeFriendAction} from "src/store/actions/userAction.js";
import {useAddPeopleCacheMutation} from "src/store/features/peoplesApi.js";


const AllFriends = () => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        profile: {},
    })

    const [deleteFriendCache] = useRemoveFriendCacheMutation()
    const [addPeopleCache] = useAddPeopleCacheMutation()

    function fetchFollowerInfo(userId) {
        apis.get("/follow/status/?userId=" + userId).then(({status, data}) => {
            if (status === 200) {
                setState({
                    currentUserFollowing: data.following
                })
            }
        }).catch(() => {
        })
    }


    function fetchProfile(userId) {
        apis.get("/users/profile/" + userId).then(({status, data}) => {

            if (status === 200) {
                setState({profile: data})

                // if view current logged user profile
                if (auth._id === data.user._id) return;

                // check the following status with current logged user.
                fetchFollowerInfo(data.user._id)
            }
        }).catch(() => {
        })
    }

    const navigate = useNavigate()

    const {data: friendsData} = useFetchFriendsQuery({pageNumber: 1})

    const friendQueries = useSelector((state) => state.friendsApi.queries);


    const filterFriends = useMemo(() => {
        return friendsData?.friends?.filter(friend => {
            if (friend.status === "accepted") return true
        })
    }, [friendsData]);

    const {openSidebar} = useSelector(state=>state.appState)

    function handleOpenProfile(friendId) {
        fetchProfile(friendId)
    }


    function handleUnFriend(friendId, friend) {
        dispatch(removeFriendAction({friendId})).unwrap().then(()=>{
            deleteFriendCache({
                friendId,
                queries: friendQueries,
            })

            let people = {
                ...friend.sender,
                _id: friend.senderId
            }

            if(auth._id === friend.senderId){
                people = {
                    ...friend.receiver,
                    _id: friend.receiverId
                }
            }

            addPeopleCache({
                people: people,
            })

        })
    }


    return (
        <div>
            <div className="flex justify-between">
                <Sidebar
                    className="white left-sidebar group-sidebar"
                    isOpen={openSidebar === "left-sidebar"}
                    onClose={() => dispatch(openSidebarAction(""))}>

                    <div className="border-b border-dark-600 pb-4 mb-4">
                        <div className="flex items-center gap-x-4 pb-4 mb-3">
                            <div className="rounded_circle " onClick={() => navigate("/friends")}>
                                <i className="icon_arrow-left png_filter_white"></i>
                            </div>
                            <div>
                                <h4 className="color_p text-sm">Friends</h4>
                                <h2 className="font-semibold text-2xl color_h1">All Friends</h2>
                            </div>
                        </div>
                        <Search placeholder="Search Friend"/>
                    </div>
                    <h2 className="font-semibold text-sm color_h2">{filterFriends?.length} Friends</h2>

                    <div className="mt-2">
                        {filterFriends?.map(friend => (
                            <div
                                key={friend._id}
                                className="relative px-2 items-center justify-between list-item"
                                onClick={() => handleOpenProfile(friend.senderId === auth._id ? friend.receiverId : friend.senderId)}>

                                <div className="flex gap-x-2 items-center">
                                    <Avatar
                                        className="!w-14 !h-14" imgClass="!w-14 !h-14"
                                        src={staticImage(friend.senderId === auth._id ? friend.receiver.avatar : friend.sender.avatar)}
                                    />
                                    <div>
                                        <h2 className="color_h2 font-semibold text-base">{friend.senderId === auth._id ? friend.receiver.fullName : friend.sender.fullName}</h2>
                                        <p className="color_p font-normal text-xs">28K mutual friends</p>
                                    </div>
                                </div>

                                <div className="" onClick={(e) => e.stopPropagation()}>
                                    <MenuDropdown contentClass="!-left-20 absolute w-[120px]" render={() => (
                                        <div>

                                            <div className="flex items-center gap-x-2" onClick={()=>handleUnFriend(friend._id, friend)}>
                                                <span>
                                                <BsHeartbreakFill className="color_p text-sm"/>
                                                </span>
                                                <span>UnFriend</span>
                                            </div>

                                            <div className="flex items-center gap-x-2 mt-2">
                                                <span>
                                                <BsHeartbreakFill className="color_p text-sm"/>
                                                </span>
                                                    <span>UnFollow</span>
                                                </div>
                                        </div>
                                    )}>
                                        <div className="circle-hover-btn">
                                            <FaEllipsisH/>
                                        </div>
                                    </MenuDropdown>
                                </div>
                            </div>
                        ))}
                    </div>


                </Sidebar>

                <div className="group-content w-full ">

                    {state.profile?.user ? (
                        <RenderProfile
                            isNotOpenFromProfile={true}
                            auth={auth}
                            user={state.profile?.user}
                        />
                    ) : (
                        <div className="w-full flex justify-center items-center h-screen">
                            <div className="block mx-auto">
                                <Avatar className="mx-auto rounded-none w-28 h-28" imgClass="w-28 h-28 rounded-none"
                                        src="/icons/null_states_people_dark_mode.svg"/>
                                <h4 className="color_h1 text-lg font-semibold">Select people's names to preview their
                                    profile.</h4>

                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>

    );
};

export default AllFriends;