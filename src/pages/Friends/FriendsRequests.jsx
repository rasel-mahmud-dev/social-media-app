import React, {useEffect, useMemo} from 'react';
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import {useNavigate} from "react-router-dom";
import staticImage from "src/utils/staticImage.js";
import Button from "components/Shared/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useFetchFriendsQuery} from "src/store/features/friendsApi.js";
import {useFetchPeoplesQuery} from "src/store/features/peoplesApi.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import Checkbox from "components/Shared/Input/Checkbox.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import {TiTimes} from "react-icons/ti";

const FriendsRequests = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {auth} = useSelector(state => state.authState)

    const {data: friendsData} = useFetchFriendsQuery({pageNumber: 1})

    const {data} = useFetchPeoplesQuery({pageNumber: 1})

    const [state, setState] = useCustomReducer({
        isOpenSendRequestModal: false
    })


    const filterPendingFriends = useMemo(() => {
        return friendsData?.friends?.filter(friend => friend.status === "pending" && friend.senderId !== auth._id)
    }, [friendsData]);


    const sendMyFriendRequest = useMemo(() => {
        return friendsData?.friends?.filter(friend => friend.status === "pending" && friend.senderId === auth._id)
    }, [friendsData]);

    const openSidebar = "";

    console.log(filterPendingFriends)

    return (
        <div>

            {state.isOpenSendRequestModal && (
                <ModalWithBackdrop
                    isOpen={true}
                    modalClass="max-w-600 card px-2"
                    backdropClass="bg-dark-900/60"
                    onClose={() => setState({isOpenSendRequestModal: false})}
                    title="Send Request"

                >



                    <div className="mt-2">

                        { sendMyFriendRequest?.map(pendingPeople => (
                            <div key={pendingPeople._id} className="relative  items-start justify-between list-item">

                                <div className="flex items-center gap-x-4">

                                    <div className="">
                                        <Avatar className="!w-16 !h-16" imgClass="!w-16 !h-16"
                                                src={staticImage(pendingPeople.receiver.avatar)}/>
                                    </div>

                                   <div>
                                       <h2 className="color_h2 font-semibold text-base">{pendingPeople.receiver.fullName}</h2>
                                       <p className="color_p font-normal text-xs">28K mutual friends</p>
                                   </div>

                                </div>

                                <div className="flex gap-x-2 mt-2">
                                    <Button className="btn btn-primary w-full relative z-20">Cancel request</Button>
                                </div>

                            </div>
                        ))}
                    </div>

                </ModalWithBackdrop>
            )}

            <div className="flex justify-between">
                <Sidebar
                    className="white left-sidebar group-sidebar"
                    isOpen={openSidebar === "left-sidebar"}
                    onClose={() => dispatch(openSidebarAction(""))}>


                    <div className="flex items-center gap-x-4 border-b border-dark-600 pb-4 mb-3">
                        <div className="rounded_circle " onClick={() => navigate("/friends")}>
                            <i className="icon_arrow-left png_filter_white"></i>
                        </div>
                        <div>
                            <h4 className="color_p text-sm">Friends</h4>
                            <h2 className="font-semibold text-2xl color_h1">Friend Requests</h2>
                        </div>
                    </div>


                    <h2 className="font-semibold text-base color_h2">{(filterPendingFriends?.length || 0) ? (filterPendingFriends?.length || 0) : "No "} Friend
                        Requests</h2>
                        <p className="text-xs text-primary font-medium cursor-pointer mt-1"
                           onClick={() => setState({isOpenSendRequestModal: true})}>
                            View send requests
                        </p>
                    <div>

                        {filterPendingFriends?.map(pendingPeople => (
                            <div key={pendingPeople._id} className="relative !p-0  !m-0 items-start list-item">

                                <div className="mt-4">
                                    <Avatar className="!w-16 !h-16" imgClass="!w-16 !h-16"
                                            src={staticImage(pendingPeople.sender.avatar)}/>
                                </div>


                                <div className="p-3">
                                    <h2 className="color_h2 font-semibold text-base">{pendingPeople.sender.fullName}</h2>
                                    <p className="color_p font-normal text-xs">28K mutual friends</p>
                                    <div className="flex gap-x-2 mt-2">
                                        <Button className="btn btn-primary w-full relative z-20">Confirm</Button>
                                        <Button className="btn btn-dark2 w-full relative z-20">Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </Sidebar>

                <div className="group-content w-full ">
                    <div className="w-full flex justify-center items-center h-screen">
                        <div className="block mx-auto">
                            <Avatar className="mx-auto rounded-none w-28 h-28" imgClass="w-28 h-28 rounded-none"
                                    src="/icons/null_states_people_dark_mode.svg"/>
                            <h4 className="color_h1 text-lg font-semibold">Select people's names to preview their
                                profile.</h4>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendsRequests;